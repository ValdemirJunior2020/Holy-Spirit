// client/src/utils/analytics.js
const API_BASE = import.meta.env.PROD ? "" : "http://localhost:5050";

function getVisitorId() {
  const key = "ahs_vid";
  let v = localStorage.getItem(key);
  if (!v) {
    v = crypto.randomUUID();
    localStorage.setItem(key, v);
  }
  return v;
}

export async function trackPageView(pathname) {
  try {
    const visitorId = getVisitorId();
    const ua = navigator.userAgent || "";
    await fetch(`${API_BASE}/api/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, visitorId, ua }),
    });
  } catch {
    // ignore
  }
}
