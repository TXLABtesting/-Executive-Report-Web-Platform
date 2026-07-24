// Project & Demand portal — shared logic for the Ministry and CSS variants.
// The variant is set via <body data-variant="ministry|css">. All totals, stats
// and entity distributions are computed from the source data at render time.

import * as m from "./reports-data.js";
import { esc, applyTheme, getLang, setLang, translators, badge, storedWeeks, initScrollSpy } from "./common.js";

const VARIANT = document.body.dataset.variant === "css" ? "css" : "ministry";
const SELF = VARIANT === "css" ? m.CSS_DEMAND_HREF : m.MINISTRY_DEMAND_HREF;
const TITLE = VARIANT === "css" ? "CSS Project & Demand" : "Ministry Project & Demand";

const I18N = {
  en: {
    flaggedT: "Flagged for review — unrecognized Entity / Sector", flaggedEntity: "Entity",
    flaggedNote: "These items are not assigned automatically to any portal until their Entity / Sector value is confirmed.",
    navAttention: "Attention", navOverview: "Overview", lastUpdated: "Last updated", back: "Home",
    downloadPdf: "Download original PDF", attentionTitle: "Requires Management Attention",
    nearTermT: "Near-Term Go-Lives — Jun / Jul / Aug", onHoldT: "On Hold", awaitingT: "Awaiting Direction / Approval",
    pastDate: "PAST DATE", overviewT: "Overview — Portfolio Summary", byEntity: "Items by Entity / Sector",
    searchPh: "Search projects, updates, next steps…", filtersBtn: "Filters", allSections: "All sections",
    allEntities: "All entities", allStatuses: "All statuses", allOwners: "All owners / releases",
    showing: "Showing", of: "of", reset: "Reset filters", section: "Section", items: "items",
    updatesT: "Status & Updates", nextT: "Next Steps", outcomeT: "Project Outcome", goLive: "Go-live",
    noUpdates: "No updates recorded this week.", noMatch: "No items in this section match the current filters.",
    completed: "Completed", inProgress: "In Progress",
    shareCard: "Share card", sharing: "Preparing image…", shareFail: "Sharing not supported here — image downloaded instead.", shareErr: "Could not create the image.",
  },
  ar: {
    flaggedT: "بحاجة إلى مراجعة — جهة / قطاع غير معرّف", flaggedEntity: "الجهة",
    flaggedNote: "لا تُسنَد هذه العناصر تلقائيًا إلى أي بوابة حتى يتم تأكيد قيمة الجهة / القطاع الخاصة بها.",
    navAttention: "انتباه", navOverview: "نظرة عامة", lastUpdated: "آخر تحديث", back: "الرئيسية",
    downloadPdf: "تحميل ملف PDF الأصلي", attentionTitle: "يتطلب اهتمام الإدارة",
    nearTermT: "إطلاقات قريبة — يونيو / يوليو / أغسطس", onHoldT: "معلّق", awaitingT: "بانتظار التوجيه / الاعتماد",
    pastDate: "متأخر", overviewT: "نظرة عامة — ملخص المحفظة", byEntity: "العناصر حسب الجهة / القطاع",
    searchPh: "ابحث في المشاريع والمستجدات والخطوات التالية…", filtersBtn: "الفلاتر", allSections: "كل الأقسام",
    allEntities: "كل الجهات", allStatuses: "كل الحالات", allOwners: "كل المسؤولين / الإصدارات",
    showing: "عرض", of: "من", reset: "إعادة تعيين", section: "قسم", items: "عنصر",
    updatesT: "الحالة والمستجدات", nextT: "الخطوات التالية", outcomeT: "مُخرَج المشروع", goLive: "الإطلاق",
    noUpdates: "لا توجد مستجدات مسجلة هذا الأسبوع.", noMatch: "لا توجد عناصر في هذا القسم مطابقة للتصفية الحالية.",
    completed: "مكتمل", inProgress: "قيد التنفيذ",
    shareCard: "مشاركة البطاقة", sharing: "جارٍ تجهيز الصورة…", shareFail: "المشاركة غير مدعومة هنا — تم تنزيل الصورة بدلًا من ذلك.", shareErr: "تعذّر إنشاء الصورة.",
  },
};

const state = {
  lang: getLang(),
  q: "",
  fSection: "All",
  fEntity: "All",
  fStatus: "All",
  fOwner: "All",
  showFilters: false,
  open: {}, // item key -> false when collapsed; items start expanded
};

// item key -> { item, owner } for the rendered cards, so the share button can
// redraw a card as an image on demand. Rebuilt on every renderSections().
let itemsByKey = {};

applyTheme();

// ---- Resolve the source report (base data or an uploaded week override) ----
const weekId = new URLSearchParams(location.search).get("week");
let R = m.demandReport;
if (weekId) {
  const w = storedWeeks("demand").find((x) => String(x.id) === weekId && x.data);
  if (w) {
    const d = w.data || {};
    const secs = (d.sections || []).map((x) => ({
      id: x.id || "", num: x.num || "", title: x.title || "",
      groups: (x.groups || []).map((g) => ({
        label: g.label || "",
        items: (g.items || []).map((it) => ({
          name: it.name || "", entity: it.entity || "—", status: it.status || "TBC",
          updates: it.updates || [], next: it.next || [], goLive: it.goLive || "TBD",
          outcome: it.outcome || "",
        })),
      })),
    }));
    R = {
      ...R,
      sections: secs.length ? secs : R.sections,
      subtitle: "Weekly Update · " + w.date,
      date: w.date,
      pdf: w.pdfData || R.pdf,
    };
  } else {
    // Not an uploaded week — resolve a built-in historical snapshot so archived
    // weeks stay viewable after the live report is updated.
    const hist = m.findDemandReport(weekId);
    if (hist) R = hist;
  }
}

// ---- Apply the report-mapping rules: one portal view + flagged items ----
const { sections: SECTIONS, flagged: FLAGGED } = m.splitDemand(R, VARIANT);
const ALL = m.flattenDemand(SECTIONS);

const L = () => I18N[state.lang];
const t = () => translators(state.lang);

// Go-live label: "Live" → localized status; a value carrying explanatory text
// (e.g. "TBD — pending …") is looked up in the AR map; a plain date runs
// through the Arabic date converter.
function goLiveText(goLive, tr, trS, trD) {
  if (goLive === "Live") return trS("Live");
  const mapped = tr(goLive);
  return mapped !== goLive ? mapped : trD(goLive);
}

const matchItem = (it) => {
  const query = state.q.trim().toLowerCase();
  return (
    (state.fSection === "All" || it.secId === state.fSection) &&
    (state.fEntity === "All" || it.entity === state.fEntity) &&
    (state.fStatus === "All" || it.status === state.fStatus) &&
    (state.fOwner === "All" || it.owner === state.fOwner) &&
    (!query ||
      (it.name + " " + it.entity + " " + it.owner + " " + it.goLive + " " + it.status + " " +
        it.updates.join(" ") + " " + it.next.join(" ") + " " + (it.outcome || "")).toLowerCase().includes(query))
  );
};

const filtersActive = () =>
  !!(state.q.trim() || state.fSection !== "All" || state.fEntity !== "All" || state.fStatus !== "All" || state.fOwner !== "All");

function itemCardHTML(it, key) {
  const { tr, trS, trD } = t();
  const b = badge(it.status);
  const open = state.open[key] !== false;
  const goLiveLabel = goLiveText(it.goLive, tr, trS, trD);
  const updates = it.updates.map((u) => `<div class="detail-line"><span class="b">·</span><span>${esc(tr(u))}</span></div>`).join("");
  const next = it.next.map((u) => `<div class="detail-line"><span class="b next">→</span><span>${esc(tr(u))}</span></div>`).join("");
  const outcome = it.outcome
    ? `<div class="detail-block outcome-block"${it.updates.length || it.next.length ? ' style="padding-top:0"' : ""}><span class="detail-label outcome">${esc(L().outcomeT)}</span><div class="detail-line"><span class="b outcome" aria-hidden="true">◇</span><span>${esc(tr(it.outcome))}</span></div></div>`
    : "";
  const detail =
    (it.updates.length ? `<div class="detail-block"><span class="detail-label">${esc(L().updatesT)}</span>${updates}</div>` : "") +
    (it.next.length ? `<div class="detail-block"${it.updates.length ? ' style="padding-top:0"' : ""}><span class="detail-label next">${esc(L().nextT)}</span>${next}</div>` : "") +
    outcome +
    (!it.updates.length && !it.next.length && !it.outcome ? `<span class="no-updates">${esc(L().noUpdates)}</span>` : "");
  return `<article class="item-card${open ? " open" : ""}" data-key="${esc(key)}">
    <button type="button" class="item-head" aria-expanded="${open}">
      <div class="item-title-row"><span class="item-name">${esc(tr(it.name))}</span><span class="chev-i" aria-hidden="true">▾</span></div>
      <div class="item-chips">
        <span class="badge-sm" style="background:${esc(b.bg)};color:${esc(b.fg)}"><span class="dot" style="background:${esc(b.dot)}"></span>${esc(trS(it.status))}</span>
        <span class="entity-chip">${esc(it.entity)}</span>
        <span class="golive-chip">${esc(L().goLive)}: ${esc(goLiveLabel)}</span>
      </div>
    </button>
    <div class="item-detail">${detail}<div class="item-actions no-print"><button type="button" class="share-btn" data-share="${esc(key)}"><span class="share-ic" aria-hidden="true">⤴</span>${esc(L().shareCard)}</button></div></div>
  </article>`;
}

function sectionsHTML() {
  const { tr, isAr } = t();
  let shown = 0;
  let ki = 0;
  itemsByKey = {};
  const html = SECTIONS.map((sec) => {
    let count = 0;
    const groups = sec.groups
      .map((g) => {
        const cards = g.items
          .map((it) => {
            const key = sec.id + "-" + ki++;
            if (!matchItem({ ...it, secId: sec.id, owner: g.label })) return null;
            count++; shown++;
            itemsByKey[key] = { item: it, owner: g.label, secTitle: sec.title };
            return itemCardHTML(it, key);
          })
          .filter(Boolean);
        if (!cards.length) return "";
        const allDone = g.items.length > 0 && g.items.every((it) => ["Live", "Complete", "Closed"].includes(it.status));
        const groupChip = `<span class="group-chip ${allDone ? "done" : "wip"}"><span aria-hidden="true">${allDone ? "✓" : "◔"}</span>${esc(allDone ? L().completed : L().inProgress)}</span>`;
        const head = g.label ? `<div class="owner-head"><span class="owner-chip">${esc(tr(g.label))}</span>${groupChip}</div>` : "";
        return `<div class="owner-group">${head}<div class="items-grid">${cards.join("")}</div></div>`;
      })
      .join("");
    return `<section id="${esc(sec.id)}" class="pd-section" aria-label="${esc(tr(sec.title))}">
      <div class="pd-section-head">
        <span class="pd-section-num">${esc(L().section)} ${esc(sec.num)}</span>
        <h2 class="section-title">${esc(tr(sec.title))}</h2>
        <span class="pd-section-count">${count} ${esc(L().items)}</span>
      </div>
      ${groups}
      ${count === 0 ? `<span class="no-match">${esc(L().noMatch)}</span>` : ""}
    </section>`;
  }).join("");
  return { html, shown };
}

function renderSections() {
  const { html, shown } = sectionsHTML();
  document.getElementById("pdSections").innerHTML = html;
  document.getElementById("shownCount").textContent = `${L().showing} ${shown} ${L().of} ${ALL.length}`;
  document.getElementById("resetBtn").hidden = !filtersActive();
}

// ---- Share a single project card as an image ----------------------------
// The card is redrawn onto a canvas (no external library) and shared via the
// Web Share API — which on mobile opens the native sheet (WhatsApp, social,
// etc.). Where file sharing is unavailable (most desktops) the PNG downloads.

let toastTimer = null;
function toast(msg) {
  let el = document.getElementById("pdToast");
  if (!el) {
    el = document.createElement("div");
    el.id = "pdToast";
    el.className = "pd-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

function wrapLines(ctx, text, maxW) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    const cand = line ? line + " " + w : w;
    if (line && ctx.measureText(cand).width > maxW) { lines.push(line); line = w; }
    else line = cand;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

async function renderCardImage(reg) {
  const it = reg.item;
  const { tr, trS, trD, isAr } = t();
  try { await document.fonts.ready; } catch {}

  const cs = getComputedStyle(document.documentElement);
  const cv = (n, fb) => (cs.getPropertyValue(n).trim() || fb);
  const INK = cv("--ink", "#22312E"), MUT = cv("--mut", "#75807B"), ACC = cv("--acc", "#2F6F62"),
        BD = cv("--bd", "#E6E0D4"), SF = cv("--sf", "#FFFFFF"), SF2 = cv("--sf2", "#F3EFE7");
  const NEXTC = "#2B6CB0", OUTC = "#7A5AA6";
  const b = badge(it.status);

  const W = 760, PAD = 44, CW = W - PAD * 2;
  const x0 = isAr ? W - PAD : PAD;
  const dispW = 480, dfont = '"Space Grotesk", system-ui, sans-serif', bfont = '"IBM Plex Sans", system-ui, sans-serif';
  const goLiveLabel = goLiveText(it.goLive, tr, trS, trD);

  const meas = document.createElement("canvas").getContext("2d");
  meas.direction = isAr ? "rtl" : "ltr";

  // paint(ctx, draw): walks the layout; returns the total height. Called once to
  // measure (draw=false) and once to render (draw=true) so heights stay in sync.
  function paint(ctx, draw) {
    let y = PAD + 10;
    ctx.textBaseline = "top";
    ctx.direction = isAr ? "rtl" : "ltr";
    ctx.textAlign = isAr ? "right" : "left";

    const block = (text, font, color, size, gap) => {
      y += gap || 0;
      ctx.font = font;
      const lh = Math.round(size * 1.42);
      for (const ln of wrapLines(ctx, text, CW)) {
        if (draw) { ctx.fillStyle = color; ctx.fillText(ln, x0, y); }
        y += lh;
      }
    };
    const bullets = (arr, marker, mcolor, color, italic, size, gap) => {
      y += gap || 0;
      const indent = 22, lh = Math.round(size * 1.5);
      const tx = isAr ? x0 - indent : x0 + indent;
      ctx.font = (italic ? "italic " : "") + "400 " + size + 'px ' + bfont;
      for (const raw of arr) {
        const lines = wrapLines(ctx, tr(raw), CW - indent);
        lines.forEach((ln, i) => {
          if (draw) {
            ctx.fillStyle = color; ctx.fillText(ln, tx, y);
            if (i === 0) { ctx.font = "700 " + size + 'px ' + bfont; ctx.fillStyle = mcolor; ctx.fillText(marker, x0, y); ctx.font = (italic ? "italic " : "") + "400 " + size + 'px ' + bfont; }
          }
          y += lh;
        });
      }
    };
    const label = (text, color) => block(text.toUpperCase(), "700 13px " + dfont, color, 13, 20);

    // Kicker + title
    block(tr(R.dept), "600 13px " + dfont, MUT, 13, 0);
    block(tr(it.name), "700 29px " + dfont, INK, 29, 8);

    // Chips: status, entity, go-live
    y += 18;
    const chips = [
      { t: trS(it.status), bg: b.bg, fg: b.fg, dot: b.dot },
      { t: it.entity, bg: SF2, fg: MUT, bd: BD },
      { t: L().goLive + ": " + goLiveLabel, bg: SF2, fg: ACC },
    ];
    const chipH = 30, chipPad = 13, chipGap = 8, chipFont = "700 13px " + bfont;
    ctx.font = chipFont;
    let cx = isAr ? x0 : x0;
    for (const c of chips) {
      const hasDot = !!c.dot;
      const tw = ctx.measureText(c.t).width;
      const w = tw + chipPad * 2 + (hasDot ? 14 : 0);
      const rx = isAr ? cx - w : cx;
      if (draw) {
        ctx.fillStyle = c.bg;
        ctx.beginPath(); ctx.roundRect(rx, y, w, chipH, 999); ctx.fill();
        if (c.bd) { ctx.strokeStyle = c.bd; ctx.lineWidth = 1; ctx.stroke(); }
        let tX = isAr ? rx + w - chipPad : rx + chipPad;
        if (hasDot) {
          const dotX = isAr ? tX - 4 : rx + chipPad + 4;
          ctx.fillStyle = c.dot; ctx.beginPath(); ctx.arc(dotX, y + chipH / 2, 4, 0, Math.PI * 2); ctx.fill();
          tX = isAr ? tX - 14 : rx + chipPad + 14;
        }
        ctx.fillStyle = c.fg; ctx.textAlign = isAr ? "right" : "left"; ctx.textBaseline = "middle";
        ctx.fillText(c.t, tX, y + chipH / 2 + 1);
        ctx.textBaseline = "top";
      }
      cx = isAr ? cx - w - chipGap : cx + w + chipGap;
    }
    y += chipH;

    // Divider
    y += 22;
    if (draw) { ctx.strokeStyle = BD; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke(); }

    if (it.updates && it.updates.length) { label(L().updatesT, MUT); bullets(it.updates, "·", ACC, INK, false, 16, 8); }
    if (it.next && it.next.length) { label(L().nextT, NEXTC); bullets(it.next, "→", NEXTC, INK, false, 16, 8); }
    if (it.outcome) { label(L().outcomeT, OUTC); bullets([it.outcome], "◇", OUTC, MUT, true, 16, 8); }

    // Footer
    y += 26;
    if (draw) { ctx.strokeStyle = BD; ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(W - PAD, y); ctx.stroke(); }
    y += 16;
    block("Ministry of Cabinet Affairs · " + tr(TITLE) + " · " + trD(R.date), "500 12px " + bfont, MUT, 12, 0);
    y += PAD - 8;
    return y;
  }

  const H = Math.ceil(paint(meas, false));
  const scale = Math.min(3, (window.devicePixelRatio || 1) * 1.5);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.fillStyle = SF;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = ACC; // top brand bar
  ctx.fillRect(0, 0, W, 6);
  paint(ctx, true);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/png")
  );
}

async function shareCard(key) {
  const reg = itemsByKey[key];
  if (!reg) return;
  const { tr } = t();
  toast(L().sharing);
  let blob;
  try { blob = await renderCardImage(reg); }
  catch (e) { toast(L().shareErr); return; }

  const name = tr(reg.item.name) || "project";
  const safe = name.replace(/[^\w؀-ۿ]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 48) || "project";
  const file = new File([blob], safe + ".png", { type: "image/png" });
  const shareText = name + " — " + tr(TITLE);

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: name, text: shareText }); return; }
    catch (err) { if (err && err.name === "AbortError") return; /* fall through to download */ }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = file.name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  toast(L().shareFail);
}

function build() {
  const l = L();
  const { tr, trS, trD, dir, langLabel, backArrow, isAr } = t();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dir;
  const title = tr(TITLE);
  document.title = title;

  // Week selector: uploaded demand weeks (distinct pages) + the built-in weekly
  // reports (the live report plus historical snapshots), so every archived week
  // stays viewable on its own data.
  const uploaded = storedWeeks("demand").filter((x) => x.data);
  const builtinOpts = [m.demandReport, ...m.demandHistory].map((r) => ({
    v: r.id === m.demandReport.id ? SELF : SELF + "?week=" + r.id,
    label: trD(r.date),
  }));
  const weekOpts = [
    ...uploaded.map((w) => ({ v: SELF + "?week=" + w.id, label: trD(w.week) + " · " + trD(w.date) })),
    ...builtinOpts,
  ];
  const curWeek = weekId ? SELF + "?week=" + weekId : SELF;

  // Dynamic portfolio stats — computed from this portal's items, never hard-coded.
  const statDefs = [
    { n: ALL.length, label: "Total Projects", sub: "All projects, releases & demands", cls: "hl" },
    { n: ALL.filter((x) => !x.secId.includes("demand")).length, label: "Projects & enhancements", sub: "Active deliveries & releases", cls: "" },
    { n: ALL.filter((x) => x.secId.includes("demand")).length, label: "Demands", sub: "Backlog & requests", cls: "" },
    { n: ALL.filter((x) => x.status === "Live").length, label: "Live", sub: "Currently in production", cls: "live" },
  ];
  const statsHTML = statDefs
    .map((s) => `<div class="stat-card ${s.cls}"><span class="n">${s.n}</span><span class="lbl">${esc(tr(s.label))}</span><span class="sub">${esc(tr(s.sub))}</span></div>`)
    .join("");

  // Dynamic entity distribution.
  const entCounts = {};
  ALL.forEach((it) => { entCounts[it.entity] = (entCounts[it.entity] || 0) + 1; });
  const entList = Object.entries(entCounts).map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
  const maxE = Math.max(1, ...entList.map((e) => e.n));
  const entitiesHTML = entList
    .map((e, i) => `<div class="entity-row">
      <span class="entity-name">${esc(e.name)}</span>
      <div class="entity-track"><div class="entity-fill" style="width:${Math.max(4, Math.round((e.n / maxE) * 100))}%;animation-delay:${i * 0.05}s"></div></div>
      <span class="entity-n">${e.n}</span>
    </div>`)
    .join("");

  // Flagged-for-review panel (shown on the ministry portal, where review happens).
  const flaggedHTML =
    VARIANT === "ministry" && FLAGGED.length
      ? `<section class="flagged-panel" aria-label="Flagged for review">
          <span class="flagged-title">${esc(l.flaggedT)}</span>
          ${FLAGGED.map((f) => `<div class="flagged-row"><span class="flag" aria-hidden="true">⚑</span><span class="name">${esc(tr(f.name))}</span><span class="meta">${esc(l.flaggedEntity)}: ${esc(f.entity)}</span></div>`).join("")}
          <span class="flagged-note">${esc(l.flaggedNote)}</span>
        </section>`
      : "";

  // Attention lists.
  const onHold = ALL.filter((it) => it.status === "On Hold");
  const pendings = ALL.filter((it) => it.status === "Pending");
  const nearTerm = ALL.filter((it) => /Jul|Jun|Aug/.test(it.goLive) && it.goLive !== "Live")
    .map((it) => ({ ...it, overdue: /Jun/.test(it.goLive) }))
    .sort((a, b) => (a.overdue ? 0 : 1) - (b.overdue ? 0 : 1));

  const navItems = [
    { id: "overview", label: l.navOverview },
    ...SECTIONS.map((sec) => ({ id: sec.id, label: sec.num + " " + tr(sec.title) })),
    { id: "attention", label: l.navAttention, accent: true },
  ];

  const optionsHTML = (list, all, cur) =>
    `<option value="All">${esc(all)}</option>` +
    list.map((o) => `<option value="${esc(o.v)}"${o.v === cur ? " selected" : ""}>${esc(o.label)}</option>`).join("");

  document.getElementById("app").innerHTML = `
  <header class="report-header">
    <div class="header-inner">
      <a href="index.html" aria-label="Back to home" class="back-btn no-print"><span class="back-arrow" aria-hidden="true">${backArrow}</span><span>${esc(l.back)}</span></a>
      <div class="header-titles">
        <span class="header-kicker">${esc(tr(R.dept))}</span>
        <span class="header-name">${esc(title)}</span>
      </div>
      <button type="button" id="langBtn" class="lang-btn" aria-label="Switch language">${esc(langLabel)}</button>
    </div>
    <nav class="section-nav no-print" aria-label="Report sections">
      ${navItems.map((n) => `<a class="nav-pill${n.accent ? " accent" : ""}" href="#${esc(n.id)}">${esc(n.label)}</a>`).join("")}
    </nav>
  </header>

  <main class="report-main">
    <section class="hero" aria-label="Report hero">
      <div class="hero-top">
        <div class="hero-titles">
          <h1>${esc(title)}</h1>
          <span class="hero-sub">${esc(tr(R.subtitle))} · <strong>${esc(l.lastUpdated)}: ${esc(trD(R.date))}</strong></span>
        </div>
        <span class="status-pill"><span class="dot"></span>${esc(trS(R.overallStatus))}</span>
      </div>
      <div class="hero-actions no-print">
        ${R.pdf ? `<a class="btn-primary" href="${esc(R.pdf)}" download>${esc(l.downloadPdf)}</a>` : ""}
        <select id="weekSelect" class="week-select" aria-label="Select week">
          ${weekOpts.map((w) => `<option value="${esc(w.v)}"${w.v === curWeek ? " selected" : ""}>${esc(w.label)}</option>`).join("")}
        </select>
      </div>
    </section>

    <section id="overview" aria-label="Portfolio overview">
      <h2 class="section-title">${esc(l.overviewT)}</h2>
      <div class="stat-grid">${statsHTML}</div>
      ${entList.length > 1 ? `<div class="entity-panel"><span class="label-caps">${esc(l.byEntity)}</span>${entitiesHTML}</div>` : ""}
    </section>

    ${flaggedHTML}

    <section class="filters-card no-print${state.showFilters ? " expanded" : ""}" id="filtersCard" aria-label="Filters">
      <div class="filters-row">
        <div class="filter-search">
          <span class="glyph" aria-hidden="true">⌕</span>
          <input id="pdSearch" type="text" placeholder="${esc(l.searchPh)}" aria-label="Search this report" autocomplete="off" value="${esc(state.q)}">
          <button type="button" id="pdClear" class="clear-btn" aria-label="Clear" ${state.q ? "" : "hidden"}>✕</button>
        </div>
        <button type="button" id="filtersBtn" class="filters-btn" aria-expanded="${state.showFilters}"><span>${esc(l.filtersBtn)}</span><span class="chev" aria-hidden="true">▾</span></button>
      </div>
      <div class="filter-selects">
        <select id="fSection" aria-label="Filter by section">${optionsHTML(SECTIONS.map((s) => ({ v: s.id, label: l.section + " " + s.num + " — " + tr(s.title) })), l.allSections, state.fSection)}</select>
        <select id="fEntity" aria-label="Filter by entity">${optionsHTML([...new Set(ALL.map((it) => it.entity))].sort().map((e) => ({ v: e, label: e })), l.allEntities, state.fEntity)}</select>
        <select id="fStatus" aria-label="Filter by status">${optionsHTML([...new Set(ALL.map((it) => it.status))].map((s) => ({ v: s, label: trS(s) })), l.allStatuses, state.fStatus)}</select>
        <select id="fOwner" aria-label="Filter by owner">${optionsHTML([...new Set(ALL.map((it) => it.owner).filter(Boolean))].map((o) => ({ v: o, label: tr(o) })), l.allOwners, state.fOwner)}</select>
      </div>
      <div class="filters-foot">
        <span class="filters-count" id="shownCount"></span>
        <button type="button" id="resetBtn" class="reset-btn" hidden>${esc(l.reset)}</button>
      </div>
    </section>

    <div id="pdSections" style="display:flex;flex-direction:column;gap:40px"></div>

    <section id="attention" class="attention-card" aria-label="Requires management attention">
      <div class="attention-head">${esc(l.attentionTitle)}</div>
      <div class="attention-grid">
        <div class="attention-col">
          <span class="att-label" style="color:#2B6CB0">${esc(l.nearTermT)}</span>
          ${nearTerm.map((n) => `<div class="att-line"><span class="att-date">${esc(trD(n.goLive))}</span><span>${esc(tr(n.name))}</span>${n.overdue ? `<span class="past-date">${esc(l.pastDate)}</span>` : ""}</div>`).join("")}
        </div>
        <div class="attention-col">
          <span class="att-label" style="color:#6E6A61">${esc(l.onHoldT)} — ${onHold.length}</span>
          ${onHold.map((h) => `<div class="att-line"><span class="b" style="color:#8A857A">⏸</span><span>${esc(tr(h.name))} <span class="sub">· ${esc(h.entity)}</span></span></div>`).join("")}
        </div>
        <div class="attention-col">
          <span class="att-label" style="color:#9C6A1E">${esc(l.awaitingT)} — ${pendings.length}</span>
          ${pendings.map((p) => `<div class="att-line"><span class="b" style="color:#9C6A1E">▲</span><span>${esc(tr(p.name))} <span class="sub">· ${esc(p.entity)}</span></span></div>`).join("")}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">Ministry of Cabinet Affairs · ${esc(tr(R.dept))} · ${esc(trD(R.date))}</footer>`;

  // ---- Events ----
  document.getElementById("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    setLang(state.lang);
    build();
  });
  document.getElementById("weekSelect").addEventListener("change", (e) => {
    if (e.target.value && e.target.value !== curWeek) location.href = e.target.value;
  });
  document.getElementById("filtersBtn").addEventListener("click", () => {
    state.showFilters = !state.showFilters;
    document.getElementById("filtersCard").classList.toggle("expanded", state.showFilters);
    document.getElementById("filtersBtn").setAttribute("aria-expanded", String(state.showFilters));
  });
  const search = document.getElementById("pdSearch");
  search.addEventListener("input", (e) => {
    state.q = e.target.value;
    document.getElementById("pdClear").hidden = !state.q;
    renderSections();
  });
  document.getElementById("pdClear").addEventListener("click", () => {
    state.q = "";
    search.value = "";
    document.getElementById("pdClear").hidden = true;
    renderSections();
    search.focus();
  });
  for (const id of ["fSection", "fEntity", "fStatus", "fOwner"]) {
    document.getElementById(id).addEventListener("change", (e) => {
      state[id] = e.target.value;
      renderSections();
    });
  }
  document.getElementById("resetBtn").addEventListener("click", () => {
    Object.assign(state, { q: "", fSection: "All", fEntity: "All", fStatus: "All", fOwner: "All" });
    build();
    renderSections();
  });
  document.getElementById("pdSections").addEventListener("click", (e) => {
    const shareBtn = e.target.closest(".share-btn");
    if (shareBtn) { e.preventDefault(); shareCard(shareBtn.dataset.share); return; }
    const head = e.target.closest(".item-head");
    if (!head) return;
    const card = head.closest(".item-card");
    const key = card.dataset.key;
    const open = !(state.open[key] !== false);
    state.open[key] = open;
    card.classList.toggle("open", open);
    head.setAttribute("aria-expanded", String(open));
  });

  renderSections();
  initScrollSpy(["overview", ...SECTIONS.map((s) => s.id), "attention"]);
}

build();
