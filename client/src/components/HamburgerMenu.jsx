// client/src/components/HamburgerMenu.jsx
import React, { useState } from "react"; // 1. Import useState
import { NavLink } from "react-router-dom";
import DonateModal from "./DonateModal.jsx"; // 2. Import the new Modal

function Item({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        "block rounded-2xl px-4 py-3 text-sm font-extrabold shadow-soft ring-1 ring-[var(--ring)] " +
        (isActive ? "bg-white text-slate-900" : "bg-white/80 text-slate-700 hover:bg-white")
      }
    >
      {children}
    </NavLink>
  );
}

export default function HamburgerMenu({ open, onClose }) {
  const [showDonate, setShowDonate] = useState(false); // 3. State for modal

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60]">
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-slate-900/30"
          onClick={onClose}
        />
        <div className="absolute inset-0 flex justify-center items-start pt-16 px-4">
          <div className="w-full max-w-5xl sm:max-w-md rounded-3xl bg-white/90 backdrop-blur shadow-soft ring-1 ring-[var(--ring)] p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold text-slate-900">Menu</div>
              <button
                onClick={onClose}
                className="h-10 w-10 grid place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-[var(--ring)]"
                aria-label="Close menu"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <Item to="/partners" onClick={onClose}>⛪ Church Partners</Item>
              <Item to="/gallery" onClick={onClose}>🖼️ Gallery</Item>
              <Item to="/prayer-wall" onClick={onClose}>🙏 Prayer Wall</Item>
              <Item to="/profile" onClick={onClose}>👤 Profile</Item>

              {/* 4. Changed from <a> to <button> to trigger modal */}
              <button
                onClick={() => setShowDonate(true)}
                className="block w-full rounded-2xl px-4 py-3 text-sm font-extrabold text-center bg-white shadow-soft ring-1 ring-[var(--ring)] text-slate-900"
              >
                ❤️ Support / Donate
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--panel2)] p-4 ring-1 ring-[var(--ring)] text-xs text-slate-600">
              <div className="font-extrabold text-slate-800">Quick note</div>
              <div className="mt-1">
                This is spiritual encouragement. If you’re in danger or need urgent help, call local emergency services.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Render the Modal if state is true */}
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
    </>
  );
}