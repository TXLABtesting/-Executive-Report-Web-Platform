# Executive Report Web Platform — IT Handover

Handover package for the development & operations team.
**Ministry of Cabinet Affairs — Digital Transformation Department.**

Repository: `https://github.com/TXLABtesting/-Executive-Report-Web-Platform`
Working branch: `claude/implement-home-dc-html-mxa6tz`
Live demo (GitHub Pages): `https://txlabtesting.github.io/-Executive-Report-Web-Platform/`

---

## 1. What this is

A bilingual (English / Arabic, full RTL) executive reporting website. The landing
page (`index.html`) shows report portals as cards:

| Portal | Route (file) | Content |
|---|---|---|
| WGS Weekly Status Report | `wgs-weekly-status.html` | Meetings, workstream timeline, AI & Security deep-dive, decisions & risks, actions |
| Ministry Project & Demand | `ministry-project-demand.html` | Project & Demand items whose Entity/Sector is **not** `CSS` |
| CSS Project & Demand | `css-project-demand.html` | Project & Demand items whose Entity/Sector is exactly `CSS` |
| Total Experience Center | *(hidden)* | External report — currently disabled, awaiting its URL from the business |

Supporting pages: `admin-upload.html` (publish a new weekly report from a PDF) and
`report-viewer.html` (details page for uploads without extracted content).

Portal visibility is controlled by `HIDDEN_PORTALS` in `home.js` (currently
`["tec"]` — WGS, Ministry and CSS are visible; TEC is hidden until its URL is provided).

## 2. Tech stack — zero build

Plain **HTML + CSS + ES modules**. No framework, no bundler, no transpilation, no
build step. Serve the files with any static web server and they run. The only Node
dependency (`@anthropic-ai/sdk`) is used *exclusively* by the optional serverless
function `api/extract.js` — the website itself has no runtime dependencies.

Progressive Web App: the site is installable to a phone/desktop home screen and
works offline (service worker + web manifest).

## 3. Repository layout

```
index.html + home.js              Landing page: report portal cards
ministry-project-demand.html      Project & Demand portal shells
css-project-demand.html           (variant chosen via <body data-variant="ministry|css">)
pd-report.js                      Shared P&D portal logic (stats, filters, sections, share-as-image)
wgs-weekly-status.html + wgs-report.js   WGS Weekly Status portal
admin-upload.html + admin.js      Admin: publish a new weekly report (PDF -> content)
report-viewer.html + viewer.js    Viewer for uploaded PDFs without extracted content
common.js                         Shared helpers (esc, theme, language, translators, badges, scroll-spy)
reports-data.js                   * SINGLE SOURCE OF TRUTH - all report data + routing + theme tokens
translations-ar.js                Arabic dictionary (keyed by the exact English source strings)
report.css                        Shared styles for the report/admin/viewer pages
manifest.webmanifest + sw.js + pwa.js + icons/   PWA (installable, offline)
api/extract.js                    Optional serverless PDF->JSON extractor (Vercel-style)
uploads/                          Source PDFs referenced by the "Download original PDF" buttons
.github/workflows/pages.yml       GitHub Pages deploy workflow
```

## 4. Run locally

Any static file server works — there is no build. From the repo root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/
```

or `npx serve`, VS Code Live Server, Nginx, Apache — anything that serves static
files. **Do not** open via `file://` (ES modules and the service worker require
`http(s)://`).

## 5. Deploy

The site is a folder of static files. Deploy the repository root to any static host.

- **GitHub Pages (already configured):** `.github/workflows/pages.yml` publishes on
  every push to the working branch. Live at the demo URL above.
- **Any web server / CDN / object storage:** copy the repo root (excluding
  `node_modules/`, `.git/`, `api/`) to the web root. No server-side runtime needed.
- **PWA requirement:** installability and offline need the site served over **HTTPS**
  (any real domain / GitHub Pages already is; `localhost` also works for testing).
- **Service-worker cache:** after deploying an update, bump `VERSION` in `sw.js`
  (e.g. `"v1"` -> `"v2"`) so returning visitors pick up the new files immediately.
- `vercel.json` + `api/extract.js` are only needed if you deploy the optional
  extraction API on Vercel (see section 8). For a pure static host, ignore them.

## 6. Updating the weekly report data (the main operational task)

All report content lives in **`reports-data.js`** — one structured JavaScript module,
no database. Editing it is how a new week is published. The three portals are
*derived views* of this one file, so you never edit the portal pages.

### 6.1 Project & Demand (Ministry + CSS portals)

Both portals read `demandReport`. Each item is created with the helper:

```js
P(name, entity, status, updates, next, goLive, outcome)
```

- `name` — project/demand title (string)
- `entity` — Entity / Sector, e.g. `"CSS"`, `"PMO"`, `"WGS"`, `"GSOC"` … (drives routing)
- `status` — e.g. `"On Track"`, `"In Progress"`, `"Live"`, `"On Hold"`, `"Not active"`, `"Delayed by Business"` …
- `updates` — array of "Status & Updates" bullet strings (`[]` if none)
- `next` — array of "Next Steps" bullet strings (`[]` if none)
- `goLive` — go-live date/label, e.g. `"3 Aug 2026"`, `"Live"`, `"TBD — …"`
- `outcome` — the "Project Outcome" text (omit or `""` if none)

Items are grouped by **Project Manager** using the group `label` inside each section:

```js
{ id: "projects", num: "01", title: "Projects", groups: [
  { label: "Banan", items: [ P("…", "CSS", "On Track", [], [], "3 Aug 2026", "…"), … ] },
  { label: "Noura", items: [ … ] },
] }
```

**Routing rule (portal assignment):** `CSS` -> CSS portal; **every other** entity ->
Ministry portal. Nothing is dropped or auto-flagged. See `isCssEntity` /
`isMinistryEntity` / `splitDemand` near the bottom of `reports-data.js`.

**All totals are computed from the data at render time — never hard-code counts.**
The overview "Total Projects" card counts the *active* portfolio (every status except
`On Hold` and `Not active`); "Live" counts items in production. Change this logic in
`pd-report.js` (`statDefs`) if the definition of "active" changes.

To publish a new P&D week: replace the `demandReport` object (id/date/subtitle/summary/
sections), drop the new PDF into `uploads/project-demand-status-report.pdf`, and add
Arabic strings for any new text to `translations-ar.js` (see section 7).

### 6.2 WGS Weekly Status

Read from `wgsReport` (meetings, workstream, `salesforce` = the deep-dive block,
decisions, risks, actions, glance stats). Section labels that are specific to a given
week (glance labels, workstream/deep-dive titles) live in the `I18N` object in
`wgs-report.js`; update them alongside the data.

## 7. Bilingual (English / Arabic + RTL)

- The language toggle stores the choice in `localStorage` (`dtLang`). The whole UI,
  including `dir="rtl"`, switches live.
- **`translations-ar.js`** holds the Arabic dictionary, **keyed by the exact English
  source string**. Any English text in `reports-data.js` that should appear in Arabic
  must have a matching entry, otherwise it falls back to English.
- By design, **product/system names, acronyms (SOW, BRD, UAT, UAE Pass, Oracle …) and
  people's names stay in English** in both languages.
- After adding/editing report content, add the new strings to `translations-ar.js`.
  (Statuses, types and dates have their own maps: `STATUS_AR`, `TYPE_AR`, `arDate`.)

## 8. PDF -> content extraction (optional)

Editing `reports-data.js` by hand is the reliable path and needs no AI. For
self-service uploads, `admin-upload.html` can turn a PDF into report content. Because
arbitrary PDFs need AI to parse, extraction has three fallbacks (in `admin.js`):

1. **Claude Design runtime** (`window.claude.complete`) — only when hosted inside that runtime.
2. **`POST api/extract`** — the Vercel-style serverless function in `api/extract.js`
   (needs `ANTHROPIC_API_KEY` set server-side).
3. **Direct from the browser** — using an Anthropic API key the admin pastes into the
   "Extraction settings" box (stored only in their browser, `localStorage: dtAnthropicKey`).

On a **pure static host with none of the above**, the admin page still stores the PDF
(reachable via the viewer) but cannot auto-extract structured content — publish that
week by editing `reports-data.js` instead. Uploaded weeks are stored per-browser in
`localStorage` (`dtWeeks`); they are **not** shared between users or devices. For a
shared, multi-user publishing flow, back these operations with a small API + database
(the data shapes in `reports-data.js` map 1:1 to table rows).

## 9. Theming

Colours are CSS custom properties. The active theme (currently **Royal Navy**,
accent `#1E4E8C`) is defined in three places that must stay in sync:
`reports-data.js` (`themes` — applied at runtime and the source of truth),
`report.css` `:root`, and the inline `:root` in `index.html`. The PWA colours live in
`manifest.webmanifest` (`theme_color`/`background_color`), the `theme-color` meta tag
on every page, and the app icons under `icons/`. Semantic status colours
(green/blue/amber for On Track, In Progress, Pending, Live) are intentionally separate
from the accent and defined in `statusColors` / `darkStatusColors` in `reports-data.js`.

## 10. Accessibility & support

Responsive/mobile-first, RTL-aware, keyboard-focusable, sticky report header with a
horizontally-scrolling section nav on phones. Targets current evergreen browsers
(Chrome/Edge, Safari, Firefox). Google Fonts are loaded from their CDN with system-font
fallbacks; if your hosting blocks external CDNs, self-host the two font families and
update the `<link>` tags.

## 11. Pending / open items

- **Total Experience Center portal** — hidden (`HIDDEN_PORTALS` in `home.js`).
  To enable it, provide its destination URL and set the TEC card `href`.
- **Weekly history** — the Project & Demand report keeps one historical snapshot
  (`demandReportPrev`) selectable from the report's week dropdown. A full multi-week
  archive would be a backend feature.
- **Shared publishing** — see section 8; today uploads are per-browser only.

## 12. First steps for the dev team

1. Clone the repo, run `python3 -m http.server`, open the site, click through all
   portals in EN and AR.
2. Read `reports-data.js` top-to-bottom — it is the whole content/data model.
3. Do a trial weekly update: edit one `P(...)` item, add its Arabic string, reload.
4. Confirm the GitHub Pages deploy (or wire your own static host) and, for PWA, that
   the site is served over HTTPS.
