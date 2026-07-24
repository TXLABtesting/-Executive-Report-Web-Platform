// Home page — weekly status report hub.
// Renders the report cards and weekly archive from reports-data.js,
// with EN/AR localization (translations-ar.js) and uploaded weeks from localStorage.

import * as m from "./reports-data.js";
import * as T from "./translations-ar.js";

const I18N = {
  en: {
    ministry: "Ministry of Cabinet Affairs",
    siteTitle: "Digital Transformation Team — Executive Reports",
    h1a: "Weekly Status",
    h1b: "Reports",
    tagline: "Executive view of the weekly report updates for the Sector Head.",
    lastUpdated: "Last updated",
    searchPh: "Search reports, projects, meetings, actions…",
    results: "results",
    noResults: "No matches across reports, projects, meetings or actions.",
    reportingDate: "Reporting date",
    openReport: "Open report →",
    originalPdf: "Original PDF",
    ministryTitle: "Ministry Project & Demand",
    cssTitle: "CSS Project & Demand",
    tecTitle: "Total Experience Center Status Report",
    archive: "Weekly Archive",
    archivePh: "Filter by week or date…",
    issued: "Issued",
    admin: "Admin",
    noWeeks: "No archived weeks match that search.",
    footer: "Ministry of Cabinet Affairs · Digital Transformation Department · Confidential",
  },
  ar: {
    ministry: "وزارة شؤون مجلس الوزراء",
    siteTitle: "فريق التحول الرقمي — التقارير التنفيذية",
    h1a: "تقارير الحالة",
    h1b: "الأسبوعية",
    tagline: "عرض تنفيذي لتحديثات التقارير الأسبوعية لرئيس القطاع.",
    lastUpdated: "آخر تحديث",
    searchPh: "ابحث في التقارير والمشاريع والاجتماعات والإجراءات…",
    results: "نتيجة",
    noResults: "لا توجد نتائج مطابقة في التقارير أو المشاريع أو الاجتماعات أو الإجراءات.",
    reportingDate: "تاريخ التقرير",
    openReport: "فتح التقرير ←",
    originalPdf: "ملف PDF الأصلي",
    ministryTitle: "مشاريع وطلبات الوزارة",
    cssTitle: "مشاريع وطلبات CSS",
    tecTitle: "تقرير حالة مركز التجربة الشاملة",
    archive: "الأرشيف الأسبوعي",
    archivePh: "تصفية حسب الأسبوع أو التاريخ…",
    issued: "صدر في",
    admin: "إدارة النظام",
    noWeeks: "لا توجد أسابيع مؤرشفة مطابقة.",
    footer: "وزارة شؤون مجلس الوزراء · إدارة التحول الرقمي · سرّي",
  },
};

// Portal cards hidden from the landing grid for now. Remove a key to show it
// again (e.g. re-enable "wgs" and "tec" when those portals go live). A hidden
// portal is also kept out of the weekly archive and global search so it is not
// reachable while its card is off.
const HIDDEN_PORTALS = ["wgs", "tec"];
const wgsHidden = HIDDEN_PORTALS.includes("wgs");
// A report link that belongs to a currently hidden portal (only WGS has an
// internal report page; TEC is an external card with no archive/search entry).
const isHiddenReport = (href) => wgsHidden && typeof href === "string" && href.startsWith(m.wgsReport.href);

const state = {
  lang: localStorage.getItem("dtLang") || "en",
  aq: "",
};

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Apply the default theme's CSS custom properties on the root element.
for (const [prop, value] of Object.entries(m.themes["Warm Paper"])) {
  document.documentElement.style.setProperty(prop, value);
}

const isAr = () => state.lang === "ar";
const L = () => I18N[state.lang];
const tr = (s) => (isAr() && T.AR[s] ? T.AR[s] : s);
const trStatus = (s) => (isAr() ? T.STATUS_AR[s] || s : s);
const trType = (s) => (isAr() ? T.TYPE_AR[s] || s : s);
const trDate = (s) => (isAr() ? T.arDate(s) : s);

function storedWeeks() {
  try {
    return JSON.parse(localStorage.getItem("dtWeeks") || "[]");
  } catch {
    return [];
  }
}

// Uploaded weeks with extracted data open in the matching report portal; raw uploads open in the viewer.
// Demand uploads default to the ministry portal href; both P&D portals accept ?week=.
function uploadHref(u, page) {
  return u.data
    ? (page || (u.type === "wgs" ? m.wgsReport.href : m.MINISTRY_DEMAND_HREF)) + "?week=" + u.id
    : "report-viewer.html?id=" + u.id;
}

// The four access portals shown on the landing page, plus any "other" uploaded reports.
function computePortals() {
  const l = L();
  const stored = storedWeeks();
  // Only uploads with extracted interactive content take over the portal cards;
  // PDF-only uploads stay reachable from the weekly archive and the admin page
  // without replacing the current interactive report.
  const latest = (type) => stored.find((x) => x.type === type && x.data);
  const lw = latest("wgs");
  const ld = latest("demand");
  const pdHref = (page) => (ld && ld.data ? page + "?week=" + ld.id : page);

  const portals = [
    {
      key: "wgs",
      title: tr(m.wgsReport.title),
      kicker: tr(m.wgsReport.programme),
      date: trDate(lw ? lw.date : m.wgsReport.date),
      overallStatus: lw ? lw.status : m.wgsReport.overallStatus,
      href: lw ? uploadHref(lw) : m.wgsReport.href,
    },
    {
      key: "ministry",
      title: l.ministryTitle,
      kicker: tr(m.site.dept),
      date: trDate(ld ? ld.date : m.demandReport.date),
      overallStatus: ld ? ld.status : m.demandReport.overallStatus,
      href: pdHref(m.MINISTRY_DEMAND_HREF),
    },
    {
      key: "css",
      title: l.cssTitle,
      kicker: tr(m.site.dept),
      date: trDate(ld ? ld.date : m.demandReport.date),
      overallStatus: ld ? ld.status : m.demandReport.overallStatus,
      href: pdHref(m.CSS_DEMAND_HREF),
    },
    {
      // External portal — destination link intentionally removed; the new URL
      // will be provided later. The card stays visible with a disabled button.
      key: "tec",
      title: l.tecTitle,
      kicker: tr(m.site.dept),
      date: trDate(m.site.lastUpdated),
      overallStatus: "Pending",
      href: "",
    },
  ].filter((p) => !HIDDEN_PORTALS.includes(p.key));

  const others = stored
    .filter((x) => x.type === "other")
    .map((u) => ({ title: tr(u.title), kicker: tr(m.site.dept), date: trDate(u.date), overallStatus: u.status, href: uploadHref(u) }));

  return [...portals, ...others].map((r) => ({
    ...r,
    status: trStatus(r.overallStatus),
    badge: m.statusColors[r.overallStatus] || m.statusColors["TBC"],
  }));
}

function computeWeeks() {
  const aql = state.aq.trim().toLowerCase();
  const uploaded = storedWeeks().map((u) => ({
    week: u.week,
    date: u.date,
    // A demand upload feeds both Project & Demand portals, so list both links.
    reports:
      u.type === "demand" && u.data
        ? [
            { title: L().ministryTitle, href: uploadHref(u, m.MINISTRY_DEMAND_HREF), pdf: u.pdfData || "#" },
            { title: L().cssTitle, href: uploadHref(u, m.CSS_DEMAND_HREF), pdf: u.pdfData || "#" },
          ]
        : [{ title: u.title, href: uploadHref(u), pdf: u.pdfData || "#" }],
  }));
  return [...uploaded, ...m.archive]
    .filter((w) => !aql || (w.week + " " + w.date).toLowerCase().includes(aql))
    // Drop report links for hidden portals; drop a week left with no reports.
    .map((w) => ({ ...w, reports: w.reports.filter((r) => !isHiddenReport(r.href)) }))
    .filter((w) => w.reports.length > 0)
    .map((w) => ({
      ...w,
      week: trDate(w.week),
      date: trDate(w.date),
      reports: w.reports.map((r) => ({ ...r, title: tr(r.title) })),
    }));
}

function renderStatic() {
  const l = L();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = isAr() ? "rtl" : "ltr";
  document.title = l.siteTitle;
  $("headerMinistry").textContent = l.ministry;
  $("headerSiteTitle").textContent = l.siteTitle;
  $("adminLink").textContent = l.admin;
  $("langBtn").textContent = isAr() ? "English" : "العربية";
  $("h1a").textContent = l.h1a;
  $("h1b").textContent = l.h1b;
  $("taglineText").textContent = l.tagline;
  $("archiveTitle").textContent = l.archive;
  $("archiveInput").placeholder = l.archivePh;
  $("noWeeksNote").textContent = l.noWeeks;
  $("footerText").textContent = l.footer;
}

function renderReports() {
  $("reportsGrid").innerHTML = computePortals()
    .map(
      (r) => `<article class="report-card portal-card">
        <div class="report-card-head">
          <div class="report-card-titles">
            <span class="card-kicker">${esc(r.kicker)}</span>
            <h2>${esc(r.title)}</h2>
          </div>
        </div>
        <div class="card-meta"><span><strong>${esc(L().lastUpdated)}:</strong> ${esc(r.date)}</span></div>
        <div class="card-actions">
          ${r.href
            ? `<a class="btn-primary stretch-link" href="${esc(r.href)}">${esc(L().openReport)}${r.external ? ' <span class="external-mark" aria-hidden="true">↗</span>' : ""}</a>`
            : `<span class="btn-primary btn-disabled" aria-disabled="true">${esc(L().openReport)}</span>`}
        </div>
      </article>`
    )
    .join("");
}

function renderArchive() {
  const weeks = computeWeeks();
  $("noWeeksNote").hidden = weeks.length > 0;
  $("weeksList").innerHTML = weeks
    .map(
      (w) => `<div class="week-card">
        <div class="week-head">
          <span class="week-name">${esc(w.week)}</span>
          <span class="week-date">${esc(L().issued)} ${esc(w.date)}</span>
        </div>
        <div class="week-reports">
          ${w.reports
            .map(
              (r) => `<div class="week-report-row">
                <a class="report-link" href="${esc(r.href)}">${esc(r.title)}</a>
                ${r.pdf && r.pdf !== "#" ? `<a class="pdf-link" href="${esc(r.pdf)}" download>PDF ↓</a>` : ""}
              </div>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");
}

function render() {
  renderStatic();
  renderReports();
  renderArchive();
}

$("langBtn").addEventListener("click", () => {
  state.lang = isAr() ? "en" : "ar";
  localStorage.setItem("dtLang", state.lang);
  render();
});

$("archiveInput").addEventListener("input", (e) => {
  state.aq = e.target.value;
  renderArchive();
});

render();
