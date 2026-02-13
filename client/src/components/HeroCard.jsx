// client/src/components/HeroCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroCard() {
  const nav = useNavigate();

  return (
    <section className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-5">
      <div className="rounded-3xl bg-[var(--panel)] ring-1 ring-[var(--ring)] p-6 text-center">
        <div className="text-2xl font-extrabold text-slate-900">24/7 Prayer Companion</div>
        <div className="mt-2 text-sm font-semibold text-slate-600">Guiding you to Jesus for support.</div>

        <button
          onClick={() => nav("/chat")}
          className="mt-5 inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
        >
          AI chat
        </button>
      </div>
    </section>
  );
}
