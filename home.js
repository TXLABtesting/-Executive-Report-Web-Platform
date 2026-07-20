// Home page — weekly status report hub.
// Renders the report cards, global search and weekly archive from reports-data.js,
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
    wgsDesc: "Weekly WGS Digital Transformation 2027 status — meetings, workstreams, Salesforce integration, decisions, risks and actions.",
    ministryDesc: "Projects and demands for PMO, MOCA, WGS, GSOC, FCSC and the other ministry entities and sectors — with independent search, filters and statistics.",
    cssDesc: "All projects, MOCASmart releases and demands owned by the CSS sector, with totals computed automatically from the source data.",
    tecDesc: "Latest Total Experience Center status update, opening directly on the MOCASmart section of the chief report.",
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
    wgsDesc: "الحالة الأسبوعية للتحول الرقمي WGS 2027 — الاجتماعات ومسارات العمل وتكامل Salesforce والقرارات والمخاطر والإجراءات.",
    ministryDesc: "المشاريع والطلبات لجهات وقطاعات الوزارة: PMO وMOCA وWGS وGSOC وFCSC وغيرها — مع بحث وفلاتر وإحصاءات مستقلة.",
    cssDesc: "جميع المشاريع وإصدارات MOCASmart والطلبات التابعة لقطاع CSS، مع إجماليات تُحتسب تلقائيًا من البيانات المصدر.",
    tecDesc: "أحدث تحديث لحالة مركز التجربة الشاملة، يُفتح مباشرة على قسم MOCASmart في التقرير الرئيسي.",
    archive: "الأرشيف الأسبوعي",
    archivePh: "تصفية حسب الأسبوع أو التاريخ…",
    issued: "صدر في",
    admin: "إدارة النظام",
    noWeeks: "لا توجد أسابيع مؤرشفة مطابقة.",
    footer: "وزارة شؤون مجلس الوزراء · إدارة التحول الرقمي · سرّي",
  },
};

const state = {
  lang: localStorage.getItem("dtLang") || "en",
  q: "",
  aq: "",
};

const searchIndex = m.buildSearchIndex();

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
  const latest = (type) => stored.find((x) => x.type === type);
  const lw = latest("wgs");
  const ld = latest("demand");
  const pdHref = (page) => (ld && ld.data ? page + "?week=" + ld.id : page);

  const portals = [
    {
      title: tr(m.wgsReport.title),
      kicker: tr(m.wgsReport.programme),
      date: trDate(lw ? lw.date : m.wgsReport.date),
      overallStatus: lw ? lw.status : m.wgsReport.overallStatus,
      desc: l.wgsDesc,
      href: lw ? uploadHref(lw) : m.wgsReport.href,
    },
    {
      title: l.ministryTitle,
      kicker: tr(m.site.dept),
      date: trDate(ld ? ld.date : m.demandReport.date),
      overallStatus: ld ? ld.status : m.demandReport.overallStatus,
      desc: l.ministryDesc,
      href: pdHref(m.MINISTRY_DEMAND_HREF),
    },
    {
      title: l.cssTitle,
      kicker: tr(m.site.dept),
      date: trDate(ld ? ld.date : m.demandReport.date),
      overallStatus: ld ? ld.status : m.demandReport.overallStatus,
      desc: l.cssDesc,
      href: pdHref(m.CSS_DEMAND_HREF),
    },
    {
      // External portal: opens the chief report directly on its MOCASmart section,
      // in the same tab, with the #sec-mocasmart anchor preserved.
      title: l.tecTitle,
      kicker: tr(m.site.dept),
      date: trDate(m.site.lastUpdated),
      overallStatus: "Live",
      desc: l.tecDesc,
      href: "https://chief-report.onrender.com/#sec-mocasmart",
      external: true,
    },
  ];

  const others = stored
    .filter((x) => x.type === "other")
    .map((u) => ({ title: tr(u.title), kicker: tr(m.site.dept), date: trDate(u.date), overallStatus: u.status, desc: tr(u.summary || ""), href: uploadHref(u) }));

  return [...portals, ...others].map((r) => ({
    ...r,
    status: trStatus(r.overallStatus),
    badge: m.statusColors[r.overallStatus] || m.statusColors["TBC"],
  }));
}

function computeResults() {
  const query = state.q.trim().toLowerCase();
  if (query.length < 2) return null;
  return searchIndex
    .filter((e) => (e.title + " " + e.text + " " + e.type + " " + e.meta).toLowerCase().includes(query))
    .slice(0, 30)
    .map((e) => ({ ...e, type: trType(e.type), title: tr(e.title) }));
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
  $("lastUpdatedLabel").textContent = l.lastUpdated;
  $("lastUpdatedVal").textContent = trDate(m.site.lastUpdated);
  $("searchInput").placeholder = l.searchPh;
  $("archiveTitle").textContent = l.archive;
  $("archiveInput").placeholder = l.archivePh;
  $("noWeeksNote").textContent = l.noWeeks;
  $("footerText").textContent = l.footer;
}

function renderSearch() {
  const results = computeResults();
  const box = $("searchResults");
  const hasQ = results !== null;
  $("clearBtn").hidden = !hasQ;
  box.hidden = !hasQ;
  if (!hasQ) {
    box.innerHTML = "";
    return;
  }
  const rows = results
    .map(
      (r) => `<a class="result-card" href="${esc(r.href)}">
        <span class="result-head">
          <span class="result-type">${esc(r.type)}</span>
          <span class="result-title">${esc(r.title)}</span>
        </span>
        <span class="result-meta">${esc(r.meta)}</span>
      </a>`
    )
    .join("");
  const empty = results.length === 0 ? `<span class="empty-note">${esc(L().noResults)}</span>` : "";
  box.innerHTML = `<span class="result-count">${results.length} ${esc(L().results)}</span>${rows}${empty}`;
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
          <span class="status-badge" style="background:${esc(r.badge.bg)};color:${esc(r.badge.fg)}"><span class="status-dot" style="background:${esc(r.badge.dot)}"></span>${esc(r.status)}</span>
        </div>
        <p class="portal-desc">${esc(r.desc)}</p>
        <div class="card-meta"><span><strong>${esc(L().lastUpdated)}:</strong> ${esc(r.date)}</span></div>
        <div class="card-actions">
          <a class="btn-primary stretch-link" href="${esc(r.href)}">${esc(L().openReport)}${r.external ? ' <span class="external-mark" aria-hidden="true">↗</span>' : ""}</a>
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
                <a class="pdf-link" href="${esc(r.pdf)}" download>PDF ↓</a>
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
  renderSearch();
  renderReports();
  renderArchive();
}

$("langBtn").addEventListener("click", () => {
  state.lang = isAr() ? "en" : "ar";
  localStorage.setItem("dtLang", state.lang);
  render();
});

$("searchInput").addEventListener("input", (e) => {
  state.q = e.target.value;
  renderSearch();
});

$("clearBtn").addEventListener("click", () => {
  state.q = "";
  $("searchInput").value = "";
  renderSearch();
  $("searchInput").focus();
});

$("archiveInput").addEventListener("input", (e) => {
  state.aq = e.target.value;
  renderArchive();
});

render();
