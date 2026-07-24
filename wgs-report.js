// WGS Weekly Status Report portal.
import * as m from "./reports-data.js";
import { esc, applyTheme, getLang, setLang, translators, badge, storedWeeks, initScrollSpy } from "./common.js";

const SELF = m.wgsReport.href;

const I18N = {
  en: {
    reportName: "WGS Weekly Status Report", navAttention: "Attention", navGlance: "At a Glance", navMeetings: "Meetings",
    navWorkstream: "Workstream", navSalesforce: "AI & Security", navDecisions: "Decisions & Risks", navActions: "Actions",
    lastUpdated: "Last updated", back: "Home", downloadPdf: "Download original PDF",
    attentionTitle: "Requires Management Attention", risks3: "Programme Risks",
    decisionsIP: "Open Decisions — In Progress", pendingA: "Pending Actions", glanceT: "Programme at a Glance",
    sessionsHeld: "Sessions Held", sfOnboarding: "AI Scope",
    meetingsT: "Meetings Held", meetingsSub: "3 sessions completed · MOMs issued · Actions in progress",
    keyOutcomes: "Key Outcomes", attendees: "Attendees", parties: "Parties",
    wsT: "Workstream Focus — Program Portal", wsPrefix: "Workstream Focus — ", phase: "Phase",
    currentStatus: "Current Status", openDecisions: "Open Decisions", nextStepsT: "Immediate Next Steps",
    sfT: "AI Capability & Security — Deep Dive", sfSharedT: "HLD Review Status", sfDecT: "Decisions & Next Steps",
    kdrT: "Key Decisions & Risks", kdrSub: "Items requiring management attention or tracking", risksT: "Programme Risks",
    actionsT: "Action Items & Next Steps", actionsSub: "Current status of this week's action items",
    owner: "Owner", target: "Target", all: "All",
  },
  ar: {
    reportName: "تقرير الحالة الأسبوعي — WGS", navAttention: "انتباه", navGlance: "لمحة عامة", navMeetings: "الاجتماعات",
    navWorkstream: "مسار العمل", navSalesforce: "الذكاء والأمن", navDecisions: "القرارات والمخاطر", navActions: "الإجراءات",
    lastUpdated: "آخر تحديث", back: "الرئيسية", downloadPdf: "تحميل ملف PDF الأصلي",
    attentionTitle: "يتطلب اهتمام الإدارة", risks3: "مخاطر البرنامج",
    decisionsIP: "قرارات مفتوحة — قيد التنفيذ", pendingA: "إجراءات معلّقة", glanceT: "البرنامج في لمحة",
    sessionsHeld: "جلسات منعقدة", sfOnboarding: "نطاق الذكاء الاصطناعي",
    meetingsT: "الاجتماعات المنعقدة", meetingsSub: "اكتملت 3 جلسات · صدرت محاضر الاجتماعات · الإجراءات قيد التنفيذ",
    keyOutcomes: "أبرز النتائج", attendees: "الحضور", parties: "الأطراف",
    wsT: "محور مسار العمل — بوابة البرامج", wsPrefix: "محور مسار العمل — ", phase: "المرحلة",
    currentStatus: "الوضع الحالي", openDecisions: "قرارات مفتوحة", nextStepsT: "الخطوات التالية الفورية",
    sfT: "قدرات الذكاء الاصطناعي والأمن — نظرة معمّقة", sfSharedT: "حالة مراجعة وثيقة HLD", sfDecT: "القرارات والخطوات التالية",
    kdrT: "القرارات والمخاطر الرئيسية", kdrSub: "بنود تتطلب اهتمام الإدارة أو المتابعة", risksT: "مخاطر البرنامج",
    actionsT: "بنود العمل والخطوات التالية", actionsSub: "الحالة الحالية لبنود العمل لهذا الأسبوع",
    owner: "المسؤول", target: "الموعد المستهدف", all: "الكل",
  },
};

const state = {
  lang: getLang(),
  mGroup: "All",
  aStatus: "All",
  open: {}, // meeting key -> false when collapsed; meetings start expanded
};

applyTheme();

// ---- Resolve the source report (base data or an uploaded week override) ----
const weekId = new URLSearchParams(location.search).get("week");
let R = m.wgsReport;
let overridden = false;
if (weekId) {
  const w = storedWeeks("wgs").find((x) => String(x.id) === weekId && x.data);
  if (w) {
    overridden = true;
    const d = w.data || {};
    R = {
      ...R, ...d,
      glance: {
        stats: d.glance && d.glance.stats && d.glance.stats.length ? d.glance.stats : R.glance.stats,
        covers: d.glance && d.glance.covers && d.glance.covers.length ? d.glance.covers : R.glance.covers,
      },
      workstream: { ...R.workstream, ...(d.workstream || {}) },
      salesforce: { ...R.salesforce, ...(d.salesforce || {}) },
      meetings: d.meetings && d.meetings.length
        ? d.meetings.map((x) => ({ num: x.num || "", group: x.group || "", title: x.title || "", badge: x.badge || "", attendees: x.attendees || "", outcomes: x.outcomes || [] }))
        : R.meetings,
      decisions: d.decisions && d.decisions.length ? d.decisions : R.decisions,
      risks: d.risks && d.risks.length ? d.risks : R.risks,
      actions: d.actions && d.actions.length ? d.actions : R.actions,
      subtitle: d.subtitle || R.subtitle,
      weekOf: d.weekOf || w.week,
      date: w.date,
      pdf: w.pdfData || R.pdf,
    };
  }
}

const L = () => I18N[state.lang];
const t = () => translators(state.lang);

function meetingsHTML() {
  const { tr } = t();
  return R.meetings
    .map((mt, i) => ({ mt, key: "m" + i }))
    .filter(({ mt }) => state.mGroup === "All" || mt.group === state.mGroup)
    .map(({ mt, key }) => {
      const open = state.open[key] !== false;
      const whoLabel = mt.attendees.includes("(") ? L().attendees : L().parties;
      return `<article class="meeting-card item-card${open ? " open" : ""}" data-key="${esc(key)}">
        <button type="button" class="meeting-head item-head-toggle" aria-expanded="${open}">
          <span class="meeting-num">${esc(mt.num)}</span>
          <span class="meeting-titles">
            <span class="meeting-title">${esc(tr(mt.title))}</span>
            <span class="meeting-group">${esc(tr(mt.group))}</span>
          </span>
          <span class="meeting-badge">${esc(tr(mt.badge))}</span>
          <span class="chev-i" aria-hidden="true">▾</span>
        </button>
        <div class="item-detail">
          <div class="detail-block">
            <span class="detail-label">${esc(whoLabel)}</span>
            <span style="font-size:13px;color:var(--mut);line-height:1.6">${esc(mt.attendees)}</span>
          </div>
          <div class="detail-block" style="padding-top:0">
            <span class="detail-label">${esc(L().keyOutcomes)}</span>
            ${mt.outcomes.map((o) => `<div class="detail-line"><span class="b">·</span><span>${esc(tr(o))}</span></div>`).join("")}
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function meetingChipsHTML() {
  const { tr } = t();
  const groups = ["All", ...new Set(R.meetings.map((x) => x.group))];
  return groups
    .map((g) => `<button type="button" class="chip${state.mGroup === g ? " active" : ""}" data-group="${esc(g)}">${esc(g === "All" ? L().all : tr(g))}</button>`)
    .join("");
}

function actionsHTML() {
  const { tr, trS, trD } = t();
  return R.actions
    .filter((a) => state.aStatus === "All" || a.status === state.aStatus)
    .map((a) => {
      const b = badge(a.status);
      const target = tr(a.target) === a.target ? trD(a.target) : tr(a.target);
      return `<article class="action-card">
        <span class="action-title">${esc(tr(a.action))}</span>
        <div class="action-meta">
          <span><strong>${esc(L().owner)}:</strong> ${esc(a.owner)}</span>
          <span><strong>${esc(L().target)}:</strong> ${esc(target)}</span>
          <span class="badge-sm" style="background:${esc(b.bg)};color:${esc(b.fg)}"><span class="dot" style="background:${esc(b.dot)}"></span>${esc(trS(a.status))}</span>
        </div>
      </article>`;
    })
    .join("");
}

function actionChipsHTML() {
  const { trS } = t();
  const statuses = ["All", ...new Set(R.actions.map((a) => a.status))];
  return statuses
    .map((s) => `<button type="button" class="chip${state.aStatus === s ? " active" : ""}" data-status="${esc(s)}">${esc(s === "All" ? L().all : trS(s))}</button>`)
    .join("");
}

function build() {
  const l = L();
  const { tr, trS, trD, dir, langLabel, backArrow, isAr } = t();
  document.documentElement.lang = state.lang;
  document.documentElement.dir = dir;
  document.title = l.reportName;

  const uploaded = storedWeeks("wgs").filter((x) => x.data);
  const baseOpts = m.archive.map((w) => {
    const r = w.reports.find((x) => x.title === "WGS Weekly Status Report") || w.reports[0];
    return { v: r.href, label: trD(w.week) + " · " + trD(w.date) };
  });
  const weekOpts = [
    ...uploaded.map((w) => ({ v: SELF + "?week=" + w.id, label: trD(w.week) + " · " + trD(w.date) })),
    ...baseOpts,
  ];
  const curWeek = weekId ? SELF + "?week=" + weekId : (baseOpts[0] ? baseOpts[0].v : "");

  const navItems = [
    { id: "glance", label: l.navGlance }, { id: "meetings", label: l.navMeetings },
    { id: "workstream", label: l.navWorkstream }, { id: "salesforce", label: l.navSalesforce },
    { id: "decisions", label: l.navDecisions }, { id: "actions", label: l.navActions },
    { id: "attention", label: l.navAttention, accent: true },
  ];

  const gs = R.glance.stats || [];
  const decisions = R.decisions.map((d) => ({ ...d, b: badge(d.status) }));
  const risks = R.risks.map((r) => ({ ...r, b: badge(r.level) }));
  const pending = R.actions.filter((a) => a.status === "Pending");
  const timeline = R.workstream.timeline.map((x) => ({ ...x, b: badge(x.status) }));
  const wsHead = overridden ? l.wsPrefix + tr(R.workstream.title || "") : l.wsT;

  document.getElementById("app").innerHTML = `
  <header class="report-header">
    <div class="header-inner">
      <a href="index.html" aria-label="Back to home" class="back-btn no-print"><span class="back-arrow" aria-hidden="true">${backArrow}</span><span>${esc(l.back)}</span></a>
      <div class="header-titles">
        <span class="header-kicker">${esc(tr("Digital Transformation Strategy 2027"))}</span>
        <span class="header-name">${esc(l.reportName)}</span>
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
          <h1>${esc(tr(R.subtitle))}</h1>
          <span class="hero-sub">${esc(trD(R.weekOf))} · <strong>${esc(l.lastUpdated)}: ${esc(trD(R.date))}</strong></span>
        </div>
        <span class="status-pill"><span class="dot"></span>${esc(trS(R.overallStatus))}</span>
      </div>
      <div class="hero-actions no-print">
        <a class="btn-primary" href="${esc(R.pdf)}" download>${esc(l.downloadPdf)}</a>
        <select id="weekSelect" class="week-select" aria-label="Select week">
          ${weekOpts.map((w) => `<option value="${esc(w.v)}"${w.v === curWeek ? " selected" : ""}>${esc(w.label)}</option>`).join("")}
        </select>
      </div>
    </section>

    <section id="glance" aria-label="Programme at a glance">
      <h2 class="section-title">${esc(l.glanceT)}</h2>
      <div class="glance-grid">
        <div class="glance-hl"><span class="n">${esc(gs[0] ? tr(gs[0].n) : "")}</span><span class="glance-lbl">${esc(overridden ? (gs[0] ? tr(gs[0].label) : "") : l.sessionsHeld)}</span></div>
        <div class="glance-card"><span class="n">${esc(gs[1] ? tr(gs[1].n) : "")}</span><span class="glance-lbl">${esc(overridden ? (gs[1] ? tr(gs[1].label) : "") : l.sfOnboarding)}</span></div>
      </div>
    </section>

    <section id="meetings" aria-label="Meetings held">
      <div class="section-head">
        <h2 class="section-title">${esc(l.meetingsT)} — ${esc(trD(R.weekOf))}</h2>
        ${overridden ? "" : `<span class="section-sub">${esc(l.meetingsSub)}</span>`}
      </div>
      <div class="chip-row no-print" id="meetingChips" style="margin-top:16px">${meetingChipsHTML()}</div>
      <div id="meetingList"></div>
    </section>

    <section id="workstream" aria-label="Workstream focus">
      <div class="section-head">
        <h2 class="section-title">${esc(wsHead)}</h2>
        <span class="section-sub">${esc(tr(R.workstream.subtitle))}</span>
      </div>
      <div class="timeline-grid">
        ${timeline.map((x) => `<div class="timeline-card${x.status === "In Progress" ? " current" : ""}">
          <span class="timeline-step">${esc(l.phase)} ${esc(String(x.step))}</span>
          <span class="timeline-phase">${esc(tr(x.phase))}</span>
          <span class="timeline-badge" style="background:${esc(x.b.bg)};color:${esc(x.b.fg)}">${esc(trS(x.status))}</span>
        </div>`).join("")}
      </div>
      <div class="panel-grid">
        <div class="panel">
          <span class="panel-label" style="color:#276749">${esc(l.currentStatus)}</span>
          ${R.workstream.currentStatus.map((s) => `<div class="detail-line"><span class="b" style="color:#276749">✓</span><span>${esc(tr(s))}</span></div>`).join("")}
        </div>
        <div class="panel-stack">
          <div class="panel">
            <span class="panel-label" style="color:#9C6A1E">${esc(l.openDecisions)}</span>
            ${R.workstream.openDecisions.map((s) => `<div class="detail-line"><span class="b" style="color:#9C6A1E">◆</span><span>${esc(tr(s))}</span></div>`).join("")}
          </div>
          <div class="panel">
            <span class="panel-label" style="color:#2B6CB0">${esc(l.nextStepsT)}</span>
            ${R.workstream.nextSteps.map((s) => `<div class="detail-line"><span class="b" style="color:#2B6CB0">→</span><span>${esc(tr(s))}</span></div>`).join("")}
          </div>
        </div>
      </div>
    </section>

    <section id="salesforce" aria-label="Salesforce integration">
      <div class="section-head">
        <h2 class="section-title">${esc(l.sfT)}</h2>
        <span class="section-sub">${esc(tr(R.salesforce.context))}</span>
      </div>
      <div class="panel-grid-wide">
        ${R.salesforce.blocks.map((b) => `<div class="panel" style="gap:9px">
          <span class="sf-block-title">${esc(tr(b.title))}</span>
          <span class="sf-block-body">${esc(tr(b.body))}</span>
        </div>`).join("")}
      </div>
      <div class="sf-summary">
        <div class="sf-summary-block">
          <span class="sf-summary-label">${esc(l.sfSharedT)}</span>
          <span class="sf-summary-text">${esc(tr(R.salesforce.shared))}</span>
        </div>
        <div class="sf-summary-block">
          <span class="sf-summary-label">${esc(l.sfDecT)}</span>
          <span class="sf-summary-text">${esc(tr(R.salesforce.decisions))}</span>
        </div>
      </div>
    </section>

    <section id="decisions" aria-label="Key decisions and risks">
      <div class="section-head">
        <h2 class="section-title">${esc(l.kdrT)}</h2>
        <span class="section-sub">${esc(l.kdrSub)}</span>
      </div>
      <span class="label-caps" style="margin-top:16px">${esc(l.openDecisions)}</span>
      ${decisions.map((d) => `<article class="dr-card">
        <div class="dr-head">
          <span class="dr-title">${esc(tr(d.item))}</span>
          <span class="dr-badge" style="background:${esc(d.b.bg)};color:${esc(d.b.fg)}">${esc(trS(d.status))}</span>
        </div>
        <span class="dr-body">${esc(tr(d.detail))}</span>
      </article>`).join("")}
      <span class="label-caps" style="margin-top:20px">${esc(l.risksT)}</span>
      ${risks.map((r) => `<article class="dr-card risk">
        <div class="dr-head-inline">
          <span class="dr-badge" style="background:${esc(r.b.bg)};color:${esc(r.b.fg)}">${esc(trS(r.level))}</span>
          <span class="dr-title">${esc(tr(r.risk))}</span>
        </div>
        <span class="dr-body">${esc(tr(r.mitigation))}</span>
      </article>`).join("")}
    </section>

    <section id="actions" aria-label="Action items and next steps">
      <div class="section-head">
        <h2 class="section-title">${esc(l.actionsT)}</h2>
        <span class="section-sub">${esc(l.actionsSub)}</span>
      </div>
      <div class="chip-row no-print" id="actionChips" style="margin-top:16px">${actionChipsHTML()}</div>
      <div id="actionList"></div>
    </section>

    <section id="attention" class="attention-card" aria-label="Requires management attention">
      <div class="attention-head">${esc(l.attentionTitle)}</div>
      <div class="attention-grid">
        <div class="attention-col">
          <span class="att-label" style="color:#9C6A1E">${esc(l.risksT + " — " + risks.length)}</span>
          ${risks.map((r) => `<a class="att-link" href="#decisions"><span class="b" style="color:#9C6A1E">▲</span><span>${esc(tr(r.risk))}</span></a>`).join("")}
        </div>
        <div class="attention-col">
          <span class="att-label" style="color:#6B46C1">${esc(l.decisionsIP)}</span>
          ${decisions.map((d) => `<a class="att-link" href="#decisions"><span class="b" style="color:#6B46C1">◆</span><span>${esc(tr(d.item))}</span></a>`).join("")}
        </div>
        <div class="attention-col">
          <span class="att-label" style="color:#2B6CB0">${esc(l.pendingA)} — ${pending.length}</span>
          ${pending.map((a) => `<a class="att-link" href="#actions"><span class="b" style="color:#2B6CB0">→</span><span>${esc(tr(a.action))}</span></a>`).join("")}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">WGS Digital Transformation 2027 · Internal Status Update · ${esc(trD(R.date))}</footer>`;

  // ---- Events ----
  document.getElementById("langBtn").addEventListener("click", () => {
    state.lang = state.lang === "ar" ? "en" : "ar";
    setLang(state.lang);
    build();
  });
  document.getElementById("weekSelect").addEventListener("change", (e) => {
    if (e.target.value && e.target.value !== curWeek) location.href = e.target.value;
  });
  document.getElementById("meetingChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.mGroup = chip.dataset.group;
    document.getElementById("meetingChips").innerHTML = meetingChipsHTML();
    document.getElementById("meetingList").innerHTML = meetingsHTML();
  });
  document.getElementById("actionChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.aStatus = chip.dataset.status;
    document.getElementById("actionChips").innerHTML = actionChipsHTML();
    document.getElementById("actionList").innerHTML = actionsHTML();
  });
  document.getElementById("meetingList").addEventListener("click", (e) => {
    const head = e.target.closest(".item-head-toggle");
    if (!head) return;
    const card = head.closest(".item-card");
    const key = card.dataset.key;
    const open = !(state.open[key] !== false);
    state.open[key] = open;
    card.classList.toggle("open", open);
    head.setAttribute("aria-expanded", String(open));
  });

  document.getElementById("meetingList").innerHTML = meetingsHTML();
  document.getElementById("actionList").innerHTML = actionsHTML();
  initScrollSpy(["glance", "meetings", "workstream", "salesforce", "decisions", "actions", "attention"]);
}

build();
