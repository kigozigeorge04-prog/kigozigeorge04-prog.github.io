// ================================================================
//  EASEMED — PAGE/MODULE TIME TRACKING
//  Include this as an external <script src="tracking.js"></script>
//  AFTER the auth script that sets window._sb (e.g. easemed's
//  authCheck() IIFE, which does `window._sb = sb;`).
//
//  Set window.EASEMED_MODULE_NAME before this script loads, or it
//  falls back to the page title / path.
//
//  IMPORTANT: do NOT also paste this code inline elsewhere on the
//  page — include it only once, as this external file, or you will
//  get duplicate activity_logs rows per page view.
// ================================================================

(function () {
    let currentLogId = null;
    let startTime = null;
    let flushed = false;

    async function startTracking() {
        try {
            const { data: { user } } = await window._sb.auth.getUser();
            if (!user) return; // not logged in — skip tracking

            const moduleName = window.EASEMED_MODULE_NAME || document.title || location.pathname;
            startTime = Date.now();

            const { data, error } = await window._sb.from('activity_logs').insert({
                user_id: user.id,
                event_type: 'module_view',
                module_name: moduleName,
                page_path: location.pathname,
                started_at: new Date(startTime).toISOString(),
            }).select('id').single();

            if (!error && data) {
                currentLogId = data.id;
            } else if (error) {
                console.warn('[EaseMed Tracking] Insert failed:', error.message);
            }
        } catch (e) {
            console.warn('[EaseMed Tracking] Failed to start:', e.message);
        }
    }

    async function flushTracking() {
        if (!currentLogId || flushed || !startTime) return;
        flushed = true; // guard against double-fires from multiple event listeners

        const durationSeconds = Math.round((Date.now() - startTime) / 1000);

        // Ignore near-zero durations (accidental double navigation, etc.)
        if (durationSeconds < 1) return;

        try {
            await window._sb.from('activity_logs')
                .update({
                    duration_seconds: durationSeconds,
                    ended_at: new Date().toISOString(),
                })
                .eq('id', currentLogId);
        } catch (e) {
            console.warn('[EaseMed Tracking] Failed to flush:', e.message);
        }
    }

    // Start once window._sb is ready. authCheck() on the page sets
    // window._sb asynchronously (after a Supabase getSession() round trip),
    // so we poll for it rather than assuming it exists at script load time.
    // Timeout is generous (10s) since this needs to tolerate slower
    // connections, not just fast desktop wifi.
    if (typeof window._sb !== 'undefined') {
        startTracking();
    } else {
        const waitInterval = setInterval(() => {
            if (typeof window._sb !== 'undefined') {
                clearInterval(waitInterval);
                startTracking();
            }
        }, 200);
        setTimeout(() => clearInterval(waitInterval), 10000);
    }

    // Multiple exit signals — mobile browsers are unreliable about which one fires,
    // so we cover all of them and let the `flushed` guard prevent double-writes.
    window.addEventListener('beforeunload', flushTracking);
    window.addEventListener('pagehide', flushTracking);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') flushTracking();
    });
})();
