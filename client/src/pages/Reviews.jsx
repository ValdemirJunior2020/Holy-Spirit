// client/src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";
import { API_BASE } from "../utils/apiBase.js";

function Stars({ value }) {
  const v = Math.max(0, Math.min(5, Number(value || 0)));
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "text-yellow-500" : "text-slate-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const avg = useMemo(() => {
    if (!list.length) return 0;
    return (list.reduce((a, r) => a + Number(r.rating || 0), 0) / list.length).toFixed(1);
  }, [list]);

  async function fetchReviews() {
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/reviews?limit=50`);
      const data = await r.json();
      setList(data?.reviews || []);
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    if (!message.trim()) {
      setStatus("Please write a message.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`${API_BASE}/api/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, message }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || data?.ok === false) {
        setStatus(data?.error || "Could not submit review.");
      } else {
        setStatus("Thank you! ✅ Your review was saved.");
        setMessage("");
        setRating(5);
        await fetchReviews();
      }
    } catch {
      setStatus("Server not reachable right now. Try again in a moment. 🙏");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Reviews</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">
              Share what God has done 🙏
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500">Average</div>
            <div className="text-xl font-extrabold text-slate-900">{avg || "—"}</div>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name (optional)"
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
        />

        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-[var(--ring)]">
          <div className="text-sm font-bold text-slate-700">Rating</div>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="text-sm font-extrabold bg-transparent outline-none"
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your review…"
          rows={4}
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
        />

        <button
          disabled={busy}
          className="w-full rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60"
        >
          {busy ? "Submitting..." : "Submit Review"}
        </button>

        {status ? (
          <div className="rounded-2xl bg-[var(--panel)] px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[var(--ring)]">
            {status}
          </div>
        ) : null}
      </form>

      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-sm font-extrabold text-slate-900">Latest</div>

        {loading ? (
          <div className="mt-3 text-sm font-semibold text-slate-600">Loading…</div>
        ) : list.length === 0 ? (
          <div className="mt-3 text-sm font-semibold text-slate-600">No reviews yet.</div>
        ) : (
          <div className="mt-3 space-y-3">
            {list.map((r, i) => (
              <div key={i} className="rounded-3xl bg-white p-4 ring-1 ring-[var(--ring)]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-slate-900">{r.name || "Anonymous"}</div>
                  <Stars value={r.rating} />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700 whitespace-pre-wrap">
                  {r.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
