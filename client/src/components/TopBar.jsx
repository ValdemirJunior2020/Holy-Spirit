// client/src/components/TopBar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SocialIcons from "./SocialIcons.jsx";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function NavIcon({ to, label, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        cx(
          "grid h-11 w-11 place-items-center rounded-2xl ring-1 ring-[var(--ring)] shadow-soft transition",
          isActive ? "bg-white text-slate-900" : "bg-white/70 text-slate-700 hover:bg-white"
        )
      }
    >
      {children}
    </NavLink>
  );
}

function ExtIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-slate-700 ring-1 ring-[var(--ring)] shadow-soft hover:bg-white transition"
    >
      {children}
    </a>
  );
}

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 pt-4">
        <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] backdrop-blur p-3">
          {/* Row 1: Brand + (desktop nav icons) + (mobile hamburger) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setOpen(true)}
                className="md:hidden grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)] shadow-soft"
                aria-label="Open menu"
                title="Menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Brand */}
              <div className="grid h-11 w-11 place-items-center rounded-3xl bg-white ring-1 ring-[var(--ring)] shadow-soft">
                <span className="text-lg">🔥</span>
              </div>

              <div className="leading-tight">
                <div className="text-sm font-extrabold text-slate-900">Adventure With The Holy Spirit</div>
                <div className="text-xs font-semibold text-slate-500">Chat • Reviews • Encouragement</div>
              </div>
            </div>

            {/* Desktop: ICONS ONLY (no names) */}
            <div className="hidden md:flex items-center gap-2">
              <NavIcon to="/" label="Home">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavIcon>

              <NavIcon to="/chat" label="Chat">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-4.5A8 8 0 1 1 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavIcon>

              <NavIcon to="/reviews" label="Reviews">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 17.3 6.8 20l1-5.8-4.2-4.1 5.8-.8L12 4l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 17.3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </NavIcon>

              <ExtIcon href="https://www.youtube.com/@infojr83" label="YouTube">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M23 7.6a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.5A3 3 0 0 0 1 7.6 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.4a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.6Z"
                    fill="#FF0000"
                  />
                  <path d="M10 15.5V8.5L16 12l-6 3.5Z" fill="#ffffff" />
                </svg>
              </ExtIcon>
            </div>
          </div>

          {/* Row 2: Social icons */}
          <div className="mt-3">
            <SocialIcons />
          </div>

          {/* Mobile drawer */}
          {open ? (
            <div className="fixed inset-0 z-[60] md:hidden">
              <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} aria-hidden="true" />

              <div className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-2xl">
                <div className="p-4 border-b border-slate-200/70 flex items-center justify-between">
                  <div className="text-sm font-extrabold text-slate-900">Menu</div>
                  <button
                    className="grid h-10 w-10 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)]"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4">
                  {/* ICONS ONLY (no labels) */}
                  <div className="flex items-center gap-2">
                    <NavIcon to="/" label="Home" onClick={() => setOpen(false)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </NavIcon>

                    <NavIcon to="/chat" label="Chat" onClick={() => setOpen(false)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-4.5A8 8 0 1 1 21 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </NavIcon>

                    <NavIcon to="/reviews" label="Reviews" onClick={() => setOpen(false)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M12 17.3 6.8 20l1-5.8-4.2-4.1 5.8-.8L12 4l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 17.3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </NavIcon>

                    <ExtIcon href="https://www.youtube.com/@infojr83" label="YouTube">
                      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M23 7.6a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.5A3 3 0 0 0 1 7.6 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.4a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.6Z"
                          fill="#FF0000"
                        />
                        <path d="M10 15.5V8.5L16 12l-6 3.5Z" fill="#ffffff" />
                      </svg>
                    </ExtIcon>
                  </div>

                  <div className="mt-6">
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
