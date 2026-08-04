// ─── ACCESS GUARD ───
// The subscriptions table is the single source of truth for module access.
(() => {
    const MODULE_SLUG_CONFIG = {
        'easemed_dashboard.html': 'imed',
        'surgery-clerking.html': 'surgery',
        'easemed_pediatrics.html': 'peds',
        'ObGyn.html': 'obgyn'
    };
    const SUPABASE_URL = 'https://uhjcybwczelmqkkapeac.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';

    window.EASEMED_SUPABASE_URL = SUPABASE_URL;
    window.EASEMED_SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

    function getCurrentModuleSlug() {
        return MODULE_SLUG_CONFIG[location.pathname.split('/').pop()] || null;
    }

    function getClient() {
        if (window.__easemedSupabase) return window.__easemedSupabase;
        if (!window.supabase?.createClient) return null;
        window.__easemedSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.sb = window.__easemedSupabase;
        return window.__easemedSupabase;
    }

    function hideModuleContent() {
        const style = document.createElement('style');
        style.id = 'access-guard-hide-content';
        style.textContent = '#moduleContent, .main-wrap { display: none !important; }';
        document.head.appendChild(style);
    }

    function showUpgradeModal(moduleName) {
        document.getElementById('upgradeModal')?.remove();
        const modal = document.createElement('div');
        modal.id = 'upgradeModal';
        modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:24px;';
        modal.innerHTML = '<div style="background:#fff;max-width:400px;width:100%;border-radius:20px;padding:32px;text-align:center"><div style="font-size:3rem">🔒</div><h2>Access Restricted</h2><p>The "' + moduleName + '" module requires an active subscription.</p><p>Premium Access — <strong>UGX 10,000/month</strong></p><button onclick="location.href='subscription.html'">Upgrade</button></div>';
        document.body.appendChild(modal);
    }

    async function hasModuleAccess(client, userId, moduleSlug) {
        const { data: subscription, error } = await client
            .from('subscriptions')
            .select('plan_type, active_module, expiry_date, status')
            .eq('user_id', userId)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error || !subscription) return false;
        if (subscription.expiry_date && new Date(subscription.expiry_date).getTime() < Date.now()) return false;
        if (subscription.plan_type === 'premium' || subscription.plan_type === 'free_trial') return true;
        return subscription.plan_type === 'basic' && subscription.active_module === moduleSlug;
    }

    (async function enforceAccess() {
        const moduleSlug = getCurrentModuleSlug();
        if (!moduleSlug) return;
        const client = getClient();
        if (!client) return;
        try {
            const { data: { session } } = await client.auth.getSession();
            if (!session?.user) return;
            const allowed = await hasModuleAccess(client, session.user.id, moduleSlug);
            if (allowed) return;
            hideModuleContent();
            const names = { imed: 'Internal Medicine', surgery: 'Surgery', peds: 'Pediatrics', obgyn: 'OB/GYN' };
            showUpgradeModal(names[moduleSlug] || 'This');
        } catch (error) {
            console.warn('[AccessGuard] Access check failed:', error);
        }
    })();
})();
