// ─── ACCESS GUARD ───
// Load this in <head>, after /js/supabase.min.js, on every protected module page.
// Redirects inactive or expired users to the payment page before the module loads.
// Admins (role admin/superadmin/administrator, or is_admin === true) are exempt
// from subscription enforcement.

// ─── CONFIG ───
const MODULE_SLUG_CONFIG = {
    // Map page URLs to module slugs
    'easemed_dashboard.html': 'imed',
    'surgery-clerking.html': 'surgery',
    'easemed_pediatrics.html': 'peds',
    'ObGyn.html': 'obgyn'
};

// ─── GET MODULE SLUG FROM CURRENT PAGE ───
function getCurrentModuleSlug() {
    const pageName = location.pathname.split('/').pop();
    return MODULE_SLUG_CONFIG[pageName] || null;
}

// ─── HIDE PAGE UNTIL VERIFIED ───
(function hidePageUntilVerified() {
    // Prevents a flash of the module content before an expired user is redirected.
    // Requires this <script> tag to be placed in <head>, before the page body renders.
    const style = document.createElement('style');
    style.id = 'access-guard-hide';
    style.textContent = 'html { visibility: hidden; }';
    document.documentElement.appendChild(style);
    // Safety net: if something goes wrong and the guard never finishes
    // (e.g. Supabase SDK fails to load), don't leave the page hidden forever.
    setTimeout(revealPage, 5000);
})();

function revealPage() {
    document.getElementById('access-guard-hide')?.remove();
}

// ─── ACTIVITY PING (throttled, fire-and-forget) ───
const ACTIVITY_PING_KEY = 'easemed_last_activity_ping';
const ACTIVITY_PING_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function pingActivity(client, userId) {
    try {
        const last = parseInt(sessionStorage.getItem(ACTIVITY_PING_KEY) || '0', 10);
        const now = Date.now();
        if (now - last < ACTIVITY_PING_INTERVAL_MS) return; // throttled, skip

        sessionStorage.setItem(ACTIVITY_PING_KEY, String(now));

        client
            .from('profiles')
            .update({ last_activity: new Date().toISOString() })
            .eq('id', userId)
            .then(({ error }) => {
                if (error) console.warn('[Access guard] Activity ping failed:', error.message);
            });
    } catch (e) {
        console.warn('[Access guard] Activity ping error:', e);
    }
}

// ─── CHECK MODULE ACCESS ───
async function checkModuleAccess(client, userId, moduleSlug) {
    if (!moduleSlug) {
        // If no module slug, assume it's not a module page (e.g., profile, subscription)
        return true;
    }

    try {
        // First check if user has any active subscription
        const { data: subscription, error: subError } = await client
            .from('subscriptions')
            .select('plan_type, active_module, expiry_date, status')
            .eq('user_id', userId)
            .eq('status', 'active')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (subError) {
            console.warn('[Access guard] Subscription check error:', subError.message);
            return false;
        }

        // If no subscription, check for free trial
        if (!subscription) {
            // Check if user has ever had a free trial that's still valid
            const { data: freeTrial, error: trialError } = await client
                .from('subscriptions')
                .select('plan_type, expiry_date')
                .eq('user_id', userId)
                .eq('plan_type', 'free_trial')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (!trialError && freeTrial && new Date(freeTrial.expiry_date).getTime() > Date.now()) {
                return true; // Free trial active
            }

            return false; // No active subscription
        }

        // Check if subscription is expired
        if (subscription.expiry_date && new Date(subscription.expiry_date).getTime() < Date.now()) {
            return false;
        }

        // Premium has access to all modules
        if (subscription.plan_type === 'premium') {
            return true;
        }

        // Free trial has access to all modules
        if (subscription.plan_type === 'free_trial') {
            return true;
        }

        // Basic has access only to their active module
        if (subscription.plan_type === 'basic') {
            return subscription.active_module === moduleSlug;
        }

        return false;

    } catch (error) {
        console.warn('[Access guard] Module access check error:', error);
        return false;
    }
}

// ─── SHOW UPGRADE MODAL ───
function showUpgradeModal(moduleName) {
    const modal = document.createElement('div');
    modal.id = 'upgradeModal';
    modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.6);
        backdrop-filter: blur(8px); z-index: 99999;
        display: flex; align-items: center; justify-content: center;
        padding: 24px; animation: fadeIn 0.3s ease;
    `;
    modal.innerHTML = `
        <div style="background:white; max-width:420px; width:100%; border-radius:20px; padding:32px; text-align:center; box-shadow:0 24px 80px rgba(0,0,0,0.2);">
            <div style="font-size:3rem; margin-bottom:12px;">🔒</div>
            <h2 style="font-family:'Lora',serif; font-size:1.5rem; margin-bottom:8px; color:#0B1A2E;">Access Restricted</h2>
            <p style="color:rgba(11,26,46,0.6); margin-bottom:8px; font-size:0.95rem; line-height:1.6;">
                ${moduleName ? `The "${moduleName}" module` : 'This module'} requires a subscription.
            </p>
            <div style="background:rgba(245,158,11,0.08); padding:14px; border-radius:12px; margin:16px 0; border:1px solid rgba(245,158,11,0.15);">
                <strong style="color:#D97706; font-size:0.95rem;">⚡ Quick Upgrade</strong>
                <p style="font-size:0.85rem; color:rgba(11,26,46,0.5); margin-top:4px;">
                    Get Premium Access for only <strong style="color:#0B1A2E;">UGX 10,000/month</strong>
                </p>
                <p style="font-size:0.75rem; color:rgba(11,26,46,0.3); margin-top:4px;">
                    🔄 Cancel anytime
                </p>
            </div>
            <div style="display:flex; gap:12px; margin-top:8px;">
                <button onclick="window.location.href='subscription.html'" style="flex:1; padding:12px; border:none; border-radius:12px; background:linear-gradient(135deg,#3B82F6,#2563EB); color:white; font-weight:700; font-size:0.95rem; cursor:pointer; font-family:'Inter',sans-serif; transition:transform 0.2s, box-shadow 0.2s;">
                    🚀 Upgrade Now
                </button>
                <button onclick="this.closest('#upgradeModal').remove()" style="flex:1; padding:12px; border:none; border-radius:12px; background:rgba(255,255,255,0.1); color:#0B1A2E; font-weight:600; font-size:0.95rem; cursor:pointer; font-family:'Inter',sans-serif; border:1px solid rgba(11,26,46,0.1);">
                    Cancel
                </button>
            </div>
            <p style="font-size:0.7rem; color:rgba(11,26,46,0.3); margin-top:14px;">
                Already subscribed? <a href="#" onclick="location.reload()" style="color:#3B82F6; text-decoration:none; font-weight:600;">Refresh</a>
            </p>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === this) this.remove();
    });
}

// ─── MAIN ENFORCEMENT ───
(async function enforceEaseMedAccess() {
    const SUPABASE_URL = 'https://uhjcybwczelmqkkapeac.supabase.co';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';
    const PAYMENT_PAGE = 'easemed_payment.html';

    function isPaymentPage() {
        return location.pathname.endsWith('/' + PAYMENT_PAGE) || location.pathname.endsWith(PAYMENT_PAGE);
    }
    
    function redirectToPayment() {
        if (!isPaymentPage()) {
            location.replace(PAYMENT_PAGE);
            return;
        }
        revealPage();
    }

    try {
        // Check Supabase SDK
        if (!window.supabase?.createClient) {
            console.warn('[Access guard] Supabase SDK not available');
            revealPage();
            return;
        }

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        const { data: { session } } = await client.auth.getSession();
        
        if (!session?.user) {
            // No session — leave enforcement to login guard
            revealPage();
            return;
        }

        // Get user profile
        const { data: profile, error } = await client
            .from('profiles')
            .select('is_active, access_expires_at, role, is_admin')
            .eq('id', session.user.id)
            .single();

        if (error || !profile) {
            console.warn('[Access guard] Profile fetch error:', error?.message);
            revealPage();
            return;
        }

        // Ping activity
        pingActivity(client, session.user.id);

        // Check if admin (exempt from subscription checks)
        const role = profile.role?.toLowerCase();
        const isAdmin = profile.is_admin === true ||
            role === 'admin' ||
            role === 'superadmin' ||
            role === 'administrator';

        if (isAdmin) {
            revealPage();
            return;
        }

        // Check if subscription is expired or inactive
        const isExpired = profile.access_expires_at && new Date(profile.access_expires_at).getTime() < Date.now();
        if (profile.is_active === false || isExpired) {
            redirectToPayment();
            return;
        }

        // ─── MODULE-SPECIFIC ACCESS CHECK ───
        const moduleSlug = getCurrentModuleSlug();
        const pageName = location.pathname.split('/').pop();
        const isModulePage = moduleSlug !== null;

        // Only check module access if it's a module page
        if (isModulePage) {
            const hasModuleAccess = await checkModuleAccess(client, session.user.id, moduleSlug);
            
            if (!hasModuleAccess) {
                // Get module name for display
                const moduleNames = {
                    'imed': 'Internal Medicine',
                    'surgery': 'Surgery',
                    'peds': 'Pediatrics',
                    'obgyn': 'OB/GYN'
                };
                const moduleName = moduleNames[moduleSlug] || moduleSlug;
                
                // Show upgrade modal
                showUpgradeModal(moduleName);
                
                // Hide page content
                const style = document.createElement('style');
                style.id = 'access-guard-hide-module';
                style.textContent = '#moduleContent, .main-wrap { display: none !important; }';
                document.head.appendChild(style);
                
                return; // Don't reveal page
            }
        }

        // All checks passed - reveal the page
        revealPage();

    } catch (error) {
        console.error('[Access guard] Unable to verify access:', error);
        revealPage(); // fail open rather than lock everyone out on a transient error
    }
})();

// ─── ADD FADE IN ANIMATION ───
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(styleSheet);
