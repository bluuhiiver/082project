const CACHE = 'skinly-v3';

self.addEventListener('install', e => {
  // 상대 경로 사용: GitHub Pages처럼 하위 경로에 배포돼도 동작
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './catalog.js'])));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // API·CDN 요청은 네트워크로 직행
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
