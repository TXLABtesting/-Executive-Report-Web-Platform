# Executive Report Web Platform

Static, zero-build web platform for the Ministry of Cabinet Affairs —
Digital Transformation Department weekly executive reports.
Bilingual (English / Arabic, full RTL) and installable as a Progressive Web App.

> **IT handover:** see **[HANDOVER.md](HANDOVER.md)** for the full development,
> data-update and deployment guide. Arabic extraction note: **[IT-EXTRACTION-BRIEF-AR.md](IT-EXTRACTION-BRIEF-AR.md)**.

## Report portals

The landing page (`index.html`) shows the report portals as cards:

1. **WGS Weekly Status Report** — `wgs-weekly-status.html`: meetings, workstream
   timeline, AI & Security deep dive, decisions & risks, actions.
2. **Ministry Project & Demand** — `ministry-project-demand.html`: Project & Demand
   items whose Entity / Sector is **not** `CSS`.
3. **CSS Project & Demand** — `css-project-demand.html`: items whose Entity / Sector
   is exactly `CSS`.
4. **Total Experience Center** — hidden for now (awaiting its URL). Portal visibility
   is controlled by `HIDDEN_PORTALS` in `home.js`.

Supporting pages: `admin-upload.html` (publish a new weekly report from a PDF) and
`report-viewer.html` (viewer for uploads without extracted content).

## Routing rule (Project & Demand split)

`reports-data.js` is the **single structured source** for all Project & Demand data.
The two P&D portals are derived views produced by `splitDemand(report, variant)`:

- `entity === "CSS"` → **CSS Project & Demand** portal.
- Every other entity/sector → **Ministry Project & Demand** portal.
- Nothing is dropped or auto-flagged; each item appears in exactly one portal.
- **All totals, statistics and counts are computed from the data at render time —
  nothing is hard-coded.** The "Total Projects" card counts the active portfolio
  (every status except `On Hold` and `Not active`).

## Structure

- `index.html` + `home.js` — landing page (portal cards).
- `ministry-project-demand.html` / `css-project-demand.html` + `pd-report.js` — the
  two Project & Demand portals (one shared implementation; variant via `<body data-variant>`).
- `wgs-weekly-status.html` + `wgs-report.js` — the WGS weekly report portal.
- `admin-upload.html` + `admin.js` — admin publishing (PDF → content).
- `report-viewer.html` + `viewer.js` — viewer for uploaded reports.
- `common.js` — shared helpers (escaping, theme, language, translators, scroll-spy).
- `report.css` — shared styles for the report pages.
- `reports-data.js` — unified content model, routing rules, split/flatten helpers,
  status colours and theme tokens.
- `translations-ar.js` — Arabic dictionary keyed by the exact English source strings.
- `manifest.webmanifest` + `sw.js` + `pwa.js` + `icons/` — PWA (installable, offline).
- `uploads/` — original PDF report files referenced by the download links.

## Updating a weekly report

Edit `reports-data.js` (the single source of truth) and add any new Arabic strings to
`translations-ar.js`. Items use the `P(name, entity, status, updates, next, goLive, outcome)`
helper and are grouped by Project Manager. See **HANDOVER.md §6–7** for the full guide.

## Localization & responsiveness

Every page supports English and Arabic via the header language switcher; the choice
persists in `localStorage` (`dtLang`) and flips the layout between LTR and RTL. The
site is mobile-first with a sticky report header and horizontally-scrolling section nav.

## Deploy

`.github/workflows/pages.yml` deploys to GitHub Pages on every push to this branch.
Demo: `https://txlabtesting.github.io/-Executive-Report-Web-Platform/`. Any static host
works too; installability/offline (PWA) require HTTPS. See **HANDOVER.md §5**.

## Running locally

The pages use ES modules and a service worker, so serve over HTTP (not `file://`):

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```
