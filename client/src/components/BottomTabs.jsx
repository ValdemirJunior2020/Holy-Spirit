// client/src/components/BottomNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Tab({ to, label, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-extrabold transition",
          isActive ? "bg-white text-slate-900 ring-1 ring-[var(--ring)]" : "text-slate-500 hover:text-slate-900"
        )
      }
    >
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 ring-1 ring-[var(--ring)]">
        {children}
      </div>
      <div>{label}</div>
    </NavLink>
  );
}

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-5xl px-4 pb-4">
        <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] backdrop-blur p-2">
          <div className="grid grid-cols-3 gap-2">
            <Tab to="/" label="Home">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Tab>

            <Tab to="/chat" label="Chat">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-4.5A8 8 0 1 1 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Tab>

            <Tab to="/reviews" label="Reviews">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 17.3 6.8 20l1-5.8-4.2-4.1 5.8-.8L12 4l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 17.3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Tab>
          </div>
        </div>
      </div>
    </nav>
  );
}
