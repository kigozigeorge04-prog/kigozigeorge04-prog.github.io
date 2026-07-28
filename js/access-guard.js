// Load this in <head>, after /js/supabase.min.js, on every protected module page.
// Redirects inactive or expired users to the payment page before the module loads.
// Admins (role admin/superadmin/administrator, or is_admin === true) are exempt
// from subscription enforcement.
(function hidePageUntilVerified() {
    // Prevents a flash of the module content before an expired user is redirected.
    // Requires this <script> tag to be placed in <head>, before the page body renders.
    const style = document.createElement('style');
    style.id = 'access-guard-hide';
    style.textContent = 'html { visibility: hidden; }';
    document.documentElement.appendChild(style);
    // Safety net: if something goes wrong and the guard never finishes
    // (e.g. Supabase SDK fails to load), don't leave the page hidden forever.
    setTimeout(revealPage, 4000);
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
            return; // stay hidden; we're navigating away
        }
        revealPage();
    }

    try {
        if (!window.supabase?.createClient) {
            revealPage();
            return;
        }
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) {
            // No session — leave enforcement to whatever login guard runs elsewhere.
            revealPage();
            return;
        }
        const { data: profile, error } = await client
            .from('profiles')
            .select('is_active, access_expires_at, role, is_admin')
            .eq('id', session.user.id)
            .single();
        if (error || !profile) {
            revealPage();
            return;
        }

        // Ping activity for any authenticated user with a resolvable profile,
        // regardless of admin/active/expired status below.
        pingActivity(client, session.user.id);

        const role = profile.role?.toLowerCase();
        const isAdmin =
            profile.is_admin === true ||
            role === 'admin' ||
            role === 'superadmin' ||
            role === 'administrator';
        if (isAdmin) {
            revealPage();
            return;
        }
        const isExpired = profile.access_expires_at && new Date(profile.access_expires_at).getTime() < Date.now();
        if (profile.is_active === false || isExpired) {
            redirectToPayment();
            return;
        }
        revealPage();
    } catch (error) {
        console.error('[Access guard] Unable to verify access:', error);
        revealPage(); // fail open rather than lock everyone out on a transient error
    }
})();
