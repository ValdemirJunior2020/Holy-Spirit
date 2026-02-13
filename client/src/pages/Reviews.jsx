// client/src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { addReview, listReviews } from "../utils/gsDb.js";

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=DSB9NYQC8C7CQ";

function Stars({ n }) {
  const count = Math.max(0, Math.min(5, Number(n || 0)));
  return (
    <div className="text-sm font-extrabold text-amber-600" aria-label={`${count} out of 5 stars`}>
      {"★★★★★".slice(0, count)}
      <span className="text-slate-300">{"★★★★★".slice(count)}</span>
=======
import { addReview, GAS_WEBAPP_URL, listReviews } from "../utils/gsDb.js";

const DONATE_URL = "https://www.paypal.com/donate/?hosted_button_id=DSB9NYQC8C7CQ";

function StarsRow({ value }) {
  const v = Math.max(0, Math.min(5, Number(value || 0)));
  return (
    <div className="flex gap-1" aria-label={`${v} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "text-yellow-500" : "text-slate-300"}>
          ★
        </span>
      ))}
>>>>>>> 30a787e (update reviews env + mobile css)
    </div>
  );
}

export default function Reviews() {
<<<<<<< HEAD
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [name, setName] = useState("Junior");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const canSend = useMemo(() => message.trim().length >= 5 && !saving, [message, saving]);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await listReviews(50);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(String(e?.message || e));
=======
  const [name, setName] = useState("Junior");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const shownCount = list.length;

  const avg = useMemo(() => {
    if (!list.length) return "";
    const n = list.reduce((a, r) => a + Number(r.rating || 0), 0) / list.length;
    return n.toFixed(1);
  }, [list]);

  async function refresh() {
    setLoading(true);
    setStatus("");
    try {
      const items = await listReviews(50);
      setList(items);
    } catch (e) {
      setList([]);
      setStatus(String(e?.message || e || "Could not load reviews."));
>>>>>>> 30a787e (update reviews env + mobile css)
    } finally {
      setLoading(false);
    }
  }

<<<<<<< HEAD
  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSend) return;

    setSaving(true);
    setErr("");

    try {
      await addReview({
        name: (name || "").trim().slice(0, 40) || "Anonymous",
        rating: Number(rating),
        message: message.trim(),
      });

      setMessage("");
      setRating(5);
      await load();
    } catch (e2) {
      setErr(String(e2?.message || e2));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* About */}
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-5">
        <div className="text-xl font-extrabold text-slate-900">Reviews & Mission</div>
        <div className="mt-2 text-sm font-semibold text-slate-700 leading-relaxed">
          <strong>Adventure with the Holy Spirit</strong> is not a physical building — it’s me, <strong>Junior</strong>,
          praying for people on the streets and preaching the Gospel. If we met today, thank you for letting me pray with
          you. 🙏
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={PAYPAL_DONATE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] hover:scale-[1.01] transition"
=======
  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");

    if (!String(message || "").trim()) {
      setStatus("Please write your review message.");
      return;
    }

    setBusy(true);
    try {
      await addReview({ name, rating, message });
      setMessage("");
      setRating(5);
      setStatus("Thank you! ✅ Your review was saved.");
      await refresh();
    } catch (e2) {
      setStatus(String(e2?.message || e2 || "Could not submit review."));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-3">
      {/* Mission */}
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-lg font-extrabold text-slate-900">Reviews &amp; Mission</div>

        <div className="mt-2 text-sm font-semibold text-slate-700 leading-relaxed">
          <span className="font-extrabold">Adventure with the Holy Spirit</span> is not a physical building — it’s me,
          <span className="font-extrabold"> Junior</span>, praying for people on the streets and preaching the Gospel.
          If we met today, thank you for letting me pray with you. 🙏
        </div>

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] active:scale-[0.99]"
>>>>>>> 30a787e (update reviews env + mobile css)
          >
            Support / Donate (PayPal)
          </a>

          <Link
            to="/partners"
<<<<<<< HEAD
            className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white/70 ring-1 ring-[var(--ring)] hover:bg-white transition"
=======
            className="inline-flex items-center justify-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] active:scale-[0.99]"
>>>>>>> 30a787e (update reviews env + mobile css)
          >
            See Partner Churches →
          </Link>
        </div>

        <div className="mt-3 text-xs font-semibold text-slate-500">
          Partner churches are listed with phone numbers and directions on the Partners page.
        </div>
      </div>

<<<<<<< HEAD
      {/* Leave a review */}
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-5">
        <div className="text-sm font-extrabold text-slate-900">Leave a Review</div>

        <form onSubmit={onSubmit} className="mt-3 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            placeholder="Your name (optional)"
            maxLength={40}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-extrabold ring-1 ring-[var(--ring)] focus:outline-none"
            >
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★ (4)</option>
              <option value={3}>★★★ (3)</option>
              <option value={2}>★★ (2)</option>
              <option value={1}>★ (1)</option>
            </select>

            <div className="sm:col-span-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
                placeholder="Share what happened, how you felt, or how prayer helped…"
                maxLength={2000}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Submit Review"}
=======
      {/* Form */}
      <form onSubmit={onSubmit} className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-sm font-extrabold text-slate-900">Leave a Review</div>

        <div className="mt-3 grid grid-cols-1 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-[var(--ring)] flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <StarsRow value={rating} />
                <span className="text-slate-500 font-bold">({rating})</span>
              </div>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="text-sm font-extrabold bg-transparent outline-none"
                aria-label="Rating"
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </div>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your review…"
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              disabled={busy}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60 active:scale-[0.99]"
            >
              {busy ? "Submitting..." : "Submit Review"}
>>>>>>> 30a787e (update reviews env + mobile css)
            </button>

            <button
              type="button"
<<<<<<< HEAD
              onClick={load}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white/70 ring-1 ring-[var(--ring)] hover:bg-white transition"
=======
              onClick={refresh}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] active:scale-[0.99]"
>>>>>>> 30a787e (update reviews env + mobile css)
            >
              Refresh
            </button>
          </div>

<<<<<<< HEAD
          {err ? <div className="text-sm font-bold text-red-600">{err}</div> : null}
        </form>
      </div>

      {/* List */}
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm font-extrabold text-slate-900">Latest Reviews</div>
          <div className="text-xs font-semibold text-slate-500">{items.length} shown</div>
        </div>

        <div className="mt-3">
          {loading ? (
            <div className="text-sm font-semibold text-slate-600">Loading…</div>
          ) : items.length === 0 ? (
            <div className="text-sm font-semibold text-slate-600">No reviews yet — be the first. 🙏</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((r, idx) => (
                <div key={`${r.createdAt || ""}_${idx}`} className="rounded-3xl bg-white/70 ring-1 ring-[var(--ring)] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-extrabold text-slate-900">{r.name || "Anonymous"}</div>
                    <Stars n={r.rating} />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-700 leading-relaxed">{r.message}</div>
                  <div className="mt-3 text-xs font-semibold text-slate-500">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
=======
          {status ? (
            <div className="text-sm font-extrabold text-red-600">{status}</div>
          ) : null}

          {/* Tiny debug (kept subtle) */}
          {!GAS_WEBAPP_URL ? (
            <div className="text-xs font-extrabold text-red-600">Missing VITE_GAS_WEBAPP_URL</div>
          ) : null}
        </div>
      </form>

      {/* List */}
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold text-slate-900">Latest Reviews</div>
          <div className="text-xs font-bold text-slate-500">
            {avg ? `avg ${avg}` : ""} {shownCount ? `• ${shownCount} shown` : "• 0 shown"}
          </div>
        </div>

        {loading ? (
          <div className="mt-3 text-sm font-semibold text-slate-600">Loading…</div>
        ) : list.length === 0 ? (
          <div className="mt-3 text-sm font-semibold text-slate-600">No reviews yet — be the first. 🙏</div>
        ) : (
          <div className="mt-3 space-y-3">
            {list.map((r, i) => (
              <div key={i} className="rounded-3xl bg-white p-4 ring-1 ring-[var(--ring)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-extrabold text-slate-900">{r.name || "Anonymous"}</div>
                  <StarsRow value={r.rating} />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700 whitespace-pre-wrap">{r.message}</div>
              </div>
            ))}
          </div>
        )}
>>>>>>> 30a787e (update reviews env + mobile css)
      </div>
    </div>
  );
}
