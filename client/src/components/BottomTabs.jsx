// client/src/components/BottomTabs.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Image as ImageIcon, MessageCircle } from "lucide-react";

function TabIcon({ to, label, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      title={label}
      className={({ isActive }) =>
        [
          "flex-1 h-12 grid place-items-center rounded-2xl transition active:scale-[0.98]",
          isActive ? "bg-white text-slate-900" : "text-slate-500 hover:text-slate-900",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function BottomTabs() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-5xl px-4 pb-4">
        <div className="rounded-3xl bg-white/80 backdrop-blur shadow-soft ring-1 ring-[var(--ring)] p-2 flex gap-2">
          <TabIcon to="/" end label="Home">
            <Home size={20} />
          </TabIcon>

          <TabIcon to="/gallery" label="Gallery">
            <ImageIcon size={20} />
          </TabIcon>

          <TabIcon to="/chat" label="Chat">
            <MessageCircle size={20} />
          </TabIcon>
        </div>
      </div>
    </div>
  );
}
