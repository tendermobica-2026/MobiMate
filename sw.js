/* =====================================================================
   MobiMate — Service Worker
   BUMP `CACHE` ON EVERY DEPLOY. Old caches are purged on activate.
   ===================================================================== */
const CACHE = 'mobimate-v2026.07.27-13';

const CORE = [
  './',
  './index.html',
  './manifest.json'
];

/* Never intercept these — they must always hit the network directly.
   (Firebase RTDB long-polling / websockets, ngrok, localhost tunnels) */
const BYPASS = [
  'firebaseio.com',
  'firebasedatabase.app',
  'googleapis.com',
  'gstatic.com',
  'ngrok-free.dev',
  'ngrok.io',
  'ngrok.app',
  'localhost',
  '127.0.0.1'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE).catch(err => console.warn('[SW] precache partial', err)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data && e.data.type === 'GET_VERSION') {
    e.source && e.source.postMessage({ type: 'VERSION', cache: CACHE });
  }
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // Bypass sync/tunnel traffic entirely — no CORS interception.
  if (BYPASS.some(h => url.hostname.includes(h))) return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (url.origin !== self.location.origin && req.mode !== 'no-cors' && !/\.(js|css|png|svg|woff2?)$/.test(url.pathname)) return;

  // Navigation: network-first so a fresh deploy is picked up immediately.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Assets: stale-while-revalidate.
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});

/* ---- Notifications ---- */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('push', e => {
  let d = { title: 'MobiMate', body: 'New activity' };
  try { if (e.data) d = Object.assign(d, e.data.json()); } catch (_) { if (e.data) d.body = e.data.text(); }
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body,
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: 'mcr'
  }));
});
