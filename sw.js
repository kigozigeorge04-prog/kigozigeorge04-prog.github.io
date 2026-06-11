// ─────────────────────────────────────────────────────────────
// EaseMed Service Worker
// Provides full offline capability by caching all app files
// on install and serving them from cache when offline.
// ─────────────────────────────────────────────────────────────

const CACHE_NAME    = 'easemed-v1';
const OFFLINE_URL   = 'easemed_login.html';

// All files that must be cached for the app to work offline
const PRECACHE_URLS = [
    'easemed_login.html',
    'easemed_dashboard.html',
    'manifest.json',
];

// ── INSTALL: cache all core files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Pre-caching app shell');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => self.skipWaiting())  // activate immediately
    );
});

// ── ACTIVATE: delete old caches from previous versions
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            )
        ).then(() => self.clients.claim())  // take control of all tabs
    );
});

// ── FETCH: serve from cache, fall back to network, then offline page
self.addEventListener('fetch', event => {
    // Only handle GET requests for our own origin
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Serve from cache and update in background (stale-while-revalidate)
                    const networkFetch = fetch(event.request)
                        .then(networkResponse => {
                            if (networkResponse && networkResponse.status === 200) {
                                const clone = networkResponse.clone();
                                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                            }
                            return networkResponse;
                        })
                        .catch(() => cachedResponse);  // if network fails, cached is fine
                    
                    return cachedResponse;  // return cache immediately, update silently
                }

                // Not in cache — try network
                return fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Network failed and not cached — return offline page
                        return caches.match(OFFLINE_URL);
                    });
            })
    );
});

// ── MESSAGE: allow pages to trigger cache refresh
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
