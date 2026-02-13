// client/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function PartnerCard({ src, fallbackText }) {
  return (
    <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-3 grid place-items-center">
      {src ? (
        <img
          src={src}
          alt="partner"
          className="h-16 w-16 rounded-2xl object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div className="h-16 w-16 rounded-2xl bg-white ring-1 ring-[var(--ring)] grid place-items-center text-xs font-extrabold text-slate-500">
          {fallbackText}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-6">
        <div className="text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">24/7 Prayer Companion</div>
          <div className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
            Guiding you to Jesus for support.
          </div>

          <Link
            to="/chat"
            className="inline-flex mt-5 items-center justify-center rounded-3xl px-6 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] hover:scale-[1.01] transition"
          >
            AI chat
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="text-lg font-extrabold text-slate-900">Our Church Partners</div>
        <Link to="/reviews" className="text-sm font-extrabold text-slate-600 hover:text-slate-900">
          See all →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Put your real logos in: client/public/partners/p1.png etc */}
        <PartnerCard src="/partners/p1.png" fallbackText="LOGO" />
        <PartnerCard src="/partners/p2.png" fallbackText="LOGO" />
        <PartnerCard src="/partners/p3.png" fallbackText="LOGO" />
      </div>

      <div className="rounded-3xl bg-white/70 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-sm font-extrabold text-slate-900">Tip</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">
          Tap <span className="font-extrabold">AI chat</span> to open the prayer chat. Use the bottom tabs to move fast on
          mobile.
        </div>
      </div>
    </div>
  );
}
