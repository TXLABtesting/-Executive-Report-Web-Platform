// Serverless extraction endpoint (Vercel).
// Receives the text extracted from an uploaded weekly-report PDF and converts
// it into the site's structured content model via the Claude API. The API key
// stays server-side (ANTHROPIC_API_KEY project env var) — it is never exposed
// to the browser. The report-type schemas live here so the endpoint can only
// be used for this extraction task.

import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.EXTRACT_MODEL || "claude-opus-4-8";

const SYSTEM =
  "You convert weekly status report text extracted from a PDF into strict JSON. " +
  "Output ONLY valid JSON — no markdown fences, no commentary. Preserve section names, " +
  "project names, terminology and data exactly as written in the source. Never invent content.";

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

const SCHEMAS = { demand: SCHEMA_DEMAND, wgs: SCHEMA_WGS };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: "Extraction service is not configured (ANTHROPIC_API_KEY missing)" });
    return;
  }
  const { type, text } = req.body || {};
  const schema = SCHEMAS[type];
  if (!schema || typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "Expected { type: 'wgs' | 'demand', text: string }" });
    return;
  }

  try {
    const client = new Anthropic();
    // Stream to avoid HTTP timeouts on large extractions, then take the final message.
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 64000,
      system: SYSTEM,
      messages: [{ role: "user", content: schema + "\n\n---- REPORT TEXT ----\n" + text }],
    });
    const message = await stream.finalMessage();

    if (message.stop_reason === "refusal") {
      res.status(422).json({ error: "The model declined to process this document" });
      return;
    }
    if (message.stop_reason === "max_tokens") {
      res.status(422).json({ error: "The report is too large to extract in one pass" });
      return;
    }

    const out = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");
    const data = JSON.parse(out.trim().replace(/^```(json)?\s*/i, "").replace(/```\s*$/, ""));
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      res.status(429).json({ error: "Extraction service is rate-limited — try again shortly" });
    } else if (err instanceof Anthropic.APIError) {
      res.status(502).json({ error: `Claude API error (${err.status}): ${err.message}` });
    } else if (err instanceof SyntaxError) {
      res.status(422).json({ error: "The model returned invalid JSON — try processing again" });
    } else {
      res.status(500).json({ error: (err && err.message) || "Extraction failed" });
    }
  }
}
