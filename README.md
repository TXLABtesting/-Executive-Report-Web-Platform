# Executive Report Web Platform

Static web platform for the Ministry of Cabinet Affairs — Digital Transformation Department weekly executive reports.

## Pages

- `index.html` — **Home** (implemented): weekly status report hub with global search, current report cards and the weekly archive. Fully bilingual (English / Arabic with RTL) with the language choice persisted in `localStorage`.
- `wgs-weekly-report.html` — WGS Weekly Status Report (not yet implemented; linked from Home)
- `project-demand-report.html` — Project & Demand Status Report (not yet implemented; linked from Home)
- `report-viewer.html` — viewer for uploaded PDF reports (not yet implemented)
- `admin-upload.html` — admin upload page (not yet implemented; linked from the header)

## Structure

- `home.js` — Home page logic: rendering, search, archive filtering, EN/AR toggle.
- `reports-data.js` — unified content model for both weekly reports, the archive, status colors, visual themes and the search index. Add a new weekly report by appending to `archive` and updating the report objects.
- `translations-ar.js` — reviewed Arabic localization keyed by the exact English source strings, plus status/type maps and date localization.
- `uploads/` — original PDF report files referenced by the "Original PDF" links (add the PDFs here).

Weeks uploaded through the (future) admin page are stored in `localStorage` under `dtWeeks` and are merged into the Home cards and archive automatically.

## Running locally

The pages use ES modules, so serve over HTTP rather than opening the file directly:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```
