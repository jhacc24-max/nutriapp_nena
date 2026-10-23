/* Service worker de NutriClínica: permite instalar la app y abrirla sin conexión.
   No guarda en caché las llamadas de Firebase (datos y sesión siempre van a la red). */
const VERSION = "nutriapp-v2";
const CASCARON = ["./", "./index.html", "./manifest.webmanifest", "./iconos-nutri.js", "./icons/icon-192.png", "./icons/icon-512.png"];
const HOSTS_ESTATICOS = ["cdn.tailwindcss.com", "cdnjs.cloudflare.com", "fonts.googleapis.com", "fonts.gstatic.com", "www.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => Promise.allSettled(CASCARON.map((u) => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const mismoOrigen = url.origin === self.location.origin;
  if (!mismoOrigen && !HOSTS_ESTATICOS.includes(url.hostname)) return;
  // Páginas: primero la red (para ver siempre la última versión), y si no hay conexión, la copia guardada.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => { const copia = r.clone(); caches.open(VERSION).then((c) => c.put("./index.html", copia)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Archivos estáticos: de la caché y se refrescan en segundo plano.
  e.respondWith(caches.match(req).then((guardado) => {
    const red = fetch(req).then((r) => { if (r && (r.ok || r.type === "opaque")) { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); } return r; }).catch(() => guardado);
    return guardado || red;
  }));
});
