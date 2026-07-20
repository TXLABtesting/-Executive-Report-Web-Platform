# Executive Report Web Platform — IT Handover

Handover package for the development & operations team.
Repository: `https://github.com/TXLABtesting/-Executive-Report-Web-Platform` (branch `claude/implement-home-dc-html-mxa6tz`, currently the default branch).

---

## 1. What this is

A bilingual (EN / AR with full RTL) executive reporting site for the Ministry of Cabinet Affairs — Digital Transformation Department. A landing page exposes four report portals:

| Portal | Route (file) | Content |
|---|---|---|
| WGS Weekly Status Report | `wgs-weekly-status.html` | Meetings, workstream timeline, Salesforce deep-dive, decisions & risks, action items |
| Ministry Project & Demand | `ministry-project-demand.html` | P&D items whose Entity/Sector is one of the 12 ministry entities |
| CSS Project & Demand | `css-project-demand.html` | P&D items whose Entity/Sector is exactly `CSS` |
| Total Experience Center | *(landing card only)* | External report — **destination URL intentionally removed, pending from the business; button is disabled until provided** |

Plus: `admin-upload.html` (publish new weekly reports from PDF) and `report-viewer.html` (details page for uploads without extracted content).

**Tech stack: zero-build vanilla web.** Plain HTML + CSS + ES modules. No framework, no bundler, no transpilation. The only Node dependency (`@anthropic-ai/sdk`) is used exclusively by the optional serverless function `api/extract.js`.

## 2. Repository layout

```
index.html + home.js              Landing: 4 portal cards, global search, weekly archive
ministry-project-demand.html      P&D portal shells (variant via <body data-variant>)
css-project-demand.html
pd-report.js                      Shared P&D portal logic (filters, stats, sections, attention)
wgs-weekly-status.html + wgs-report.js
admin-upload.html + admin.js      Admin publishing + PDF extraction pipeline
report-viewer.html + viewer.js
common.js                         Shared helpers (escaping, theme, lang state, translators, scroll-spy)
report.css                        Shared styles for report/admin/viewer pages
reports-data.js                   ★ SINGLE SOURCE OF TRUTH: all report content + mapping rules
translations-ar.js                Arabic localization (keyed by exact English source strings)
api/extract.js                    Vercel serverless function → Claude API (PDF text → JSON)
vercel.json                       maxDuration for the function
package.json                      @anthropic-ai/sdk (for api/ only)
.github/workflows/pages.yml       GitHub Pages deployment workflow
uploads/                          (referenced, not committed) original PDF files — see §9
```

## 3. Core business rules — Project & Demand split

`reports-data.js` holds one combined P&D dataset. The two portals are **derived views**, produced at render time by `splitDemand(report, variant)`:

- `entity === "CSS"` → CSS portal.
- entity ∈ `MINISTRY_ENTITIES` (PMO, MOCA, WGS, GSOC, FCSC, Performance & Govt Excellence, Strategy & Innovation, Govt Service Sector, MBRCGI / Strategy & Innovation, Govt Development & Future Office, GEEO, Office of Secretary-General) → Ministry portal.
- Anything else (missing / unrecognized, e.g. `"—"`) → **flagged for review**, assigned to neither, surfaced in a red review panel on the Ministry portal.
- Every item lands in exactly one place; **no totals are hard-coded** — all stats, status distributions and entity counts are computed from the data at render time. Current baseline: 68 CSS + 46 ministry + 1 flagged = 115 items.

Keep this invariant when extending: **never** store per-portal copies of an item; change the source data or the mapping rules only.

## 4. Client-side storage schema (localStorage)

| Key | Shape | Meaning |
|---|---|---|
| `dtLang` | `"en" \| "ar"` | UI language, all pages |
| `dtAnthropicKey` | string | Admin's Claude API key for direct-from-browser extraction (§6, path 3) |
| `dtWeeks` | `UploadedWeek[]` | Reports published via the admin page |

```ts
type UploadedWeek = {
  id: number;                 // Date.now() at publish
  type: "wgs" | "demand" | "other";
  title: string;
  week: string;               // "Week of 20 July 2026" (derived from reportDate)
  date: string;               // "24 July 2026"
  status: string;             // one of the statusColors keys
  summary: string;
  pdfName: string;
  pdfData: string;            // data: URI of the original PDF (≤3MB) or ""
  data: object | null;        // extracted content (report-shaped) — null = "PDF only"
};
```

Consumption rules already implemented:
- A `demand` upload with `data` feeds **both** P&D portals via `?week=<id>` (split applied to the uploaded data too).
- Uploads **without** `data` appear in the archive/admin only and do **not** replace the portal cards.
- `report-viewer.html?id=<id>` shows uploads without extracted content.

> ⚠️ **Production blocker #1:** localStorage is per-browser. An upload by the admin is visible only in that browser. For production, replace the three `localStorage` touchpoints (`admin.js` persist/read, `common.js#storedWeeks`, viewer) with a small backend (e.g. a `weeks` table/collection + 3 endpoints: list, create, delete) keeping the exact `UploadedWeek` JSON shape — every consumer will then work unchanged. Store PDFs in object storage instead of data-URIs and drop the 3MB limit.

## 5. Localization

- UI strings: per-page `I18N` objects (`en` / `ar`) inside each page's JS.
- Data strings: `translations-ar.js` — `AR` map keyed by the **exact English source string**, plus `STATUS_AR`, `TYPE_AR`, and `arDate()` for dates. To add content, add the English string to `reports-data.js` and its translation to `translations-ar.js`; untranslated strings fall back to English.
- `dir`/`lang` are set on `<html>` at render; layout is RTL-safe via logical CSS properties.

## 6. AI extraction pipeline (PDF → site content)

The admin page reads the uploaded PDF to text **in the browser** (pdf-parse via CDN), then resolves extraction through three paths in order (`admin.js#extract`):

1. **Claude Design runtime** — `window.claude.complete`, only inside claude.ai/design previews.
2. **`POST api/extract`** (Vercel serverless) — body `{ "type": "wgs"|"demand", "text": string }` → `{ "data": <report JSON> }`. Errors: 400 bad payload, 405, 422 (refusal / too large / invalid JSON), 429, 502, 503 (key not configured). Model: `claude-opus-4-8` (override with `EXTRACT_MODEL` env var). Streaming is used internally to avoid HTTP timeouts; `vercel.json` sets `maxDuration: 300`.
3. **Direct from browser** — official Anthropic SDK (CDN ESM, `dangerouslyAllowBrowser`), using the key saved in the admin page's "Extraction settings" (localStorage). Intended for static hosting (GitHub Pages) where no server exists.

If all paths fail, the report still publishes as "PDF only — needs processing"; the **Process content** button re-runs extraction later. The two extraction prompt-schemas (WGS / demand) live in both `api/extract.js` (server) and `admin.js` (paths 1 & 3) — keep them in sync.

## 7. Deployment

### Option A — Vercel (recommended; full functionality)
1. Import the repo into Vercel (no build settings needed — static + `api/` auto-detected; `npm install` runs from `package.json`).
2. Project Settings → Environment Variables: `ANTHROPIC_API_KEY` = key from console.anthropic.com. Optional: `EXTRACT_MODEL`.
3. Redeploy. Server-side extraction is then active and no key is ever exposed to browsers.

### Option B — GitHub Pages (static demo; already wired)
1. Repo Settings → Pages → Source: **GitHub Actions** (one-time, needs repo admin — this is currently the only pending step).
2. Every push to the default branch triggers `.github/workflows/pages.yml` → `https://txlabtesting.github.io/-Executive-Report-Web-Platform/`.
3. No server: extraction works only via path 3 (admin saves a key in their browser).

### Option C — any static host / internal web server
Serve the repo root over HTTP(S) (ES modules don't work from `file://`). Same functional profile as Pages.

### Local development
```bash
python3 -m http.server 8000        # or any static server, repo root
# open http://localhost:8000/
# for the serverless function locally: npm i -g vercel && vercel dev
```

## 8. Production-hardening checklist (for IT)

- [ ] **Authentication for `admin-upload.html`** — currently unauthenticated by design (prototype). Put it behind SSO/reverse-proxy auth before production.
- [ ] **Shared persistence** — replace localStorage as described in §4 (blocker for multi-user).
- [ ] **Repo visibility** — the repository is currently public and the footer marks content "Confidential". Make it private / move to the org, and host on internal infrastructure if required.
- [ ] **Rate-limit / auth-gate `api/extract`** — it is currently callable by anyone who can reach the deployment (spends API tokens).
- [ ] Serve fonts locally if internet egress is restricted (currently Google Fonts + jsdelivr CDN for pdf-parse/SDK).
- [ ] Add the original PDFs to `uploads/` (see §9) or repoint the "Original PDF" links to document storage.
- [ ] Provide the Total Experience Center report URL → set it in `home.js` (`computePortals`, TEC entry: fill `href`, restore `external: true`); the card button re-enables automatically.

## 9. Known gaps / backlog

| Item | Where | Note |
|---|---|---|
| TEC portal link | `home.js` | Removed on purpose; business will supply the URL |
| `uploads/*.pdf` | repo | Original PDFs exist in the Claude Design project but binaries were not ported; links 404 until added |
| Admin auth | `admin-upload.html` | None (prototype) |
| Server persistence | all pages | localStorage only (§4) |
| GitHub Pages enablement | repo settings | One manual step (§7 Option B) |
| Legacy branch | `claude/almansaa-dc-html-3jtew9` | Stale (points at the first commit); safe to delete |

## 10. Verification done (all headless-Chromium tested)

- Split correctness: 68 CSS + 46 ministry + 1 flagged = 115, no duplicates; totals computed dynamically.
- All portals: search, combined-filters button, per-filter behavior, reset, expand/collapse, scroll-spy nav, week selector.
- EN↔AR toggle with RTL on every page, persisted across pages.
- Mobile (390px): stacked cards, collapsed filters, no horizontal scroll.
- Admin: publish (with/without extraction), validation errors, reprocess, delete; extraction tiers 2 & 3 (server function unit-tested; browser path integration-tested with stubs); uploaded demand week feeds both portals correctly split.

## 11. Source design

The UI implements the Claude Design project "# Executive Report Web Platform" (claude.ai/design, project `13e0dd3b-7f18-4ac4-81b6-1b02c8e80a76`) — `Home.dc.html`, `Project Demand Report.dc.html`, `WGS Weekly Report.dc.html`, `Admin Upload.dc.html`, `Report Viewer.dc.html`. Visual language: "Warm Paper" theme (CSS custom properties in `reports-data.js#themes`), Space Grotesk / IBM Plex Sans (+ Arabic).
