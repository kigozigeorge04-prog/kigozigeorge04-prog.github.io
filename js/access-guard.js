// ─── ACCESS GUARD ───
// The subscriptions table is the single source of truth for module access.
(() => {
    // Prevent duplicate execution
    if (window.__accessGuardExecuted) {
        console.log('[AccessGuard] Already executed, skipping');
        return;
    }
    
    console.log('[AccessGuard] Starting...');
    
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
        modal.innerHTML = `
            <div style="background:#fff;max-width:400px;width:100%;border-radius:20px;padding:32px;text-align:center">
                <div style="font-size:3rem">🔒</div>
                <h2>Access Restricted</h2>
                <p>The "${moduleName}" module requires an active subscription.</p>
                <p>Premium Access — <strong>UGX 10,000/month</strong></p>
                <button onclick="location.href='subscription.html'" style="background:#1a5f7a;color:#fff;border:none;padding:12px 30px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:12px;">Upgrade Now</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    function showLoadingError() {
        const errorDiv = document.createElement('div');
        errorDiv.id = 'access-guard-error';
        errorDiv.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:999999;display:flex;align-items:center;justify-content:center;padding:24px;';
        errorDiv.innerHTML = `
            <div style="background:#fff;max-width:400px;width:100%;border-radius:20px;padding:32px;text-align:center">
                <div style="font-size:3rem">⚠️</div>
                <h2>Loading Error</h2>
                <p>Could not load required resources. Please refresh the page or check your internet connection.</p>
                <button onclick="location.reload()" style="background:#1a5f7a;color:#fff;border:none;padding:12px 30px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:12px;">Refresh Page</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
    }

    async function hasModuleAccess(client, userId, moduleSlug) {
        try {
            const { data: subscription, error } = await client
                .from('subscriptions')
                .select('plan_type, active_module, expiry_date, status')
                .eq('user_id', userId)
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.warn('[AccessGuard] Subscription query error:', error);
                return false;
            }
            
            if (!subscription) {
                console.log('[AccessGuard] No active subscription found');
                return false;
            }
            
            if (subscription.expiry_date && new Date(subscription.expiry_date).getTime() < Date.now()) {
                console.log('[AccessGuard] Subscription expired');
                return false;
            }
            
            if (subscription.plan_type === 'premium' || subscription.plan_type === 'free_trial') {
                console.log('[AccessGuard] Premium/free trial access granted');
                return true;
            }
            
            const hasAccess = subscription.plan_type === 'basic' && subscription.active_module === moduleSlug;
            console.log('[AccessGuard] Basic plan access:', hasAccess);
            return hasAccess;
            
        } catch (error) {
            console.error('[AccessGuard] Error checking access:', error);
            return false;
        }
    }

    async function enforceAccess() {
        const moduleSlug = getCurrentModuleSlug();
        if (!moduleSlug) {
            console.log('[AccessGuard] No module slug for:', location.pathname);
            window.__accessGuardExecuted = true;
            return;
        }

        console.log('[AccessGuard] Checking access for module:', moduleSlug);

        // Wait for Supabase SDK to be available with retries
        let attempts = 0;
        const maxAttempts = 30; // 15 seconds max
        
        function waitForSDK() {
            attempts++;
            const client = getClient();
            if (client) {
                console.log('[AccessGuard] SDK ready after', attempts, 'attempts');
                return client;
            }
            if (attempts >= maxAttempts) {
                console.error('[AccessGuard] SDK not available after', maxAttempts, 'attempts');
                showLoadingError();
                window.__accessGuardExecuted = true;
                return null;
            }
            return null;
        }

        let client = getClient();
        if (!client) {
            // Wait with exponential backoff
            let delay = 100;
            while (delay < 3000) {
                await new Promise(resolve => setTimeout(resolve, delay));
                client = getClient();
                if (client) {
                    console.log('[AccessGuard] SDK ready after', attempts, 'attempts');
                    break;
                }
                delay = Math.min(delay * 1.5, 2000);
            }
        }

        if (!client) {
            console.error('[AccessGuard] Failed to get Supabase client');
            showLoadingError();
            window.__accessGuardExecuted = true;
            return;
        }

        try {
            const { data: { session }, error: sessionError } = await client.auth.getSession();
            
            if (sessionError) {
                console.warn('[AccessGuard] Session error:', sessionError);
                // Don't hide content, let the page handle it
                window.__accessGuardExecuted = true;
                return;
            }
            
            if (!session?.user) {
                console.log('[AccessGuard] No session found, showing login');
                // Don't hide content, let the auth system handle it
                window.__accessGuardExecuted = true;
                return;
            }

            console.log('[AccessGuard] User authenticated:', session.user.email);
            
            const allowed = await hasModuleAccess(client, session.user.id, moduleSlug);
            
            if (allowed) {
                console.log('[AccessGuard] Access granted for module:', moduleSlug);
                window.__accessGuardExecuted = true;
                return;
            }

            console.log('[AccessGuard] Access denied for module:', moduleSlug);
            hideModuleContent();
            const names = { imed: 'Internal Medicine', surgery: 'Surgery', peds: 'Pediatrics', obgyn: 'OB/GYN' };
            showUpgradeModal(names[moduleSlug] || 'This');
            
        } catch (error) {
            console.warn('[AccessGuard] Access check failed:', error);
            // Don't hide content on error, let the page try to load
        }
        
        window.__accessGuardExecuted = true;
    }

    // Start the access check with a small delay to let SDK load
    setTimeout(() => {
        enforceAccess().catch(error => {
            console.error('[AccessGuard] Fatal error:', error);
            window.__accessGuardExecuted = true;
        });
    }, 200);
})();
