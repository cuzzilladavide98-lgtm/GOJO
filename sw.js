/* Service worker - cache offline per L'Allenamento Aureo */
var CACHE = "aureo-v38";
var ASSETS = [
  "./","./index.html","./app.css","./strip.css","./data.js","./figures.js","./chart.js","./app.js","./workout.js","./extras.js","./cavci.js","./seed.js","./riepilogo.js","./cavci_seed.json",
  "./manifest.webmanifest","./icons/icon-180.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-512-maskable.png"
];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(function (hit) {
    return hit || fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { try { c.put(e.request, copy); } catch (err) {} });
      return res;
    }).catch(function () { return caches.match("./index.html"); });
  }));
});
