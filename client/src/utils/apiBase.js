// client/src/utils/apiBase.js
const rawBase = (import.meta.env.VITE_API_BASE || "").trim();
export const API_BASE = rawBase.replace(/\/+$/, "");

function joinUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  // If VITE_API_BASE is empty, we stay on same-origin (Netlify redirects /api/* to Render)
  return API_BASE ? `${API_BASE}${p}` : p;
}

async function toJson(res) {
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || "Invalid JSON" };
  }
  if (!res.ok) {
    throw new Error(data?.error || data?.message || `${res.status} ${res.statusText}`);
  }
  return data;
}

export async function postJSON(path, body) {
  const res = await fetch(joinUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body ?? {}),
  });
  return toJson(res);
}

export async function getJSON(path) {
  const res = await fetch(joinUrl(path));
  return toJson(res);
}
