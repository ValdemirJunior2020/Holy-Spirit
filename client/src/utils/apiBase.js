export const API_BASE =
  (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "") ||
  (window.location.hostname === "localhost" ? "http://localhost:5050" : "");

// optional helper (use it or delete it)
export async function sendChat(payload) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await res.text();

  let data = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON from server: ${raw.slice(0, 180)}`);
    }
  }

  if (!res.ok) {
    throw new Error(data?.error || raw || `HTTP ${res.status}`);
  }

  return data;
}
