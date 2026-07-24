// Service worker for the MOCA Executive Reports PWA.
// Precaches the app shell so the site opens offline once installed, and keeps
// content fresh: navigations are network-first (latest report when online,
// cached copy when offline); other assets are stale-while-revalidate.
// Bump VERSION to force a full refresh of the precached shell.
const VERSION = "v1";
const CACHE = "moca-exec-" + VERSION;

// App shell — relative to the SW scope so it works on a subpath (GitHub Pages)
// or a custom domain root alike.
const SHELL = [
  "./",
  "index.html",
  "ministry-project-demand.html",
  "css-project-demand.html",
  "wgs-weekly-status.html",
  "admin-upload.html",
  "report-viewer.html",
  "report.css",
  "home.js",
  "pd-report.js",
  "wgs-report.js",
  "admin.js",
  "viewer.js",
  "common.js",
  "reports-data.js",
  "translations-ar.js",
  "pwa.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-192-maskable.png",
  "icons/icon-512-maskable.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Cache files individually so one missing file can't abort the install.
      await Promise.all(
        SHELL.map((url) => cache.add(new Request(url, { cache: "reload" })).catch(() => {}))
      );
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // Navigations: network-first so the freshest report shows when online,
  // falling back to the cached page (or index) when offline.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          return (await caches.match(req)) || (await caches.match("index.html")) || Response.error();
        }
      })()
    );
    return;
  }

  // Everything else (scripts, styles, icons, fonts): stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      const network = fetch(req)
        .then((res) => {
          // Cache same-origin responses and successful/opaque cross-origin ones (fonts).
          if (res && (res.ok || res.type === "opaque")) {
            caches.open(CACHE).then((c) => c.put(req, res.clone()));
          }
          return res;
        })
        .catch(() => null);
      return cached || (await network) || Response.error();
    })()
  );
});
