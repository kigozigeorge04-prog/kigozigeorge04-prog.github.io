// ================================================================
//  EASEMED — PAGE/MODULE TIME TRACKING
//  Include this after your Supabase client (`sb`) is initialized.
//  Set window.EASEMED_MODULE_NAME before this script loads, or it
//  falls back to the page path.
// ================================================================

(function () {
    let currentLogId = null;
    let startTime = null;
    let flushed = false;

    async function startTracking() {
        try {
            const { data: { user } } = await sb.auth.getUser();
            if (!user) return; // not logged in — skip tracking

            const moduleName = window.EASEMED_MODULE_NAME || document.title || location.pathname;
            startTime = Date.now();

            const { data, error } = await sb.from('activity_logs').insert({
                user_id: user.id,
                event_type: 'module_view',
                module_name: moduleName,
                page_path: location.pathname,
                started_at: new Date(startTime).toISOString(),
            }).select('id').single();

            if (!error && data) {
                currentLogId = data.id;
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
            // navigator.sendBeacon is more reliable than fetch on page unload —
            // fetch calls can get cancelled mid-flight when the tab closes.
            const payload = JSON.stringify({
                duration_seconds: durationSeconds,
                ended_at: new Date().toISOString(),
            });

            await sb.from('activity_logs')
                .update({
                    duration_seconds: durationSeconds,
                    ended_at: new Date().toISOString(),
                })
                .eq('id', currentLogId);
        } catch (e) {
            console.warn('[EaseMed Tracking] Failed to flush:', e.message);
        }
    }

    // Start once the page loads and sb is ready
    if (typeof sb !== 'undefined') {
        startTracking();
    } else {
        // If sb initializes asynchronously elsewhere, poll briefly
        const waitInterval = setInterval(() => {
            if (typeof sb !== 'undefined') {
                clearInterval(waitInterval);
                startTracking();
            }
        }, 200);
        setTimeout(() => clearInterval(waitInterval), 5000);
    }

    // Multiple exit signals — mobile browsers are unreliable about which one fires,
    // so we cover all of them and let the `flushed` guard prevent double-writes.
    window.addEventListener('beforeunload', flushTracking);
    window.addEventListener('pagehide', flushTracking);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') flushTracking();
    });
})();
