// sw.js
const CACHE_NAME = 'easemed-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/modules.html',
    '/easemed_login.html',
    '/complete-profile.html',
    '/manifest.json',
    // Add only critical files that you know exist
];

// ── INSTALL ──
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Use Promise.allSettled so one failure doesn't break everything
                return Promise.allSettled(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(err => {
                            console.warn('[SW] Failed to cache:', url, err.message);
                        });
                    })
                );
            })
            .then(() => {
                console.log('[SW] Installation complete');
            })
    );
    self.skipWaiting();
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// ── FETCH ──
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Skip non-cacheable schemes
    const skipSchemes = [
        'chrome-extension:',
        'chrome:',
        'data:',
        'blob:',
        'moz-extension:',
        'edge:'
    ];
    
    if (skipSchemes.includes(url.protocol)) {
        return;
    }
    
    // Skip API calls
    if (url.hostname.includes('supabase.co') ||
        url.hostname.includes('google-analytics') ||
        url.hostname.includes('googletagmanager')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    // Only cache successful responses
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            try {
                                cache.put(event.request, responseToCache);
                            } catch (e) {
                                // Silently fail
                            }
                        })
                        .catch(() => {});
                    return response;
                });
            })
    );
});
