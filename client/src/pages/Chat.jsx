// client/src/pages/Chat.jsx
import React, { useState } from "react";

const API_BASE = import.meta.env.PROD ? "" : "http://localhost:5050";

export default function Chat() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("peace");
  const [feeling, setFeeling] = useState("3");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Hi friend. Tell me what you’re going through, and I’ll pray with you and encourage you toward Jesus." },
  ]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);

    const loadingIndex = msgs.length + 1;
    setMsgs((m) => [...m, { role: "assistant", text: "🙏 Listening…", loading: true }]);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, name, topic, feeling }),
      });
      const data = await res.json();
      const reply = (data?.text || "I’m here with you. What’s the biggest pressure right now?").trim();

      setMsgs((m) => m.map((x, i) => (i === loadingIndex ? { role: "assistant", text: reply } : x)));
    } catch {
      setMsgs((m) =>
        m.map((x, i) => (i === loadingIndex ? { role: "assistant", text: "Server not reachable right now. Try again in a moment. 🙏" } : x))
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-lg font-extrabold text-slate-900">AI Chat</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">Encouragement + prayer + next step.</div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="col-span-2 rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
          />
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
          >
            <option value="peace">Peace / Anxiety</option>
            <option value="healing">Healing</option>
            <option value="family">Family</option>
            <option value="finances">Finances</option>
            <option value="addiction">Addiction</option>
            <option value="salvation">Knowing Jesus</option>
            <option value="other">Other</option>
          </select>
          <select
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
          >
            <option value="1">1 — very low</option>
            <option value="2">2</option>
            <option value="3">3 — okay</option>
            <option value="4">4</option>
            <option value="5">5 — strong</option>
          </select>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] overflow-hidden">
        <div className="h-[54vh] overflow-y-auto p-4 space-y-3">
          {msgs.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-relaxed ring-1 ring-[var(--ring)] shadow-soft ${
                  m.role === "user" ? "bg-white text-slate-900" : "bg-[var(--panel)] text-slate-800"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200/60">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
              placeholder="Type what you’re feeling…"
              className="flex-1 rounded-3xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            />
            <button
              onClick={send}
              disabled={busy}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
