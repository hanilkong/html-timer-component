const CACHE_STATIC_NAME = "SERVICE_WORKER";

//sw.js
self.addEventListener("install", (event) => {
  console.log("Service worker Installing!");
  event.waitUntil(
    //cache 저장소 open
    caches.open(CACHE_STATIC_NAME).then((cache) => {
      //static 파일 cache!
      cache.addAll([
        "/",
        "/index.html",
        "/js/index.js",
        "/css/index.css",
        "/img/timer.png",
        "/sw.js",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker Activating!");
  return self.clients.claim();
});

//fetch event listener
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        //cache에 있다면 cache된 데이터 제공
        return res;
      } else {
        //cache에 없다면 서버로 요청
        return fetch(event.request);
      }
    })
  );
});
