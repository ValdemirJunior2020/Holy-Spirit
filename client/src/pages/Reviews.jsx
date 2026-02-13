// client/src/pages/Reviews.jsx
import React from "react";

const REVIEWS = [
  { name: "Ace Martinez", stars: 5, text: "Amazing place have to check it out you will not be disappointed" },
  { name: "Nancy Rios", stars: 5, text: "My FAVORITE PLACE to Worship, Praise and give GOD ALL THE GLORY." },
  { name: "Rebecca Baum", stars: 5, text: "A fantastic church the Holy Spirit was there I am blessed by going there." },
];

export default function ReviewsPage() {
  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-5">
        <div className="text-xl font-extrabold text-slate-900">Reviews</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">Real words from people impacted.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {REVIEWS.map((r) => (
          <div key={r.name} className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm font-extrabold text-slate-900">{r.name}</div>
              <div className="text-sm font-extrabold text-amber-600">
                {"★★★★★".slice(0, r.stars)}
              </div>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700 leading-relaxed">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
