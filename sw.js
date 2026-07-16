// sw.js
const CACHE_NAME = 'easemed-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/modules.html',
    '/styles.css',
    '/app.js',
    // ... other assets
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // ── SKIP NON-CACHEABLE SCHEMES ──
    if (url.protocol === 'chrome-extension:' || 
        url.protocol === 'chrome:' ||
        url.protocol === 'data:' ||
        url.protocol === 'blob:' ||
        url.protocol === 'moz-extension:') {
        return;
    }
    
    // ── SKIP SUPABASE API REQUESTS ──
    if (url.hostname.includes('supabase.co')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    // Don't cache if not a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            try {
                                cache.put(event.request, responseToCache);
                            } catch (e) {
                                // Silently fail for non-cacheable requests
                            }
                        });
                    return response;
                });
            })
    );
});
