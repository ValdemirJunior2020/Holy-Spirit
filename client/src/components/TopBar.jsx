// client/src/components/TopNav.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SocialIcons from "./SocialIcons.jsx";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function LinkBtn({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cx(
          "rounded-2xl px-3 py-2 text-sm font-extrabold ring-1 ring-[var(--ring)] transition",
          isActive ? "bg-white text-slate-900" : "bg-white/70 text-slate-700 hover:bg-white"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 pt-4">
        <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] backdrop-blur p-3">
          {/* MOBILE FIRST TOP BAR */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)] shadow-soft"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden sm:grid h-11 w-11 place-items-center rounded-3xl bg-white ring-1 ring-[var(--ring)] shadow-soft">
                <span className="text-lg">🔥</span>
              </div>
              <div className="leading-tight text-center md:text-left">
                <div className="text-sm font-extrabold text-slate-900">Adventure With The Holy Spirit</div>
                <div className="text-xs font-semibold text-slate-500">Chat • Reviews • Encouragement</div>
              </div>
            </div>

            <button
              className="md:hidden grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)] shadow-soft"
              aria-label="Notifications"
              onClick={() => alert("Notifications coming soon")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22a2.4 2.4 0 0 0 2.4-2.4H9.6A2.4 2.4 0 0 0 12 22Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M18 16V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-2">
              <LinkBtn to="/">Home</LinkBtn>
              <LinkBtn to="/chat">Chat</LinkBtn>
              <LinkBtn to="/reviews">Reviews</LinkBtn>
              <a
                href="https://www.youtube.com/@infojr83"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl px-3 py-2 text-sm font-extrabold bg-white/70 text-slate-700 ring-1 ring-[var(--ring)] hover:bg-white transition"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Desktop social icons row */}
          <div className="hidden md:block mt-3">
            <SocialIcons />
          </div>

          {/* MOBILE DRAWER */}
          {open ? (
            <div className="md:hidden fixed inset-0 z-[60]">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-2xl">
                <div className="p-4 border-b border-slate-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-3xl bg-white ring-1 ring-[var(--ring)] shadow-soft">
                      <span className="text-lg">🔥</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-extrabold text-slate-900">Adventure</div>
                      <div className="text-xs font-semibold text-slate-500">Menu</div>
                    </div>
                  </div>

                  <button
                    className="grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)]"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <LinkBtn to="/" onClick={() => setOpen(false)}>
                    Home
                  </LinkBtn>
                  <LinkBtn to="/chat" onClick={() => setOpen(false)}>
                    Chat
                  </LinkBtn>
                  <LinkBtn to="/reviews" onClick={() => setOpen(false)}>
                    Reviews
                  </LinkBtn>

                  <a
                    href="https://www.youtube.com/@infojr83"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl px-3 py-2 text-sm font-extrabold bg-white/70 text-slate-700 ring-1 ring-[var(--ring)] hover:bg-white transition"
                    onClick={() => setOpen(false)}
                  >
                    YouTube
                  </a>

                  <div className="pt-3">
                    <div className="text-xs font-extrabold text-slate-500 mb-2">Social</div>
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
