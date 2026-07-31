// ─── ACCESS GUARD ───
// Load this in <head>, after /js/supabase.min.js, on every protected module page.

// ─── CONFIG ───
const MODULE_SLUG_CONFIG = {
    'easemed_dashboard.html': 'imed',
    'surgery-clerking.html': 'surgery',
    'easemed_pediatrics.html': 'peds',
    'ObGyn.html': 'obgyn'
};

const SUPABASE_URL = 'https://uhjcybwczelmqkkapeac.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';

// ─── GET MODULE SLUG ───
function getCurrentModuleSlug() {
    const pageName = location.pathname.split('/').pop();
    return MODULE_SLUG_CONFIG[pageName] || null;
}

// ─── HIDE PAGE IMMEDIATELY ───
(function hidePage() {
    const style = document.createElement('style');
    style.id = 'access-guard-hide';
    style.textContent = `
        html, body { 
            visibility: hidden !important; 
            opacity: 0 !important; 
            pointer-events: none !important;
        }
        #access-guard-overlay {
            position: fixed;
            inset: 0;
            background: rgba(13, 27, 42, 0.92);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 16px;
        }
        .guard-spinner {
            width: 44px;
            height: 44px;
            border: 4px solid rgba(255,255,255,0.1);
            border-top-color: #3B82F6;
            border-radius: 50%;
            animation: guard-spin 0.8s linear infinite;
        }
        .guard-text {
            color: rgba(255,255,255,0.6);
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 400;
        }
        @keyframes guard-spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.documentElement.appendChild(style);
    
    // Show loading overlay
    const overlay = document.createElement('div');
    overlay.id = 'access-guard-overlay';
    overlay.innerHTML = `
        <div class="guard-spinner"></div>
        <div class="guard-text">Loading...</div>
    `;
    document.documentElement.appendChild(overlay);
})();

function revealPage() {
    document.getElementById('access-guard-hide')?.remove();
    document.getElementById('access-guard-overlay')?.remove();
    // Remove the style that hides content
    const hideStyle = document.getElementById('access-guard-hide-content');
    if (hideStyle) hideStyle.remove();
}

// ─── MODULE ACCESS CHECK ───
async function checkModuleAccess(client, userId, moduleSlug) {
    if (!moduleSlug) return true;

    try {
        // Single query to get subscription
        const { data: subscription, error } = await client
            .from('subscriptions')
            .select('plan_type, active_module, expiry_date, status')
            .eq('user_id', userId)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error || !subscription) {
            return false;
        }

        // Check expiry
        if (subscription.expiry_date && new Date(subscription.expiry_date).getTime() < Date.now()) {
            return false;
        }

        // Premium or Free Trial = full access
        if (subscription.plan_type === 'premium' || subscription.plan_type === 'free_trial') {
            return true;
        }

        // Basic = only active module
        if (subscription.plan_type === 'basic') {
            return subscription.active_module === moduleSlug;
        }

        return false;

    } catch (error) {
        console.warn('[Access guard] Module check error:', error);
        return false;
    }
}

// ─── SHOW UPGRADE MODAL ───
function showUpgradeModal(moduleName) {
    const existing = document.getElementById('upgradeModal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'upgradeModal';
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(8px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: modalFadeIn 0.25s ease;
    `;
    modal.innerHTML = `
        <div style="background:white; max-width:400px; width:100%; border-radius:20px; padding:32px; text-align:center; box-shadow:0 24px 80px rgba(0,0,0,0.3);">
            <div style="font-size:3rem; margin-bottom:8px;">🔒</div>
            <h2 style="font-family:'Lora',serif; font-size:1.4rem; margin-bottom:6px; color:#0B1A2E;">Access Restricted</h2>
            <p style="color:rgba(11,26,46,0.6); font-size:0.9rem; line-height:1.5; margin-bottom:16px;">
                ${moduleName ? `The "${moduleName}" module` : 'This module'} requires a subscription.
            </p>
            <div style="background:rgba(245,158,11,0.08); padding:12px; border-radius:10px; margin-bottom:16px; border:1px solid rgba(245,158,11,0.12);">
                <div style="color:#D97706; font-weight:700; font-size:0.9rem;">⚡ Quick Upgrade</div>
                <p style="font-size:0.8rem; color:rgba(11,26,46,0.5); margin-top:2px;">
                    Premium Access — <strong style="color:#0B1A2E;">UGX 10,000/month</strong>
                </p>
                <p style="font-size:0.7rem; color:rgba(11,26,46,0.3);">🔄 Cancel anytime</p>
            </div>
            <div style="display:flex; gap:10px;">
                <button onclick="window.location.href='subscription.html'" style="flex:1; padding:11px; border:none; border-radius:10px; background:linear-gradient(135deg,#3B82F6,#2563EB); color:white; font-weight:700; font-size:0.9rem; cursor:pointer; font-family:'Inter',sans-serif;">
                    🚀 Upgrade
                </button>
                <button onclick="this.closest('#upgradeModal').remove()" style="flex:1; padding:11px; border:none; border-radius:10px; background:rgba(0,0,0,0.05); color:#0B1A2E; font-weight:600; font-size:0.9rem; cursor:pointer; font-family:'Inter',sans-serif; border:1px solid rgba(0,0,0,0.08);">
                    Cancel
                </button>
            </div>
            <p style="font-size:0.65rem; color:rgba(11,26,46,0.25); margin-top:12px;">
                Already subscribed? <a href="#" onclick="location.reload()" style="color:#3B82F6; text-decoration:none;">Refresh</a>
            </p>
        </div>
        <style>
            @keyframes modalFadeIn {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }
        </style>
    `;
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) this.remove();
    });
}

// ─── MAIN ENFORCEMENT ───
(async function enforceAccess() {
    console.log('[Access guard] Starting...');
    const start = performance.now();

    try {
        // Check SDK
        if (!window.supabase?.createClient) {
            console.warn('[Access guard] SDK not available');
            revealPage();
            return;
        }

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        
        // Get session
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            revealPage();
            return;
        }

        // Get profile
        const { data: profile, error } = await client
            .from('profiles')
            .select('is_active, access_expires_at, role, is_admin')
            .eq('id', session.user.id)
            .single();

        if (error || !profile) {
            console.warn('[Access guard] Profile error:', error?.message);
            revealPage();
            return;
        }

        // Update activity (fire and forget)
        client.from('profiles').update({ last_activity: new Date().toISOString() })
            .eq('id', session.user.id)
            .then(({ error }) => {
                if (error) console.warn('[Access guard] Activity ping failed');
            });

        // Check admin
        const role = profile.role?.toLowerCase();
        const isAdmin = profile.is_admin === true ||
            role === 'admin' ||
            role === 'superadmin' ||
            role === 'administrator';

        if (isAdmin) {
            console.log('[Access guard] Admin user');
            revealPage();
            return;
        }

        // Check subscription
        const isExpired = profile.access_expires_at && new Date(profile.access_expires_at).getTime() < Date.now();
        if (profile.is_active === false || isExpired) {
            window.location.replace('easemed_payment.html');
            return;
        }

        // Module access check
        const moduleSlug = getCurrentModuleSlug();
        if (moduleSlug) {
            const hasAccess = await checkModuleAccess(client, session.user.id, moduleSlug);
            
            if (!hasAccess) {
                const moduleNames = {
                    'imed': 'Internal Medicine',
                    'surgery': 'Surgery',
                    'peds': 'Pediatrics',
                    'obgyn': 'OB/GYN'
                };
                console.log(`[Access guard] ❌ Access denied: ${moduleNames[moduleSlug] || moduleSlug}`);
                
                // Hide all content
                const hideStyle = document.createElement('style');
                hideStyle.id = 'access-guard-hide-content';
                hideStyle.textContent = '#moduleContent, .main-wrap { display: none !important; }';
                document.head.appendChild(hideStyle);
                
                showUpgradeModal(moduleNames[moduleSlug] || moduleSlug);
                return;
            }
        }

        // All checks passed
        console.log(`[Access guard] ✅ Access granted (${Math.round(performance.now() - start)}ms)`);
        revealPage();

    } catch (error) {
        console.error('[Access guard] Error:', error);
        revealPage();
    }
})();
