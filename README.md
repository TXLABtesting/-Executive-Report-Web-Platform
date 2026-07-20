# Executive Report Web Platform

Static web platform for the Ministry of Cabinet Affairs — Digital Transformation Department weekly executive reports.

## Report portals

The landing page (`index.html`) presents four access portals as clickable cards, plus global search and the weekly archive:

1. **WGS Weekly Status Report** — `wgs-weekly-status.html`: meetings, workstream focus, Salesforce deep dive, decisions & risks, actions.
2. **Ministry Project & Demand** — `ministry-project-demand.html`: items whose Entity / Sector is one of the ministry entities (PMO, MOCA, WGS, GSOC, FCSC, Performance & Govt Excellence, Strategy & Innovation, Govt Service Sector, MBRCGI / Strategy & Innovation, Govt Development & Future Office, GEEO, Office of Secretary-General).
3. **CSS Project & Demand** — `css-project-demand.html`: items whose Entity / Sector is exactly `CSS`.
4. **Total Experience Center Status Report** — external card that opens `https://chief-report.onrender.com/#sec-mocasmart` directly (same tab, anchor preserved); it has no internal page.

Supporting pages: `admin-upload.html` (admin upload page, linked from the header — publishes new weekly report versions to `localStorage`, with automatic PDF-to-content extraction when the Claude runtime is available) and `report-viewer.html` (details page for uploaded reports without interactive content).

## Report-mapping rules (Project & Demand split)

`reports-data.js` remains the **single structured source** for all Project & Demand data. The two P&D portals are derived views produced by `splitDemand(report, variant)`:

- An item belongs to **CSS Project & Demand** iff `entity === "CSS"`.
- An item belongs to **Ministry Project & Demand** iff its entity is in `MINISTRY_ENTITIES`.
- Any other entity value (missing, inconsistent, or unrecognized — e.g. `"—"`) is **flagged for review** and assigned to neither portal; flagged items are listed in a review panel on the ministry portal.
- Every item therefore appears in exactly one portal (or the flagged list) — never duplicated, never lost.
- **All totals, statistics, status distributions and entity counts are computed from the data at render time. Nothing is hard-coded.**

Each P&D portal has its own search, filters (section, entity, status, owner — combined under a single "Filters" button), summary stat cards, entity distribution chart, "Requires Management Attention" digest and weekly archive/week selector.

## Structure

- `index.html` + `home.js` — landing page: four portal cards, global search across all portals, weekly archive.
- `ministry-project-demand.html` / `css-project-demand.html` + `pd-report.js` — the two Project & Demand portals (one shared implementation, variant chosen by `<body data-variant>`).
- `wgs-weekly-status.html` + `wgs-report.js` — the WGS weekly report portal.
- `admin-upload.html` + `admin.js` — admin upload page: report-type picker, PDF upload, publish/reprocess/delete of uploaded weeks.
- `report-viewer.html` + `viewer.js` — viewer for uploaded reports (`?id=<upload id>`).
- `common.js` — shared helpers (escaping, theme, language state, translators, scroll-spy).
- `report.css` — shared styles for the report portals.
- `reports-data.js` — unified content model, report-mapping rules, split/flatten helpers, status colors, themes, search index.
- `translations-ar.js` — reviewed Arabic localization keyed by the exact English source strings.
- `uploads/` — original PDF report files referenced by the download links (add the PDFs here).

## Localization & responsiveness

Every page supports English and Arabic via the header language switcher; the choice persists in `localStorage` (`dtLang`) and flips the layout between LTR and RTL. The site is mobile-first: portal cards stack on small screens, report filters collapse under one button, and all item lists render as cards — no horizontal scrolling.

Weeks uploaded through the admin page are stored in `localStorage` under `dtWeeks`; they feed the portal cards, the week selectors on the report pages (`?week=<id>`), and the archives automatically. A demand upload feeds both P&D portals through the same split rules.

## Automatic PDF extraction (admin uploads)

The admin page reads each uploaded PDF in the browser (pdf-parse) and converts it into structured site content. Extraction resolves in this order:

1. **Claude Design runtime** (`window.claude.complete`) when the site runs inside a Claude Design preview.
2. **`/api/extract`** — a Vercel serverless function (`api/extract.js`) that calls the Claude API. Set the **`ANTHROPIC_API_KEY`** environment variable in the Vercel project settings to enable it (the key never reaches the browser). Optional: `EXTRACT_MODEL` overrides the model (default `claude-opus-4-8`).

If neither is available, the report still publishes to the archive with its PDF (state: "PDF only — needs processing") and can be processed later with the **Process content** button once the service is configured. There is no manual data entry: one attachment per update is enough, and a single Project & Demand upload feeds both P&D portals via the entity split rules.

## Running locally

The pages use ES modules, so serve over HTTP rather than opening the file directly:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```
