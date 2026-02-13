// client/src/components/TopBar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, MessageCircle, Star } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu.jsx";
import SocialIcons from "./SocialIcons.jsx";

function IconLink({ to, label, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          "h-11 w-11 grid place-items-center rounded-2xl shadow-soft ring-1 ring-[var(--ring)] transition active:scale-[0.98]",
          isActive ? "bg-white text-slate-900" : "bg-white/80 text-slate-600 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="backdrop-blur bg-white/65 border-b border-slate-200/50">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setOpen(true)}
                className="h-11 w-11 grid place-items-center rounded-2xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] transition active:scale-[0.98]"
                aria-label="Open menu"
                title="Menu"
              >
                ☰
              </button>

              <div className="h-11 w-11 grid place-items-center rounded-2xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)]">
                🔥
              </div>

              <div className="hidden sm:block min-w-0">
                <div className="text-sm font-extrabold text-slate-900 truncate">
                  Adventure With The Holy Spirit
                </div>
                <div className="text-xs font-semibold text-slate-500 truncate">
                  Chat • Reviews • Encouragement
                </div>
              </div>
            </div>

            {/* 3 ICONS ONLY (rest is in hamburger) */}
            <div className="flex items-center gap-2">
              <IconLink to="/" end label="Home">
                <Home size={18} />
              </IconLink>

              <IconLink to="/chat" label="Chat">
                <MessageCircle size={18} />
              </IconLink>

              <IconLink to="/reviews" label="Reviews">
                <Star size={18} />
              </IconLink>
            </div>
          </div>

          {/* Social icons row */}
          <div className="mx-auto max-w-5xl px-4 pb-3">
            <SocialIcons />
          </div>
        </div>
      </header>

      <HamburgerMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
