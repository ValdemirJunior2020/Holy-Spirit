// server/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(
  cors({
    origin: [CLIENT_ORIGIN],
    methods: ["GET", "POST"],
  })
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_GUIDE = `
You are "Adventure with the Holy Spirit" — a Christian support chat that gently guides people to Jesus.
Tone: warm, calm, hopeful, simple language. Not preachy.

Rules:
- Offer a short prayer (2-5 lines) and one Bible verse reference when appropriate.
- Ask 1 gentle follow-up question when helpful.
- Never promise guaranteed miracles/healing.
- Not medical/legal/financial advice. Encourage professional help when needed.
- If self-harm is mentioned, urge immediate local emergency help and supportive encouragement + prayer.

Keep responses short and practical.
`;

function safeText(v) {
  return String(v ?? "").trim();
}

app.get("/health", (req, res) => res.json({ ok: true }));

/* =========================
   AI Chat
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    const message = safeText(req.body?.message).slice(0, 4000);
    const name = safeText(req.body?.name).slice(0, 200);
    const topic = safeText(req.body?.topic).slice(0, 200);
    const feeling = safeText(req.body?.feeling).slice(0, 200);

    if (!message) return res.status(400).json({ error: "Missing message" });
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

    const context = [
      name ? `Name: ${name}` : null,
      topic ? `Topic: ${topic}` : null,
      feeling ? `Feeling: ${feeling}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const input = [
      { role: "system", content: SYSTEM_GUIDE },
      { role: "user", content: context ? `${context}\n\nUser message:\n${message}` : message },
    ];

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input,
      temperature: 0.7,
    });

    res.json({ text: (response.output_text || "").trim() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   Google Apps Script URL
========================= */
function scriptUrl() {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!url) throw new Error("Missing GOOGLE_APPS_SCRIPT_URL in server/.env");
  return url;
}

/* =========================
   Profiles -> Google Sheet via Apps Script
========================= */
app.post("/api/profile/upsert", async (req, res) => {
  try {
    const name = safeText(req.body?.name).slice(0, 200);
    const email = safeText(req.body?.email).slice(0, 200).toLowerCase();
    const phone = safeText(req.body?.phone).slice(0, 200);

    if (!email) return res.status(400).json({ ok: false, error: "Email is required" });

    const r = await fetch(scriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "profile_upsert", name, email, phone }),
    });

    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

/* =========================
   Reviews
========================= */
app.post("/api/reviews/add", async (req, res) => {
  try {
    const name = safeText(req.body?.name).slice(0, 200);
    const rating = Number(req.body?.rating || 0);
    const message = safeText(req.body?.message).slice(0, 2000);

    const r = await fetch(scriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "review_add", name, rating, message }),
    });

    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(100, Number(req.query.limit || 50)));
    const r = await fetch(`${scriptUrl()}?action=reviews&limit=${limit}`);
    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

/* =========================
   Page Views / Stats
========================= */
app.post("/api/pageview", async (req, res) => {
  try {
    const page = safeText(req.body?.page || "/").slice(0, 200);
    const visitorId = safeText(req.body?.visitorId || "").slice(0, 120);
    const ua = safeText(req.body?.ua || "").slice(0, 200);

    const r = await fetch(scriptUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "pageview", page, visitorId, ua }),
    });

    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    const days = Math.max(1, Math.min(365, Number(req.query.days || 30)));
    const r = await fetch(`${scriptUrl()}?action=stats&days=${days}`);
    const data = await r.json().catch(() => ({}));
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

/* =========================
   Start
========================= */
const PORT = Number(process.env.PORT || 5050);
app.listen(PORT, "0.0.0.0", () => console.log(`API running on :${PORT}`));
