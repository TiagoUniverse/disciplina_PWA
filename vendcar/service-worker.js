var cacheName = 'vendcar';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',
        './elements.html',
        './generic.html',
        './next-steps.html',
        

        './assets/css/main.css',
        './assets/css/fontawesome-all.min.css',
        './assets/css/noscript.css',

        './assets/js/breakpoints.min.js',
        './assets/js/jquery.scrolly.min.js',
        './assets/js/jquery.min.js',
        './assets/js/jquery.scrollex.min.js',
        './assets/js/jquery.scrolly.min.js',
        './assets/js/main.js',
        './assets/js/util.js',

        './assets/js/jquery.min.js',

        './assets/js/popper.min.js',
        
        '.images/Audi A7.jpg',
        '.images/banner.jpg',
        '.images/BMW 750i.jpg',
        '.images/Bugatti La Voiture Noire (1).jpg',
        '.images/BugattiLaVoitureNoire.jpg',
        '.images/Design_sem_nome__5_.webp',
        '.images/fotoferrari2.jpg',
        '.images/McLaren Senna (1).jpg',
        '.images/McLarenSenna.jpg',
        '.images/pic01.jpg',
        '.images/pic02.jpg',
        '.images/pic03.jpg',
        '.images/pic04.jpg',
        '.images/pic05.jpg',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

  //Atualizacao cache
  /*event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );*/

});

// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
