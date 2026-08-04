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
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';

// ─── SHARED CLIENT ───
function getSharedSupabaseClient() {
    if (window.__easemedSupabase) return window.__easemedSupabase;
    if (!window.supabase?.createClient) return null;
    // ✅ FIXED: was referencing undefined SUPABASE_ANON, now correctly uses SUPABASE_ANON_KEY
    window.__easemedSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // Keep window.sb in sync so every page (regardless of which variable name its
    // own scripts use) shares this exact same client instance.
    window.sb = window.__easemedSupabase;
    return window.__easemedSupabase;
}

// ─── TIMEOUT GUARD ───
const GUARD_TIMEOUT_MS = 8000;
function withTimeout(promise, label) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`TIMEOUT:${label}`)), GUARD_TIMEOUT_MS)
        )
    ]);
}

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
    const hideStyle = document.getElementById('access-guard-hide-content');
    if (hideStyle) hideStyle.remove();
}

// ─── MODULE ACCESS CHECK ───
// FIXED: Uses actual schema columns from subscriptions table:
//   - active_module (text) - single module slug
//   - expiry_date (timestamptz) - when subscription expires
//   - status (text) - 'active', 'expired', 'cancelled', 'pending'
//   - payment_status (text) - 'paid', 'unpaid', 'pending'
async function checkModuleAccess(client, userId, moduleSlug) {
    if (!moduleSlug) return true;

    try {
        console.log('[AccessGuard] Checking module access for:', moduleSlug);

        // Get the user's subscription - using actual schema columns
        const { data: subscription, error } = await withTimeout(
            client
                .from('subscriptions')
                .select('active_module, expiry_date, status, payment_status')
                .eq('user_id', userId)
                .eq('status', 'active')
                .eq('payment_status', 'paid')
                .gte('expiry_date', new Date().toISOString())
                .order('expiry_date', { ascending: false })
                .limit(1)
                .maybeSingle(),
            'subscriptionCheck'
        );

        if (error) {
            console.warn('[AccessGuard] Subscription error:', error);
            return false;
        }

        if (!subscription) {
            console.log('[AccessGuard] No active, paid subscription found');
            return false;
        }

        // Double-check expiry date (belt and braces)
        if (subscription.expiry_date && new Date(subscription.expiry_date).getTime() < Date.now()) {
            console.log('[AccessGuard] Subscription expired');
            return false;
        }

        // Check if the requested module matches the active_module
        // active_module is a single text value, not an array
        const hasModule = subscription.active_module === moduleSlug;
        console.log('[AccessGuard] Active module:', subscription.active_module, 'Requested:', moduleSlug, '->', hasModule);
        
        return hasModule;

    } catch (error) {
        console.warn('[AccessGuard] Module check error:', error);
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
    console.log('[AccessGuard] Starting...');
    const start = performance.now();

    try {
        // Check SDK
        if (!window.supabase?.createClient) {
            console.warn('[AccessGuard] SDK not available');
            revealPage();
            return;
        }

        const client = getSharedSupabaseClient();
        if (!client) {
            console.warn('[AccessGuard] Could not obtain Supabase client');
            revealPage();
            return;
        }

        // Get session
        const { data: { session } } = await withTimeout(client.auth.getSession(), 'getSession');
        if (!session?.user) {
            console.log('[AccessGuard] No session');
            revealPage();
            return;
        }

        // Get profile - using actual schema columns
        const { data: profile, error } = await withTimeout(
            client
                .from('profiles')
                .select('is_active, role, is_admin')
                .eq('id', session.user.id)
                .single(),
            'profileFetch'
        );

        if (error || !profile) {
            console.warn('[AccessGuard] Profile error:', error?.message);
            revealPage();
            return;
        }

        // Update activity (fire and forget)
        client.from('profiles').update({ last_activity: new Date().toISOString() })
            .eq('id', session.user.id)
            .then(({ error }) => {
                if (error) console.warn('[AccessGuard] Activity ping failed');
            });

        // Check admin
        const role = profile.role?.toLowerCase();
        const isAdmin = profile.is_admin === true ||
            role === 'admin' ||
            role === 'superadmin' ||
            role === 'administrator';

        if (isAdmin) {
            console.log('[AccessGuard] Admin user - full access');
            revealPage();
            return;
        }

        // Check profile-level active status (no access_expires_at in profiles table)
        // Using is_active from profiles table
        if (profile.is_active === false) {
            console.log('[AccessGuard] Account inactive');
            const moduleSlugForName = getCurrentModuleSlug();
            const moduleNames = {
                'imed': 'Internal Medicine',
                'surgery': 'Surgery',
                'peds': 'Pediatrics',
                'obgyn': 'OB/GYN'
            };
            showUpgradeModal(moduleNames[moduleSlugForName] || 'Module');

            const hideStyle = document.createElement('style');
            hideStyle.id = 'access-guard-hide-content';
            hideStyle.textContent = '#moduleContent, .main-wrap { display: none !important; }';
            document.head.appendChild(hideStyle);
            return;
        }

        // Module-level access check using active_module from subscriptions
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
                console.log(`[AccessGuard] ❌ Access denied: ${moduleNames[moduleSlug] || moduleSlug}`);

                const hideStyle = document.createElement('style');
                hideStyle.id = 'access-guard-hide-content';
                hideStyle.textContent = '#moduleContent, .main-wrap { display: none !important; }';
                document.head.appendChild(hideStyle);

                showUpgradeModal(moduleNames[moduleSlug] || moduleSlug);
                return;
            }
        }

        // All checks passed
        console.log(`[AccessGuard] ✅ Access granted (${Math.round(performance.now() - start)}ms)`);
        revealPage();

    } catch (error) {
        if (error && String(error.message).startsWith('TIMEOUT')) {
            console.warn(`[AccessGuard] Timed out waiting on ${error.message.split(':')[1]} — revealing page rather than hanging.`);
        } else {
            console.error('[AccessGuard] Error:', error);
        }
        revealPage();
    }
})();
