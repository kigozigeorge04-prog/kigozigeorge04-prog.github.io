self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('supabase.co')) return;
    if (event.request.url.includes('cdn.jsdelivr.net')) return;

    // Never intercept payment.html — let it always go straight to network.
    // Payment flows must never be served from a stale cache.
    if (event.request.url.includes('payment.html')) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) {
                fetch(event.request).then(response => {
                    if (!response || response.status !== 200) return;
                    let responseToCache;
                    try {
                        responseToCache = response.clone();
                    } catch (e) {
                        return; // body already consumed elsewhere — skip caching silently
                    }
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseToCache));
                }).catch(() => {});
                return cached;
            }
            return fetch(event.request)
                .then(response => {
                    if (!response || response.status !== 200) return response;
                    let responseToCache;
                    try {
                        responseToCache = response.clone();
                    } catch (e) {
                        return response; // body already consumed elsewhere — skip caching silently
                    }
                    caches.open(CACHE_NAME)
                        .then(cache => cache.put(event.request, responseToCache));
                    return response;
                })
                .catch(() => caches.match(OFFLINE_URL));
        })
    );
});
