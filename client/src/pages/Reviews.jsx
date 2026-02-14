// client/src/pages/Reviews.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { addReview, listReviews } from "../utils/gsDb.js";

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
    </div>
  );
}

export default function Reviews() {
  const [name, setName] = useState(""); // Changed default to empty for cleaner UX
  const [phone, setPhone] = useState(""); // ✅ NEW: Phone State
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
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("");

    const msg = String(message || "").trim();
    if (!msg) {
      setStatus("Please write your review message.");
      return;
    }

    setBusy(true);
    try {
      // ✅ NEW: Sending 'phone' to the backend
      await addReview({ name, phone, rating, message: msg });
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
          >
            Support / Donate (PayPal)
          </a>

          <Link
            to="/partners"
            className="inline-flex items-center justify-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] active:scale-[0.99]"
          >
            See Partner Churches →
          </Link>
        </div>

        <div className="mt-3 text-xs font-semibold text-slate-500">
          Partner churches are listed with phone numbers and directions on the Partners page.
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-sm font-extrabold text-slate-900">Leave a Review</div>

        <div className="mt-3 grid grid-cols-1 gap-3">
          
          {/* ✅ NEW: Name and Phone side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (optional)"
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone "
              type="tel"
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
            />
          </div>

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
            </button>

            <button
              type="button"
              onClick={refresh}
              className="rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] active:scale-[0.99]"
            >
              Refresh
            </button>
          </div>

          {status ? <div className="text-sm font-extrabold text-red-600">{status}</div> : null}
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
      </div>
    </div>
  );
}