// ─── EaseMed Service Worker ──────────────────────────────────────
// Version: 2.1.1
// Changelog (2.1.0): iOS Safari PWA hardening
//   - Capped dynamic cache size (iOS evicts caches under storage pressure /
//     after ~7 days inactivity — an unbounded cache makes that worse)
//   - Added fetch timeout on network-first paths (iOS WebView can hang
//     longer than desktop on flaky mobile connections)
//   - Added navigation preload for faster repeat HTML loads
//   - Guarded background sync / push registration — unsupported or
//     unreliable on iOS PWAs below iOS 16.4, and only work at all when
//     the app has been added to the Home Screen (not in-browser Safari)
//   - Note: iOS treats the installed (Home Screen) app as a SEPARATE
//     storage/cache context from Safari browser tabs. If you test in
//     Safari then re-test after "Add to Home Screen," caches will look
//     empty again on first load — that's expected, not a bug.

const CACHE_VERSION = 'v2.1.1';
const STATIC_CACHE = `easemed-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `easemed-dynamic-${CACHE_VERSION}`;

const STATIC_FILES = [
    '/',
    '/easemed_login.html',
    '/modules.html',
    '/complete-profile.html',
    '/js/supabase.min.js',
    '/manifest.json'
];

// iOS Safari can evict storage aggressively — keep the dynamic cache
// bounded so eviction (when it happens) isn't compounded by unbounded growth.
const DYNAMIC_CACHE_MAX_ITEMS = 60;

// Network requests on iOS WebView can hang far longer than desktop on poor
// mobile connections. Race every network-first fetch against this timeout
// so the cache/offline fallback kicks in promptly instead of the UI stalling.
const NETWORK_TIMEOUT_MS = 6000;

// ─── HELPERS ──────────────────────────────────────────────────────

function fetchWithTimeout(request, timeoutMs) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('network-timeout')), timeoutMs);
        fetch(request)
            .then((response) => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch((err) => {
                clearTimeout(timer);
                reject(err);
            });
    });
}

async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxItems) return;
    // Evict oldest entries first (cache.keys() returns insertion order)
    const excess = keys.length - maxItems;
    for (let i = 0; i < excess; i++) {
        await cache.delete(keys[i]);
    }
}

async function putInCache(cacheName, request, response) {
    try {
        const cache = await caches.open(cacheName);
        await cache.put(request, response);
        if (cacheName === DYNAMIC_CACHE) {
            await trimCache(DYNAMIC_CACHE, DYNAMIC_CACHE_MAX_ITEMS);
        }
    } catch (err) {
        console.warn('[SW] Cache put error:', err);
    }
}

// ─── INSTALL ──────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
    console.log('[SW] Installing version', CACHE_VERSION);
    event.waitUntil(
        (async () => {
            const cache = await caches.open(STATIC_CACHE);
            try {
                await cache.addAll(STATIC_FILES);
            } catch (err) {
                console.warn('[SW] Failed to cache some static assets:', err);
            }
            await cache.put('/offline.html', new Response(offlinePage, {
                headers: { 'Content-Type': 'text/html' }
            }));
            await self.skipWaiting();
        })()
    );
});

// ─── ACTIVATE ────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating version', CACHE_VERSION);
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter((name) => name.startsWith('easemed-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );

            // Navigation preload speeds up repeat HTML loads on iOS Safari.
            // Not all iOS versions support it — feature-detect before enabling.
            if (self.registration.navigationPreload) {
                try {
                    await self.registration.navigationPreload.enable();
                } catch (err) {
                    console.warn('[SW] Navigation preload not available:', err);
                }
            }

            await self.clients.claim();
        })()
    );
});

// ─── FETCH ────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // Don't intercept cross-origin requests — CSP belongs to the page, and
    // responding here can turn a blocked request into an unhandled rejection.
    if (url.origin !== self.location.origin) {
        return;
    }

    // HTML pages — network first (with timeout + preload), fallback to cache
    if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            (async () => {
                try {
                    // Use the preloaded response if the browser already started one
                    const preloaded = 'preloadResponse' in event ? await event.preloadResponse : null;
                    const response = preloaded || await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
                    await putInCache(DYNAMIC_CACHE, request, response.clone());
                    return response;
                } catch (err) {
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    const offline = await caches.match('/offline.html');
                    return offline || new Response('Offline', { status: 503 });
                }
            })()
        );
        return;
    }

    // Static assets — cache first
    if (
        request.url.includes('/js/') ||
        request.url.includes('/css/') ||
        request.url.includes('/fonts/') ||
        request.url.includes('/static/')
    ) {
        event.respondWith(
            (async () => {
                const cached = await caches.match(request);
                if (cached) return cached;
                try {
                    const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
                    if (response.ok) {
                        await putInCache(STATIC_CACHE, request, response.clone());
                    }
                    return response;
                } catch (err) {
                    const fallback = await caches.match(request);
                    return fallback || new Response('Resource not available offline', { status: 404 });
                }
            })()
        );
        return;
    }

    // Everything else — network first
    event.respondWith(
        (async () => {
            try {
                const response = await fetchWithTimeout(request, NETWORK_TIMEOUT_MS);
                if (response.ok) {
                    await putInCache(DYNAMIC_CACHE, request, response.clone());
                }
                return response;
            } catch (err) {
                const cached = await caches.match(request);
                if (cached) return cached;
                return new Response('Resource not available offline', {
                    status: 404,
                    statusText: 'Not Found'
                });
            }
        })()
    );
});

// ─── MESSAGE HANDLING ────────────────────────────────────────────
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// ─── PUSH (guarded — iOS 16.4+ Home Screen apps only) ────────────
// iOS Safari does not support the Push API in-browser at all, and only
// supports it for PWAs that have been added to the Home Screen, on iOS
// 16.4+. Guard so this doesn't throw on unsupported iOS versions.
self.addEventListener('push', (event) => {
    if (!self.registration.showNotification) return;
    let data = {};
    try {
        data = event.data ? event.data.json() : {};
    } catch (err) {
        data = { title: 'EaseMed', body: event.data ? event.data.text() : '' };
    }
    event.waitUntil(
        self.registration.showNotification(data.title || 'EaseMed', {
            body: data.body || '',
            icon: '/icons/icon-192.png',
            badge: '/icons/badge-72.png'
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow('/modules.html');
            }
        })
    );
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
