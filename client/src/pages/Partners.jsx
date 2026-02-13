// client/src/pages/Partners.jsx
import React, { useState } from "react";
import { PARTNERS } from "../data/partners.js";
import PartnerModal from "../components/PartnerModal.jsx";

export default function Partners() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-lg font-extrabold text-slate-900">Church Partners</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">
          Tap a church to view address + contact.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {PARTNERS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4 text-left"
          >
            <div className="h-12 w-12 rounded-full bg-white ring-1 ring-[var(--ring)] shadow-soft grid place-items-center font-extrabold text-slate-700">
              {p.logoText || "⛪"}
            </div>
            <div className="mt-3 text-sm font-extrabold text-slate-900">{p.name}</div>
            <div className="mt-1 text-xs font-semibold text-slate-600">{p.city}</div>
          </button>
        ))}
      </div>

      <PartnerModal partner={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
