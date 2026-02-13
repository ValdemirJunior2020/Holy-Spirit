// client/src/utils/apiBase.js

const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "") || "http://localhost:5050";

export { API_BASE };

export async function sendChat(payload) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}
