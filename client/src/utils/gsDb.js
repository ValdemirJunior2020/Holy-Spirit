// client/src/utils/gsDb.js
const GAS_URL = (import.meta.env.VITE_GAS_WEBAPP_URL || "").trim();

async function parseJson(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return { ok: false, error: text || "Invalid JSON" };
  }
}

function ensureGas() {
  if (!GAS_URL) throw new Error("Missing VITE_GAS_WEBAPP_URL");
}

export async function listReviews(limit = 50) {
  ensureGas();
  const url = `${GAS_URL}?action=reviews&limit=${encodeURIComponent(limit)}`;
  const res = await fetch(url);
  const data = await parseJson(res);
  if (!data?.ok) throw new Error(data?.error || "Failed to load reviews");
  return data.reviews || [];
}

export async function addReview({ name, rating, message }) {
  ensureGas();
  const res = await fetch(GAS_URL, {
    method: "POST",
    // keep request “simple” for browsers; GAS reads postData.contents the same
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action: "review_add", name, rating, message }),
  });
  const data = await parseJson(res);
  if (!data?.ok) throw new Error(data?.error || "Failed to add review");
  return data;
}

export async function listPartners(limit = 50) {
  ensureGas();
  const url = `${GAS_URL}?action=partners&limit=${encodeURIComponent(limit)}`;
  const res = await fetch(url);
  const data = await parseJson(res);
  if (!data?.ok) throw new Error(data?.error || "Failed to load partners");
  return data.partners || [];
}
