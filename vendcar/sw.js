const CACHE_NAME = `my-sample-app-cache-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      './index.html' ,

      './elements.html' ,

      './generic.html' ,

      'assets\css\fontawesome-all.min.css' ,

      'assets\css\main.css' ,

      'assets\css\noscript.css' ,

      './images/Audi A7.jpg',
      './images/Bugatti La Voiture Noire (1).jpg',
      './images/BugattiLaVoitureNoire.jpg',
      './images/Design_sem_nome__5_.jpg',
      './images/fotoferrari2.jpg',
      './images/McLaren Senna (1).jpg',
      './images/McLarenSenna.jpg',
      './images/pic01.jpg',
      './images/pic02.jpg',
      './images/pic03.jpg',
      './images/pic04.jpg',
      './images/pic05.jpg',
     


    ]);
  })());
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      // Try to fetch the resource from the network.
      const fetchResponse = await fetch(event.request);

      // Save the resource in the cache.
      cache.put(event.request, fetchResponse.clone());

      // And return it.
      return fetchResponse;
    } catch (e) {
      // Fetching didn't work get the resource from the cache.
      const cachedResponse = await cache.match(event.request);

      // And return it.
      return cachedResponse;
    }
  })());
});