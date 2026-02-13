// client/src/components/BottomTabs.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Tab = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "flex-1 grid place-items-center py-2 rounded-2xl " +
      (isActive ? "bg-white text-slate-900" : "text-slate-500 hover:text-slate-800")
    }
  >
    <div className="text-lg">{icon}</div>
    <div className="text-[11px] font-bold">{label}</div>
  </NavLink>
);

export default function BottomTabs() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="rounded-3xl bg-white/80 backdrop-blur shadow-soft ring-1 ring-[var(--ring)] p-2 flex gap-2">
          <Tab to="/" icon="⌂" label="Home" />
          <Tab to="/partners" icon="⛪" label="Partners" />
          <Tab to="/gallery" icon="🖼️" label="Gallery" />
          <Tab to="/chat" icon="💬" label="Chat" />
          <Tab to="/profile" icon="👤" label="Me" />
        </div>
      </div>
    </div>
  );
}
