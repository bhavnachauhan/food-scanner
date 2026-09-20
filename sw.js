const CACHE_NAME = 'cleanlabel-cache-v1';
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'sw.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/@zxing/library@latest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached asset, otherwise fetch from network
        return response || fetch(event.request);
      })
  );
});
