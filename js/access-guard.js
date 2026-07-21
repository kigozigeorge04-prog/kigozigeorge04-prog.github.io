// Load this after /js/supabase.min.js on every protected module page.
// Redirects inactive or expired users to the payment page before the module loads.
(async function enforceEaseMedAccess() {
    const SUPABASE_URL = 'https://uhjcybwczelmqkkapeac.supabase.co';
    const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJpOiJzdXBhYmFzZSIsInJlZiI6InVoamN5YndjemVsbXFra2FwZWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMTU3NjEsImV4cCI6MjA5Njc5MTc2MX0.mEkfofQUeBpjOgdyWqCkiX695pxbjY1LUpYrzhVH1Jc';
    const PAYMENT_PAGE = 'easemed_payment.html';

    function redirectToPayment() {
        if (!location.pathname.endsWith('/' + PAYMENT_PAGE) && !location.pathname.endsWith(PAYMENT_PAGE)) {
            location.replace(PAYMENT_PAGE);
        }
    }

    try {
        if (!window.supabase?.createClient) return;

        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        const { data: { session } } = await client.auth.getSession();
        if (!session?.user) return;

        const { data: profile, error } = await client
            .from('profiles')
            .select('is_active, access_expires_at')
            .eq('id', session.user.id)
            .single();

        if (error || !profile) return;

        const isExpired = profile.access_expires_at && new Date(profile.access_expires_at).getTime() < Date.now();
        if (profile.is_active === false || isExpired) redirectToPayment();
    } catch (error) {
        console.error('[Access guard] Unable to verify access:', error);
    }
})();
