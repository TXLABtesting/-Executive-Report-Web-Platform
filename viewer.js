// Report viewer — details page for uploaded reports without interactive content.
import { esc, applyTheme, getLang, setLang, translators, storedWeeks } from "./common.js";

const I18N = {
  en: {
    kicker: "Uploaded Weekly Report", back: "Home", lastUpdated: "Reporting date", download: "Download PDF",
    noPdf: "No PDF file was attached to this report. The admin can re-upload it with the file from the Admin page.",
    notFound: "Report not found — it may have been deleted from this browser.", backHome: "Back to home",
    footer: "Ministry of Cabinet Affairs · Digital Transformation Department · Confidential",
  },
  ar: {
    kicker: "تقرير أسبوعي مرفوع", back: "الرئيسية", lastUpdated: "تاريخ التقرير", download: "تحميل PDF",
    noPdf: "لم يُرفق ملف PDF مع هذا التقرير. يمكن للمدير إعادة رفعه مع الملف من صفحة الإدارة.",
    notFound: "التقرير غير موجود — ربما حُذف من هذا المتصفح.", backHome: "العودة للرئيسية",
    footer: "وزارة شؤون مجلس الوزراء · إدارة التحول الرقمي · سرّي",
  },
};

const state = { lang: getLang() };

applyTheme();

function build() {
  const l = I18N[state.lang];
  const { tr, trD, trS, dir, langLabel, backArrow } = translators(state.lang);
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dir;

  const id = new URLSearchParams(location.search).get("id");
  const u = storedWeeks().find((x) => String(x.id) === String(id));
  const title = u ? tr(u.title) : "…";
  document.title = title;

  const body = u
    ? `<section class="viewer-card" aria-label="Report details">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="display:flex;flex-direction:column;gap:5px">
            <h1>${esc(title)}</h1>
            <span class="viewer-meta">${esc(trD(u.week))} · <strong>${esc(l.lastUpdated)}: ${esc(trD(u.date))}</strong></span>
          </div>
          <span class="viewer-status">${esc(trS(u.status))}</span>
        </div>
        ${u.summary ? `<p class="viewer-summary">${esc(tr(u.summary))}</p>` : ""}
        ${u.pdfData ? `<div><a class="btn-primary" style="display:inline-block" href="${esc(u.pdfData)}" download="${esc(u.pdfName || "report.pdf")}">${esc(l.download)}</a></div>` : ""}
      </section>
      ${!u.pdfData ? `<section class="no-pdf-card">${esc(l.noPdf)}</section>` : ""}`
    : `<section class="not-found-card">
        <span style="font-size:15px;font-weight:600;color:var(--ink)">${esc(l.notFound)}</span>
        <a href="index.html" style="font-size:14px;font-weight:700">${esc(l.backHome)}</a>
      </section>`;

  document.getElementById("app").innerHTML = `
  <header class="report-header">
    <div class="header-inner">
      <a href="index.html" aria-label="Back to home" class="back-btn"><span class="back-arrow" aria-hidden="true">${backArrow}</span><span>${esc(l.back)}</span></a>
      <div class="header-titles">
        <span class="header-kicker">${esc(l.kicker)}</span>
        <span class="header-name">${esc(title)}</span>
      </div>
      <button type="button" id="langBtn" class="lang-btn" aria-label="Switch language">${esc(langLabel)}</button>
    </div>
  </header>
  <main class="report-main" style="padding:28px 20px 60px;gap:20px;flex:1">${body}</main>
  <footer class="site-footer">${esc(l.footer)}</footer>`;

  document.getElementById("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    setLang(state.lang);
    build();
  });
}

build();
