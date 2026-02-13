// client/src/components/PartnersRow.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PartnersRow({ partners, onSelect }) {
  const nav = useNavigate();

  return (
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold text-slate-900">Our Church Partners</div>
        <button
          onClick={() => nav("/partners")}
          className="text-sm font-extrabold text-slate-500 hover:text-slate-800"
        >
          See all →
        </button>
      </div>

      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {partners.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="shrink-0 w-28 h-24 rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] grid place-items-center"
            aria-label={`Open ${p.name}`}
            title={p.name}
          >
            <div className="h-14 w-14 rounded-full bg-white ring-1 ring-[var(--ring)] shadow-soft grid place-items-center font-extrabold text-slate-700">
              {p.logoText || "⛪"}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
