// ─── EaseMed Service Worker ──────────────────────────────────────
// Version: 2.0.5

const CACHE_NAME = 'easemed-v2.0.5';
const STATIC_CACHE = 'easemed-static-v2.0.5';
const DYNAMIC_CACHE = 'easemed-dynamic-v2.0.5';

// Files to cache on install
const STATIC_FILES = [
    '/',
    '/easemed_login.html',
    '/modules.html',
    '/complete-profile.html',
    '/js/supabase.min.js',
    '/manifest.json'
];

// ─── INSTALL ──────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
    console.log('[SW] Installing version 2.0.5');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_FILES)
                    .catch(err => console.warn('[SW] Failed to cache some assets:', err));
            })
            .then(() => self.skipWaiting())
    );
});

// ─── ACTIVATE ────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating version 2.0.5');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            return name.startsWith('easemed-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE;
                        })
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ─── FETCH ────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // Handle Google Fonts - Always network first, don't cache
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
        event.respondWith(fetch(request));
        return;
    }

    // Skip cross-origin requests except for allowed CDNs
    if (url.origin !== self.location.origin) {
        // Allow Sentry and Vercel scripts
        if (url.hostname === 'js.sentry-cdn.com' || 
            url.hostname === 'browser.sentry-cdn.com' ||
            url.hostname === '_vercel' ||
            url.hostname === 'vercel.com') {
            event.respondWith(fetch(request));
            return;
        }
        // Don't cache other cross-origin requests
        return;
    }

    // HTML pages - network first, fallback to cache
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const clonedResponse = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then((cache) => {
                            cache.put(request, clonedResponse);
                        })
                        .catch(err => console.warn('[SW] Cache put error:', err));
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) return cachedResponse;
                            return caches.match('/offline.html');
                        });
                })
        );
        return;
    }

    // Static assets - cache first
    if (
        request.url.includes('/js/') ||
        request.url.includes('/css/') ||
        request.url.includes('/fonts/') ||
        request.url.includes('/static/')
    ) {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then((response) => {
                            if (response.ok) {
                                const clonedResponse = response.clone();
                                caches.open(STATIC_CACHE)
                                    .then((cache) => {
                                        cache.put(request, clonedResponse);
                                    })
                                    .catch(err => console.warn('[SW] Cache put error:', err));
                            }
                            return response;
                        })
                        .catch(() => {
                            return caches.match(request);
                        });
                })
        );
        return;
    }

    // All other requests - network first
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (response.ok) {
                    const clonedResponse = response.clone();
                    caches.open(DYNAMIC_CACHE)
                        .then((cache) => {
                            cache.put(request, clonedResponse);
                        })
                        .catch(err => console.warn('[SW] Cache put error:', err));
                }
                return response;
            })
            .catch(() => {
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) return cachedResponse;
                        return new Response('Resource not available offline', {
                            status: 404,
                            statusText: 'Not Found'
                        });
                    });
            })
    );
});

// ─── MESSAGE HANDLING ────────────────────────────────────────────
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// ─── OFFLINE PAGE ────────────────────────────────────────────────
const offlinePage = `
<!DOCTYPE html>
<html>
<head>
    <title>Offline - EaseMed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: system-ui, sans-serif;
            text-align: center;
            padding: 40px 20px;
            background: #E8F4FD;
            color: #0B1A2E;
        }
        h1 { font-size: 1.8rem; }
        p { color: #555; max-width: 400px; margin: 16px auto; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #3B82F6;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
        }
        .btn:hover { background: #2563EB; }
    </style>
</head>
<body>
    <h1>📡 You're Offline</h1>
    <p>EaseMed needs an internet connection to load your clinical clerking modules.</p>
    <p style="font-size:0.9rem;color:#888;">Please check your connection and try again.</p>
    <br>
    <button class="btn" onclick="location.reload()">Retry</button>
</body>
</html>
`;

// Cache offline page during install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                return cache.put('/offline.html', new Response(offlinePage, {
                    headers: { 'Content-Type': 'text/html' }
                }));
            })
    );
});
