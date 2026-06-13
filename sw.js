const CACHE_NAME  = 'easemed-v3';
const REPO        = '/easemed'; // ← change this to your repo name
const OFFLINE_URL = `${REPO}/easemed_login.html`;
const PRECACHE_URLS = [
    'easemed_login.html',
    'easemed_dashboard.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
];
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('supabase.co')) return;
    if (event.request.url.includes('cdn.jsdelivr.net')) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) {
                fetch(event.request).then(response => {
                    if (response && response.status === 200) {
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, response.clone()));
                    }
                }).catch(() => {});
                return cached;
            }

            return fetch(event.request)
                .then(response => {
                    if (response && response.status === 200) {
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(event.request, response.clone()));
                    }
                    return response;
                })
                .catch(() => caches.match(OFFLINE_URL));
        })
    );
});

self.addEventListener('message', event => {
    if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
