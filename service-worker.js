const CACHE_NAME = "rhythm-app-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./4.mp3",
  "./8.mp3",
  "./icon-192.png",
  "./icon-512.png"
];

// インストール時にファイルをキャッシュ
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("キャッシュを開きました");
      return cache.addAll(urlsToCache);
    })
  );
});

// キャッシュからレスポンスを返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュにあればそれを返し、なければネットワークから取得
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("古いキャッシュを削除:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
