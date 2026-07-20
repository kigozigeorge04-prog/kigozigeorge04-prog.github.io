// sw.js - EaseMed Service Worker (Fixed for CDN compatibility)

const CACHE_NAME = 'easemed-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/modules.html',
    '/easemed_login.html',
    '/complete-profile.html',
    '/profile-completion.html',
    '/manifest.json'
];

// CDN domains to EXCLUDE from caching (let them go directly to network)
const CDN_DOMAINS = [
    'cdn.jsdelivr.net',
    'unpkg.com',
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'supabase.co',
    'js.sentry-cdn.com'
];

// ── HELPER: Check if request is from CDN ──
function isCDNRequest(url) {
    return CDN_DOMAINS.some(domain => url.includes(domain));
}

// ── HELPER: Check if request is cacheable ──
function isCacheableRequest(request) {
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return false;
    }
    
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
        return false;
    }
    
    // Skip CDN requests
    if (isCDNRequest(url.href)) {
        return false;
    }
    
    // Skip API calls
    if (url.hostname.includes('supabase.co') ||
        url.hostname.includes('google-analytics') ||
        url.hostname.includes('googletagmanager') ||
        url.hostname.includes('vercel')) {
        return false;
    }
    
    return true;
}

// ── INSTALL ──
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
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
    console.log('[SW] Activating...');
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
        .then(() => {
            console.log('[SW] Activation complete');
            return self.clients.claim();
        })
    );
});

// ── FETCH ──
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // ── Skip CDN requests completely ──
    if (isCDNRequest(url.href)) {
        // Let CDN requests go directly to network without any SW interference
        console.log('[SW] ⏭️ Skipping CDN request (pass-through):', url.pathname);
        event.respondWith(fetch(request));
        return;
    }
    
    // ── Skip non-cacheable requests ──
    if (!isCacheableRequest(request)) {
        // Still pass through but don't cache
        event.respondWith(fetch(request));
        return;
    }
    
    // ── Cache-first strategy for everything else ──
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // Return cached response, but fetch in background to update
                    console.log('[SW] 📦 Returning cached:', url.pathname);
                    
                    // Background fetch to update cache
                    fetch(request).then(networkResponse => {
                        if (networkResponse && networkResponse.ok) {
                            caches.open(CACHE_NAME).then(cache => {
                                try {
                                    cache.put(request, networkResponse);
                                } catch (e) {
                                    // Silently fail if cache put fails
                                }
                            });
                        }
                    }).catch(() => {
                        // Network fetch failed - that's fine, we have the cache
                    });
                    
                    return cachedResponse;
                }
                
                // Not in cache - fetch from network
                console.log('[SW] 🌐 Fetching from network:', url.pathname);
                return fetch(request).then(networkResponse => {
                    // Cache successful responses for future
                    if (networkResponse && networkResponse.ok && networkResponse.type === 'basic') {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            try {
                                cache.put(request, responseClone);
                            } catch (e) {
                                // Silently fail if cache put fails
                            }
                        });
                    }
                    return networkResponse;
                });
            })
            .catch(() => {
                // Complete failure - show offline page
                console.error('[SW] ❌ Fetch failed for:', url.pathname);
                return new Response(
                    'You are offline. Please check your internet connection.',
                    {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    }
                );
            })
    );
});
