// client/src/pages/Gallery.jsx
import React, { useMemo, useState } from "react";

const ITEMS = [
  { id: "g1", src: "/gallery/01.jpg", alt: "Prayer moment 1" },
  { id: "g2", src: "/gallery/02.jpg", alt: "Prayer moment 2" },
  { id: "g3", src: "/gallery/03.jpg", alt: "Street ministry 1" },
  { id: "g4", src: "/gallery/04.jpg", alt: "Street ministry 2" },
  { id: "g5", src: "/gallery/05.jpg", alt: "Worship 1" },
  { id: "g6", src: "/gallery/06.jpg", alt: "Worship 2" }
];

function Lightbox({ item, onClose, onPrev, onNext }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-slate-900/60"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white/90 backdrop-blur shadow-soft ring-1 ring-[var(--ring)] overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <div className="text-sm font-extrabold text-slate-900">Gallery</div>
            <button
              onClick={onClose}
              className="h-10 w-10 grid place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-[var(--ring)]"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="bg-white">
            <img src={item.src} alt={item.alt} className="w-full h-auto" />
          </div>
          <div className="p-3 flex gap-2">
            <button
              onClick={onPrev}
              className="flex-1 rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
            >
              ← Prev
            </button>
            <button
              onClick={onNext}
              className="flex-1 rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)]"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const items = useMemo(() => ITEMS, []);
  const [openId, setOpenId] = useState(null);

  const idx = items.findIndex((x) => x.id === openId);
  const current = idx >= 0 ? items[idx] : null;

  function prev() {
    if (idx < 0) return;
    const nextIdx = (idx - 1 + items.length) % items.length;
    setOpenId(items[nextIdx].id);
  }
  function next() {
    if (idx < 0) return;
    const nextIdx = (idx + 1) % items.length;
    setOpenId(items[nextIdx].id);
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-lg font-extrabold text-slate-900">Gallery</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">
          Add your photos to <span className="font-extrabold">client/public/gallery</span>.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setOpenId(it.id)}
            className="rounded-3xl overflow-hidden bg-white/80 shadow-soft ring-1 ring-[var(--ring)]"
            aria-label={`Open ${it.alt}`}
            title={it.alt}
          >
            <div className="aspect-square">
              <img src={it.src} alt={it.alt} className="w-full h-full object-cover" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        item={current}
        onClose={() => setOpenId(null)}
        onPrev={prev}
        onNext={next}
      />
    </div>
  );
}
