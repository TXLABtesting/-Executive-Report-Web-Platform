// Shared helpers for all report portal pages.
import * as m from "./reports-data.js";
import * as T from "./translations-ar.js";

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function applyTheme(name = "Warm Paper") {
  for (const [prop, value] of Object.entries(m.themes[name] || m.themes["Warm Paper"])) {
    document.documentElement.style.setProperty(prop, value);
  }
}

export const getLang = () => localStorage.getItem("dtLang") || "en";
export const setLang = (lang) => localStorage.setItem("dtLang", lang);

// Language-bound translators for data strings, statuses, types and dates.
export function translators(lang) {
  const isAr = lang === "ar";
  return {
    isAr,
    dir: isAr ? "rtl" : "ltr",
    langLabel: isAr ? "English" : "العربية",
    backArrow: isAr ? "→" : "←",
    tr: (s) => (isAr && T.AR[s] ? T.AR[s] : s),
    trS: (s) => (isAr ? T.STATUS_AR[s] || s : s),
    trT: (s) => (isAr ? T.TYPE_AR[s] || s : s),
    trD: (s) => (isAr ? T.arDate(s) : s),
  };
}

export const badge = (s) => m.statusColors[s] || m.statusColors["TBC"];

export function storedWeeks(type) {
  try {
    const all = JSON.parse(localStorage.getItem("dtWeeks") || "[]");
    return type ? all.filter((x) => x.type === type) : all;
  } catch {
    return [];
  }
}

// Scroll-spy: highlights the section-nav pill of the section currently in view.
export function initScrollSpy(order) {
  const spy = () => {
    let cur = "";
    for (const id of order) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 150) cur = id;
    }
    document.querySelectorAll(".section-nav .nav-pill").forEach((pill) => {
      pill.classList.toggle("active", pill.getAttribute("href") === "#" + cur);
    });
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();
}
