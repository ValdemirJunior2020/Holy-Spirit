// client/src/utils/gsDb.js
const FALLBACK_GAS_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbwn4UYpP6O5_t1V0oATKFTHom3xYtH7aaUFVpdnPGbJk-Ap1lxP5wdMZWIE1CF8AB3H/exec";

export const GAS_WEBAPP_URL =
  String(import.meta.env.VITE_GAS_WEBAPP_URL || "")
    .trim()
    .replace(/\/+$/, "") || FALLBACK_GAS_WEBAPP_URL;

async function gasGet(action, params = {}) {
  const url = new URL(GAS_WEBAPP_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), { method: "GET", cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.error || "GAS request failed");
  return data;
}

async function gasPost(body) {
  const res = await fetch(GAS_WEBAPP_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.ok === false) throw new Error(data?.error || "GAS request failed");
  return data;
}

export async function listReviews(limit = 50) {
  const data = await gasGet("reviews", { limit });
  return Array.isArray(data?.reviews) ? data.reviews : [];
}

export async function addReview({ name, rating, message }) {
  return gasPost({
    action: "review_add",
    name: String(name || "").trim(),
    rating: Number(rating || 0),
    message: String(message || "").trim(),
  });
}
