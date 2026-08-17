/* ぽちっとぬりえ ― オフラインで動かすための Service Worker
   一度ひらけば、以後は電波が無くてもホーム画面から起動できます。

   ※ ファイルを更新したときは CACHE の "v1" の数字を上げてください。
      そうしないと iPad が古い版を使いつづけます。                        */

const CACHE = 'pochi-nurie-v1';

const ASSETS = [
  './',
  './index.html',
  './art.js',
  './haikei.svg',
  './icon.png',
  './icon-512.png',
  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req)
        .then(res => {
          // 同じサイトのファイルだけ、取れたものをキャッシュに足しておく
          if (res.ok && new URL(req.url).origin === location.origin){
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // オフラインでページを開こうとした場合はアプリ本体を返す
          if (req.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 504 });
        });
    })
  );
});
