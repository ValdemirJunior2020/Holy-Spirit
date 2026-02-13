// server/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: [CLIENT_ORIGIN, "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", (req, res) => res.json({ ok: true }));

// === Reviews (placeholder routes if you already have them, keep yours) ===
app.get("/api/reviews", async (req, res) => {
  res.json({ ok: true, reviews: [] });
});
app.post("/api/reviews/add", async (req, res) => {
  res.json({ ok: true });
});

// === AI Chat ===
app.post("/api/chat", async (req, res) => {
  try {
    const { name, topic, level, message, history } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ ok: false, error: "Missing OPENAI_API_KEY on server." });

    const client = new OpenAI({ apiKey });

    const system = `
You are a Christian prayer companion.
Tone: warm, professional, empathetic.
Always guide toward Jesus with scripture-based encouragement.
Do not promise miracles; offer prayer, practical next step, and hope.
If user is in danger/self-harm: urge immediate local emergency help.
Return plain text only.
`.trim();

    const msgs = [
      { role: "system", content: system },
      ...(Array.isArray(history) ? history : []),
      {
        role: "user",
        content: `Name: ${name || "Friend"}\nTopic: ${topic || "Other"}\nLevel: ${level || 3}\nMessage: ${message || ""}`,
      },
    ];

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

    const out = await client.chat.completions.create({
      model,
      messages: msgs,
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = out?.choices?.[0]?.message?.content?.trim() || "I’m here with you. 🙏";
    res.json({ ok: true, reply });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e?.message || e) });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, "0.0.0.0", () => console.log(`API running on :${PORT}`));
