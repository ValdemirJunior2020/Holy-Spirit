// client/src/components/TopBar.jsx
import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu.jsx";
import SocialIcons from "./SocialIcons.jsx";

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="backdrop-blur bg-white/65 border-b border-slate-200/50">
          <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between gap-2">
            <button
              onClick={() => setOpen(true)}
              className="h-11 w-11 grid place-items-center rounded-2xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)]"
              aria-label="Open menu"
            >
              ☰
            </button>

            <div className="text-center flex-1">
              <div className="text-sm font-extrabold text-slate-900">Adventure with the Holy Spirit</div>
              <div className="text-xs font-semibold text-slate-500">24/7 Prayer Companion</div>
            </div>

            <div className="hidden sm:block">
              <SocialIcons />
            </div>

            <button
              className="sm:hidden h-11 w-11 grid place-items-center rounded-2xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)]"
              aria-label="Notifications"
              onClick={() => alert("Notifications coming soon 🙏")}
            >
              🔔
            </button>
          </div>

          {/* Mobile social row */}
          <div className="sm:hidden mx-auto max-w-md px-4 pb-3">
            <SocialIcons />
          </div>
        </div>
      </header>

      <HamburgerMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
