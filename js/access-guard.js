// Load this in <head>, after /js/supabase.min.js, on every protected module page.
// Redirects inactive or expired users to the payment page, and users with an
// incomplete profile to the profile-completion page, before the module loads.
// Admins (role admin/superadmin/administrator, or is_admin === true) are exempt
// from both subscription and profile-completeness enforcement.
(function hidePageUntilVerified() {
    // Prevents a flash of the module content before an expired/incomplete
    // user is redirected. Requires this <script> tag to be placed in <head>,
    // before the page body renders.
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
(async function enforceEaseMedAccess() {
    const SUPABASE_URL = 'https://uhjcybwczelmqkkapeac.supabase.co';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJpOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';
    const PAYMENT_PAGE = 'easemed_payment.html';
    const COMPLETE_PROFILE_PAGE = 'complete_profile.html';

    function endsWithPage(page) {
        return location.pathname.endsWith('/' + page) || location.pathname.endsWith(page);
    }

    function isPaymentPage() {
        return endsWithPage(PAYMENT_PAGE);
    }

    function isCompleteProfilePage() {
        return endsWithPage(COMPLETE_PROFILE_PAGE);
    }

    function redirectToPayment() {
        if (!isPaymentPage()) {
            location.replace(PAYMENT_PAGE);
            return; // stay hidden; we're navigating away
        }
        revealPage();
    }

    function redirectToCompleteProfile() {
        if (!isCompleteProfilePage() && !isPaymentPage()) {
            location.replace(COMPLETE_PROFILE_PAGE);
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
            .select('is_active, access_expires_at, role, is_admin, university, year_of_study, phone')
            .eq('id', session.user.id)
            .single();
        if (error || !profile) {
            revealPage();
            return;
        }
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

        // Catches accounts that skipped the one-time profile-completion step
        // (e.g. an old session from before this check existed, or a direct
        // link/bookmark into a module). complete_profile.html handles the form.
        const profileComplete = Boolean(profile.university && profile.year_of_study && profile.phone);
        if (!profileComplete) {
            redirectToCompleteProfile();
            return;
        }

        revealPage();
    } catch (error) {
        console.error('[Access guard] Unable to verify access:', error);
        revealPage(); // fail open rather than lock everyone out on a transient error
    }
})();
