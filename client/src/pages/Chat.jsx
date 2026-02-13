// client/src/pages/Chat.jsx
import React, { useMemo, useRef, useState } from "react";
import { API_BASE } from "../utils/apiBase.js";

const TOPICS = [
  "Peace / Anxiety",
  "Depression / Sadness",
  "Family / Marriage",
  "Addiction / Temptation",
  "Healing / Sickness",
  "Finances / Work",
  "Forgiveness",
  "Salvation / Faith",
  "Other",
];

const LEVELS = [
  { v: 1, label: "1 — crisis" },
  { v: 2, label: "2 — heavy" },
  { v: 3, label: "3 — okay" },
  { v: 4, label: "4 — good" },
  { v: 5, label: "5 — great" },
];

function nowId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function Chat() {
  const [name, setName] = useState("junior");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [level, setLevel] = useState(3);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const [messages, setMessages] = useState(() => [
    {
      id: nowId(),
      role: "assistant",
      text: "Hi friend. Tell me what you’re going through, and I’ll pray with you and encourage you toward Jesus.",
    },
  ]);

  const listRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  }

  async function send() {
    if (!canSend) return;

    const userText = input.trim();
    setInput("");

    const userMsg = { id: nowId(), role: "user", text: userText };

    const history = [...messages, userMsg]
      .filter((m) => !m.loading)
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();

    const loadingId = nowId();
    setMessages((prev) => [
      ...prev,
      { id: loadingId, role: "assistant", text: "One moment… 🙏", loading: true },
    ]);
    scrollToBottom();

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          topic,
          level,
          message: userText,
          history,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId ? { ...m, loading: false, text: data.reply || "🙏" } : m
        )
      );
      scrollToBottom();
    } catch {
      // ✅ FIX: no error variable at all
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingId
            ? {
                ...m,
                loading: false,
                text: "Server not reachable right now. Try again in a moment. 🙏",
              }
            : m
        )
      );
      scrollToBottom();
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-sm font-extrabold text-slate-900">
          Encouragement + prayer + next step.
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            placeholder="Your name"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold ring-1 ring-[var(--ring)] focus:outline-none"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold ring-1 ring-[var(--ring)] focus:outline-none"
            >
              {LEVELS.map((l) => (
                <option key={l.v} value={l.v}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div ref={listRef} className="h-[52vh] overflow-y-auto pr-1 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={[
                "max-w-[85%] rounded-3xl px-4 py-3 text-sm font-semibold ring-1 ring-[var(--ring)]",
                m.role === "user" ? "ml-auto bg-white" : "mr-auto bg-white/70",
              ].join(" ")}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Type what you’re feeling..."
            className="flex-1 resize-none rounded-3xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
          />
          <button
            onClick={send}
            disabled={!canSend}
            className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60"
          >
            {busy ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
