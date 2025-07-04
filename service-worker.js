//attempt was made at implenting offline cache but it was not successful.

/* const CACHE_NAME = "goout-cache-v1";
const STATIC_ASSETS = [
  "./src/html/login.html",
  "./src/html/interest.html",
  "./src/html/main.html",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];
 */
// unable to solve error fetchEvent for "http://localhost:3000/src/html/..."...redirected response was used... redirect mode is not "follow".


/* self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
}); */

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
/*   e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })(),
  ); */
});

/* self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request.clone(), { redirect: "follow" });
      
    })
  );
});
 */