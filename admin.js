// Admin upload page — publish new weekly report versions into localStorage
// (dtWeeks), where the landing page, report portals and archives pick them up.

import { esc, applyTheme, getLang, setLang, translators } from "./common.js";

const I18N = {
  en: {
    kicker: "System Administration", back: "Home", title: "Upload Weekly Reports",
    formTitle: "New Weekly Report",
    formSub: "Publish a new weekly report version. It will appear in the homepage weekly archive.",
    fType: "Report type", other: "Other report",
    typeWgsSub: "Digital Transformation Strategy 2027",
    typeDemandSub: "Projects, releases & demands portfolio — feeds both P&D portals",
    typeOtherSub: "Any other report — enter its title",
    fCustom: "Report title", fCustomPh: "e.g. Cybersecurity Weekly Brief",
    fPdf: "Original PDF", submit: "Publish report",
    savedMsg: "Published — the report content is now live on the site.",
    note: "The PDF is read and converted automatically into site content: sections, projects and updates in the file appear in the interactive report pages and the weekly archive. Stored in this browser (localStorage); a real backend keeps the same structure.",
    phaseAI: "Analyzing the report and building site content…",
    working: "Publishing…",
    parsedOk: "Interactive content", parsedNo: "PDF only — needs processing",
    reprocessBtn: "Process content", reprocessing: "Processing…",
    warnParse: "Published to the archive, but automatic content extraction failed — the report opens as details only",
    noAI: "automatic extraction is unavailable in this deployment",
    listTitle: "Published uploads", empty: "No uploaded reports yet.",
    downloadPdfS: "PDF", delete: "Delete",
    footer: "Ministry of Cabinet Affairs · Digital Transformation Department · Confidential",
    errTitle: "Please enter the report title.",
    errBig: "File > 3MB — stored by name only in this prototype.",
  },
  ar: {
    kicker: "إدارة النظام", back: "الرئيسية", title: "رفع التقارير الأسبوعية",
    formTitle: "تقرير أسبوعي جديد",
    formSub: "انشر نسخة جديدة من التقرير الأسبوعي. ستظهر في الأرشيف الأسبوعي بالصفحة الرئيسية.",
    fType: "نوع التقرير", other: "تقرير آخر",
    typeWgsSub: "استراتيجية التحول الرقمي 2027",
    typeDemandSub: "محفظة المشاريع والإصدارات والطلبات — يغذي بوابتي المشاريع والطلبات",
    typeOtherSub: "أي تقرير آخر — أدخل عنوانه",
    fCustom: "عنوان التقرير", fCustomPh: "مثال: الموجز الأسبوعي للأمن السيبراني",
    fPdf: "ملف PDF الأصلي", submit: "نشر التقرير",
    savedMsg: "تم النشر — محتوى التقرير أصبح ظاهرًا في الموقع.",
    note: "يُقرأ ملف PDF ويُحوَّل تلقائيًا إلى محتوى في الموقع: الأقسام والمشاريع والتحديثات في الملف تظهر في صفحات التقارير التفاعلية وفي الأرشيف الأسبوعي. يُحفظ في هذا المتصفح (localStorage) وعند الربط بخادم فعلي تبقى البنية نفسها.",
    phaseAI: "جارٍ تحليل التقرير وبناء محتوى الموقع…",
    working: "جارٍ النشر…",
    parsedOk: "محتوى تفاعلي", parsedNo: "PDF فقط — يحتاج معالجة",
    reprocessBtn: "معالجة المحتوى", reprocessing: "جارٍ المعالجة…",
    warnParse: "نُشر في الأرشيف، لكن تعذّر استخراج المحتوى تلقائيًا — سيُفتح التقرير كتفاصيل فقط",
    noAI: "الاستخراج التلقائي غير متاح في هذه النسخة المنشورة",
    listTitle: "التقارير المنشورة", empty: "لا توجد تقارير مرفوعة بعد.",
    downloadPdfS: "PDF", delete: "حذف",
    footer: "وزارة شؤون مجلس الوزراء · إدارة التحول الرقمي · سرّي",
    errTitle: "يرجى إدخال عنوان التقرير.",
    errBig: "الملف أكبر من 3MB — يُحفظ بالاسم فقط في هذا النموذج.",
  },
};

const SCHEMA_DEMAND = `Convert the report text into JSON. Include a top-level key "reportDate" holding the report date exactly as written in the document (e.g. "17 July 2026"). Use EXACTLY this shape (statuses must be one of: Live, Closed, In Progress, Pending, Planned, On Hold, Not Started, TBC):
{"stats":[{"n":"113","label":"Total items","sub":"All projects, releases & demands"},{"n":"..","label":"Projects & enhancements","sub":".."},{"n":"..","label":"Demands","sub":".."},{"n":"..","label":"Live","sub":".."}],
"entities":[{"name":"CSS","n":68}],
"sections":[{"id":"projects","num":"01","title":"Projects","groups":[{"label":"<owner name or release name or empty string>","items":[{"name":"..","entity":"..","status":"..","updates":["bullet",".."],"next":["bullet"],"goLive":"22 July"}]}]}]}
Rules: sections use ids projects/mocasmart/demands/future matching the source sections in order; every project row becomes an item; keep ALL rows; updates/next are arrays of bullet strings ([] if em-dash/empty); goLive "Live" for live items, "TBD" if unknown; derive status: empty updates + Live go-live => "Live"; "Closed" rows => "Closed"; "On Hold" => "On Hold"; "Not yet started" => "Not Started"; awaiting/pending direction => "Pending"; otherwise "In Progress".`;

const SCHEMA_WGS = `Convert the report text into JSON with EXACTLY this shape (all keys required; use [] or "" when absent). "reportDate" is the report date exactly as written in the document (e.g. "17 July 2026"):
{"reportDate":"..","subtitle":"..","weekOf":"Week of ..","glance":{"stats":[{"n":"7","label":"Sessions Held"}],"covers":["section name",".."]},
"meetings":[{"num":"01","group":"..","title":"..","badge":"Complete","attendees":"..","outcomes":[".."]}],
"workstream":{"title":"..","subtitle":"..","timeline":[{"step":1,"phase":"..","status":"In Progress"}],"currentStatus":[".."],"openDecisions":[".."],"nextSteps":[".."]},
"salesforce":{"context":"..","blocks":[{"title":"..","body":".."}],"shared":"..","decisions":".."},
"decisions":[{"item":"..","detail":"..","status":"In Progress"}],
"risks":[{"level":"MED","risk":"..","mitigation":".."}],
"actions":[{"action":"..","owner":"..","target":"..","status":"Pending"}]}`;

const state = {
  lang: getLang(),
  fType: "WGS Weekly Status Report",
  fCustom: "",
  fileName: "",
  fileData: "",
  errorMsg: "",
  saved: false,
  busy: false,
  busyId: null,
  phase: "",
  uploads: readUploads(),
};

applyTheme();

function readUploads() {
  try {
    return JSON.parse(localStorage.getItem("dtWeeks") || "[]");
  } catch {
    return [];
  }
}

function persist(uploads) {
  localStorage.setItem("dtWeeks", JSON.stringify(uploads));
  state.uploads = uploads;
}

const L = () => I18N[state.lang];

// Extract structured site content from the uploaded PDF. Requires the Claude
// runtime (window.claude.complete); when unavailable, the report is still
// published with its PDF and can be processed later.
async function extract(type, pdfData) {
  if (!(window.claude && typeof window.claude.complete === "function")) {
    throw new Error(L().noAI);
  }
  const { PDFParse } = await import("https://cdn.jsdelivr.net/npm/pdf-parse@2.4.5/dist/pdf-parse/web/pdf-parse.es.js");
  PDFParse.setWorker("https://cdn.jsdelivr.net/npm/pdf-parse@2.4.5/dist/pdf-parse/web/pdf.worker.min.mjs");
  const buf = await (await fetch(pdfData)).arrayBuffer();
  const parser = new PDFParse({ data: new Uint8Array(buf) });
  const txt = (await parser.getText()).text;
  const schema = type === "demand" ? SCHEMA_DEMAND : SCHEMA_WGS;
  const out = await window.claude.complete({
    model: "claude-haiku-4-5",
    max_tokens: 30000,
    system: "You convert weekly status report text extracted from a PDF into strict JSON. Output ONLY valid JSON — no markdown fences, no commentary. Preserve section names, project names, terminology and data exactly as written in the source. Never invent content.",
    messages: [{ role: "user", content: schema + "\n\n---- REPORT TEXT ----\n" + txt }],
  });
  return JSON.parse(out.trim().replace(/^```(json)?\s*/i, "").replace(/```\s*$/, ""));
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function weekAndDate(raw) {
  let dt = null;
  const mm = String(raw || "").match(/(\d{1,2})\s*(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
  if (mm) {
    const mi = MONTHS.findIndex((x) => x.toLowerCase().startsWith(mm[2].toLowerCase().slice(0, 3)));
    if (mi >= 0) dt = new Date(+mm[3], mi, +mm[1]);
  }
  if (!dt || isNaN(dt)) dt = new Date();
  const monday = new Date(dt);
  monday.setDate(dt.getDate() - ((dt.getDay() + 6) % 7));
  return {
    week: "Week of " + monday.getDate() + " " + MONTHS[monday.getMonth()] + " " + monday.getFullYear(),
    date: dt.getDate() + " " + MONTHS[dt.getMonth()] + " " + dt.getFullYear(),
  };
}

async function submit() {
  if (state.busy) return;
  const l = L();
  const title = state.fType === "Other" ? state.fCustom.trim() : state.fType;
  if (!title) {
    state.errorMsg = l.errTitle;
    build();
    return;
  }
  const type = state.fType === "WGS Weekly Status Report" ? "wgs" : state.fType === "Other" ? "other" : "demand";
  let data = null;
  let warn = "";
  if (state.fileData && type !== "other") {
    try {
      state.busy = true;
      state.phase = l.phaseAI;
      state.errorMsg = "";
      state.saved = false;
      build();
      data = await extract(type, state.fileData);
    } catch (err) {
      data = null;
      warn = l.warnParse + " (" + ((err && err.message) || err) + ")";
    }
  }
  const { week, date } = weekAndDate(data && data.reportDate);
  const item = {
    id: Date.now(), type, title, week, date,
    status: "In Progress", summary: "",
    pdfName: state.fileName, pdfData: state.fileData, data,
  };
  persist([item, ...state.uploads]);
  Object.assign(state, { busy: false, phase: "", saved: true, errorMsg: warn, fCustom: "", fileName: "", fileData: "" });
  build();
}

async function reprocess(id) {
  if (state.busy) return;
  const u = state.uploads.find((x) => x.id === id);
  if (!u || !u.pdfData) return;
  const l = L();
  Object.assign(state, { busy: true, busyId: id, phase: l.phaseAI, errorMsg: "", saved: false });
  build();
  try {
    const data = await extract(u.type, u.pdfData);
    persist(state.uploads.map((x) => (x.id === id ? { ...x, data } : x)));
    Object.assign(state, { busy: false, busyId: null, phase: "", saved: true });
  } catch (err) {
    Object.assign(state, { busy: false, busyId: null, phase: "", errorMsg: l.warnParse + " (" + ((err && err.message) || err) + ")" });
  }
  build();
}

function typeButtonsHTML() {
  const l = L();
  const opts = [
    { v: "WGS Weekly Status Report", label: "WGS Weekly Status Report", sub: l.typeWgsSub },
    { v: "Project & Demand Status Report", label: "Project & Demand Status Report", sub: l.typeDemandSub },
    { v: "Other", label: l.other, sub: l.typeOtherSub },
  ];
  return opts
    .map((t) => {
      const active = state.fType === t.v;
      return `<button type="button" class="type-btn${active ? " active" : ""}" data-type="${esc(t.v)}" aria-pressed="${active}">
        <span class="t-label"><span class="t-dot" aria-hidden="true"></span>${esc(t.label)}</span>
        <span class="t-sub">${esc(t.sub)}</span>
      </button>`;
    })
    .join("");
}

function uploadsHTML() {
  const l = L();
  const { tr, trD, trS } = translators(state.lang);
  if (!state.uploads.length) return `<span class="empty-msg">${esc(l.empty)}</span>`;
  return state.uploads
    .map((u) => {
      const parsed = !!u.data;
      const canReprocess = !!u.pdfData && u.type !== "other" && !state.busy;
      const reprocessing = state.busyId === u.id;
      return `<article class="upload-card">
        <div class="upload-head">
          <div style="display:flex;flex-direction:column;gap:3px">
            <span class="upload-name">${esc(tr(u.title))}</span>
            <span class="upload-meta">${esc(trD(u.week))} · ${esc(trD(u.date))}</span>
          </div>
          <span class="state-chip ${parsed ? "ok" : "pdf"}">${esc(parsed ? l.parsedOk : l.parsedNo)}</span>
        </div>
        ${u.summary ? `<span class="upload-meta" style="line-height:1.6">${esc(tr(u.summary))}</span>` : ""}
        <div class="upload-actions">
          ${u.pdfData ? `<a href="${esc(u.pdfData)}" download="${esc(u.pdfName || "report.pdf")}" style="font-size:13px;font-weight:600">${esc(l.downloadPdfS)} ↓</a>` : ""}
          ${reprocessing ? `<span style="font-size:13px;font-weight:700;color:var(--acc)">${esc(l.reprocessing)}</span>` : ""}
          ${canReprocess ? `<button type="button" class="reprocess-btn" data-id="${u.id}">${esc(l.reprocessBtn)}</button>` : ""}
          <button type="button" class="delete-btn" data-id="${u.id}">${esc(l.delete)}</button>
        </div>
      </article>`;
    })
    .join("");
}

function build() {
  const l = L();
  const { dir, langLabel, backArrow } = translators(state.lang);
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dir;
  document.title = l.title;

  document.getElementById("app").innerHTML = `
  <header class="report-header">
    <div class="header-inner">
      <a href="index.html" aria-label="Back to home" class="back-btn"><span class="back-arrow" aria-hidden="true">${backArrow}</span><span>${esc(l.back)}</span></a>
      <div class="header-titles">
        <span class="header-kicker">${esc(l.kicker)}</span>
        <span class="header-name">${esc(l.title)}</span>
      </div>
      <button type="button" id="langBtn" class="lang-btn" aria-label="Switch language">${esc(langLabel)}</button>
    </div>
  </header>

  <main class="report-main" style="gap:28px;padding-top:32px">
    <section class="form-card" aria-label="Upload form">
      <div style="display:flex;flex-direction:column;gap:4px">
        <h1>${esc(l.formTitle)}</h1>
        <span class="form-sub">${esc(l.formSub)}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span class="field-label">${esc(l.fType)}</span>
        <div class="type-grid" id="typeGrid">${typeButtonsHTML()}</div>
      </div>
      <label class="field" id="customField" ${state.fType === "Other" ? "" : "hidden"}>
        <span class="field-label">${esc(l.fCustom)}</span>
        <input type="text" id="customTitle" placeholder="${esc(l.fCustomPh)}" value="${esc(state.fCustom)}">
      </label>
      <label class="field">
        <span class="field-label">${esc(l.fPdf)}</span>
        <input type="file" id="pdfFile" accept="application/pdf">
        <span class="file-ok" id="fileNote" ${state.fileName ? "" : "hidden"}>✓ ${esc(state.fileName)}</span>
      </label>
      <span class="err-box" id="errBox" ${state.errorMsg ? "" : "hidden"}>${esc(state.errorMsg)}</span>
      <div class="submit-row">
        <button type="button" id="submitBtn" class="submit-btn">${esc(state.busy ? l.working : l.submit)}</button>
        ${state.busy ? `<span class="phase-msg">${esc(state.phase)}</span>` : ""}
        ${state.saved ? `<span class="saved-msg">${esc(l.savedMsg)}</span>` : ""}
      </div>
      <span class="note">${esc(l.note)}</span>
    </section>

    <section aria-label="Uploaded reports" style="display:flex;flex-direction:column;gap:0">
      <h2 class="uploads-title">${esc(l.listTitle)} (${state.uploads.length})</h2>
      <div id="uploadsList">${uploadsHTML()}</div>
    </section>
  </main>

  <footer class="site-footer">${esc(l.footer)}</footer>`;

  // ---- Events ----
  document.getElementById("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    setLang(state.lang);
    build();
  });
  document.getElementById("typeGrid").addEventListener("click", (e) => {
    const btn = e.target.closest(".type-btn");
    if (!btn) return;
    state.fType = btn.dataset.type;
    state.saved = false;
    build();
  });
  document.getElementById("customTitle").addEventListener("input", (e) => {
    state.fCustom = e.target.value;
    state.saved = false;
  });
  document.getElementById("pdfFile").addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const note = document.getElementById("fileNote");
    const errBox = document.getElementById("errBox");
    if (f.size > 3 * 1024 * 1024) {
      Object.assign(state, { fileName: f.name, fileData: "", errorMsg: L().errBig });
      note.hidden = false;
      note.textContent = "✓ " + f.name;
      errBox.hidden = false;
      errBox.textContent = state.errorMsg;
      return;
    }
    const r = new FileReader();
    r.onload = () => {
      Object.assign(state, { fileName: f.name, fileData: r.result, errorMsg: "" });
      note.hidden = false;
      note.textContent = "✓ " + f.name;
      errBox.hidden = true;
    };
    r.readAsDataURL(f);
  });
  document.getElementById("submitBtn").addEventListener("click", submit);
  document.getElementById("uploadsList").addEventListener("click", (e) => {
    const rep = e.target.closest(".reprocess-btn");
    if (rep) { reprocess(+rep.dataset.id); return; }
    const del = e.target.closest(".delete-btn");
    if (del) {
      persist(state.uploads.filter((x) => x.id !== +del.dataset.id));
      state.saved = false;
      build();
    }
  });
}

build();
