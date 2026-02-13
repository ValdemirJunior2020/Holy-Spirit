// client/src/pages/Profile.jsx
import React, { useState } from "react";

const API_BASE = import.meta.env.PROD ? "" : "http://localhost:5050";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function save(e) {
    e.preventDefault();
    setMsg("");
    if (!email.trim()) {
      setMsg("Email is required.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/profile/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        setMsg(data?.error || "Could not save profile.");
      } else {
        setMsg(`Saved ✅ (${data.action || "ok"})`);
      }
    } catch {
      setMsg("Server not reachable. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4">
        <div className="text-lg font-extrabold text-slate-900">Profile</div>
        <div className="mt-1 text-sm font-semibold text-slate-600">
          Save your info so we can support you and connect you with prayer + church partners.
        </div>
      </div>

      <form onSubmit={save} className="rounded-3xl bg-white/80 shadow-soft ring-1 ring-[var(--ring)] p-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (required)"
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--ring)] focus:outline-none"
        />

        <button
          disabled={busy}
          className="w-full rounded-3xl px-4 py-3 text-sm font-extrabold bg-white shadow-soft ring-1 ring-[var(--ring)] disabled:opacity-60"
        >
          {busy ? "Saving..." : "Save Profile"}
        </button>

        {msg ? (
          <div className="rounded-2xl bg-[var(--panel)] px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-[var(--ring)]">
            {msg}
          </div>
        ) : null}
      </form>
    </div>
  );
}
