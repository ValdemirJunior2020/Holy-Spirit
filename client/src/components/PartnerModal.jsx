// client/src/components/PartnerModal.jsx
import React from "react";

export default function PartnerModal({ partner, onClose }) {
  if (!partner) return null;

  const donate = partner.donateUrl || "";

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-slate-900/25" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-3xl bg-white/90 backdrop-blur shadow-soft ring-1 ring-[var(--ring)] p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-extrabold text-slate-900">{partner.name}</div>
              <div className="mt-1 text-sm font-semibold text-slate-600">{partner.city}</div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 grid place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-[var(--ring)]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div className="rounded-2xl bg-[var(--panel)] px-4 py-3 ring-1 ring-[var(--ring)]">
              <div className="text-xs font-extrabold text-slate-500">Address</div>
              <div className="mt-1 font-semibold">{partner.address}</div>
            </div>

            <div className="rounded-2xl bg-[var(--panel)] px-4 py-3 ring-1 ring-[var(--ring)]">
              <div className="text-xs font-extrabold text-slate-500">Contact</div>
              <div className="mt-1 font-semibold">{partner.phone}</div>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
            >
              📍 Open in Maps
            </a>

            <a
              href={`tel:${String(partner.phone || "").replace(/[^\d+]/g, "")}`}
              className="block text-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
            >
              📞 Call
            </a>

            {donate ? (
              <a
                href={donate}
                target="_blank"
                rel="noreferrer"
                className="block text-center rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
              >
                ❤️ Donate to this Church
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
