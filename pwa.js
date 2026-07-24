// PWA glue: registers the service worker and offers an "install app" action.
// Classic script (loaded with <script src="pwa.js" defer> on every page) so it
// runs everywhere, including the admin and viewer pages.
(function () {
  "use strict";

  // ---- Register the service worker ----
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* offline support is optional; ignore registration failures */
      });
    });
  }

  var isAr = (localStorage.getItem("dtLang") || "en") === "ar";
  var T = isAr
    ? { install: "تثبيت التطبيق", later: "لاحقًا", ios: "للتثبيت: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية»", close: "إغلاق" }
    : { install: "Install app", later: "Not now", ios: 'To install: tap Share, then "Add to Home Screen"', close: "Close" };

  var standalone =
    window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (standalone) return; // already installed — nothing to prompt

  function injectStyle() {
    if (document.getElementById("pwaStyle")) return;
    var s = document.createElement("style");
    s.id = "pwaStyle";
    s.textContent =
      ".pwa-install{position:fixed;bottom:18px;inset-inline-end:18px;z-index:9999;display:flex;align-items:center;gap:10px;" +
      "background:#2F6F62;color:#fff;border:0;border-radius:999px;padding:12px 18px;font-size:14px;font-weight:700;" +
      "font-family:'IBM Plex Sans','IBM Plex Sans Arabic',system-ui,sans-serif;cursor:pointer;" +
      "box-shadow:0 8px 24px rgba(0,0,0,0.22);max-width:calc(100vw - 36px)}" +
      ".pwa-install:hover{filter:brightness(1.08)}" +
      ".pwa-install .x{opacity:.85;font-size:16px;line-height:1}" +
      ".pwa-tip{position:fixed;bottom:18px;inset-inline:18px;z-index:9999;margin:0 auto;max-width:420px;" +
      "background:#22312E;color:#FAF7F2;border-radius:14px;padding:14px 16px;font-size:14px;line-height:1.5;" +
      "font-family:'IBM Plex Sans','IBM Plex Sans Arabic',system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,0.28);" +
      "display:flex;gap:12px;align-items:flex-start}" +
      ".pwa-tip button{margin-inline-start:auto;background:transparent;border:0;color:#FAF7F2;font-size:18px;cursor:pointer;line-height:1}";
    document.head.appendChild(s);
  }

  // ---- Android / Chromium: use the native install prompt ----
  var deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    injectStyle();
    if (document.getElementById("pwaInstallBtn")) return;
    var btn = document.createElement("button");
    btn.id = "pwaInstallBtn";
    btn.type = "button";
    btn.className = "pwa-install";
    btn.setAttribute("aria-label", T.install);
    btn.innerHTML = "<span>⤓ " + T.install + "</span><span class='x' aria-hidden='true'>✕</span>";
    document.body.appendChild(btn);

    btn.addEventListener("click", function (ev) {
      // Clicking the ✕ portion dismisses without prompting.
      if (ev.target && ev.target.classList && ev.target.classList.contains("x")) {
        btn.remove();
        return;
      }
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        btn.remove();
      });
    });
  });

  window.addEventListener("appinstalled", function () {
    var b = document.getElementById("pwaInstallBtn");
    if (b) b.remove();
  });

  // ---- iOS Safari: no install prompt API — show a one-time hint ----
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isSafari = /^((?!chrome|crios|fxios|android).)*safari/i.test(navigator.userAgent);
  if (isIOS && isSafari && !localStorage.getItem("pwaIosTipSeen")) {
    window.addEventListener("load", function () {
      injectStyle();
      var tip = document.createElement("div");
      tip.className = "pwa-tip";
      tip.setAttribute("role", "note");
      tip.innerHTML = "<span>" + T.ios + "</span><button type='button' aria-label='" + T.close + "'>✕</button>";
      document.body.appendChild(tip);
      tip.querySelector("button").addEventListener("click", function () {
        localStorage.setItem("pwaIosTipSeen", "1");
        tip.remove();
      });
      setTimeout(function () {
        if (tip.parentNode) {
          localStorage.setItem("pwaIosTipSeen", "1");
          tip.remove();
        }
      }, 12000);
    });
  }
})();
