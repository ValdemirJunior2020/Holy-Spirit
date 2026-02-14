// server/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const APPS_SCRIPT_URL = process.env.GOOGLE_SHEET_URL; // Make sure this is in your .env

app.use(
  cors({
    origin: [CLIENT_ORIGIN, "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ==========================================
// 1. NEW: Get Visitor Stats (for the Counter)
// ==========================================
app.get("/api/stats", async (req, res) => {
  try {
    if (!APPS_SCRIPT_URL) return res.json({ count: 0 });
    
    // We call the Google Script with ?action=stats
    const response = await fetch(`${APPS_SCRIPT_URL}?action=stats`);
    const data = await response.json();
    
    // The script returns { stats: { totalViews: 123 } }
    const count = data?.stats?.totalViews || 0;
    res.json({ ok: true, count });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.json({ ok: false, count: 0 });
  }
});

// ==========================================
// 2. Existing: Track Visit (POST)
// ==========================================
app.post("/api/visit", async (req, res) => {
  try {
    if (!APPS_SCRIPT_URL) return res.json({ ok: true });
    
    const { page } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const ua = req.headers["user-agent"] || "unknown";
    const visitorId = ip.replace(/[^0-9a-zA-Z]/g, "").slice(0, 12);

    // Fire and forget (don't await) to keep it fast
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "pageview",
        page: page || "/",
        visitorId,
        ua,
        ip
      }),
    }).catch(e => console.error("Sheet log error", e));

    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false });
  }
});

// ==========================================
// 3. Existing: Chat Logic
// ==========================================
app.post("/api/chat", async (req, res) => {
  try {
    const { name, topic, level, message, history } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ ok: false, error: "Missing API Key" });

    // Track chat usage as a 'visit' too
    if (APPS_SCRIPT_URL) {
      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "pageview", 
          page: "chat_interaction", 
          visitorId: "chat_user", 
          ua: "backend" 
        }),
      }).catch(() => {});
    }

    const client = new OpenAI({ apiKey });
    const system = `You are a Christian prayer companion. Tone: warm, professional, empathetic. Guide toward Jesus. Return plain text.`;
    
    const msgs = [
      { role: "system", content: system },
      ...(Array.isArray(history) ? history : []),
      { role: "user", content: `Name: ${name}\nTopic: ${topic}\nMessage: ${message}` },
    ];

    const out = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: msgs,
      temperature: 0.7,
      max_tokens: 300,
    });

    res.json({ ok: true, reply: out.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () => console.log(`API running on :${PORT}`));