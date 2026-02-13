// client/src/pages/PrayerWall.jsx
import React from "react";

export default function PrayerWall() {
  return (
    <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
      <div className="text-lg font-extrabold text-slate-900">Prayer Wall</div>
      <div className="mt-1 text-sm font-semibold text-slate-600">
        Next: save requests + “I prayed” counter (database).
      </div>
    </div>
  );
}
