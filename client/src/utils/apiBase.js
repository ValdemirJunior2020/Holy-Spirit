export const API_BASE = (
  import.meta.env.VITE_API_BASE ||
  "http://localhost:5050"
).replace(/\/+$/, "");

export async function postJSON(path, body, init = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });

  const text = await res.text().catch(() => "");
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // non-json response
  }

  if (!res.ok || data?.ok === false) {
    throw new Error(data?.error || `HTTP ${res.status}: ${text || res.statusText}`);
  }

  return data;
}
