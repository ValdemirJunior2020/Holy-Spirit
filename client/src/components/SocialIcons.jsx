// client/src/components/SocialIcons.jsx
import React from "react";

function IconBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 ring-1 ring-[var(--ring)] shadow-soft transition hover:scale-[1.03] active:scale-[0.98]"
      title={label}
    >
      {children}
    </a>
  );
}

function YouTubeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#FF0000" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
    </svg>
  );
}

function InstagramIcon() {
  // ✅ FIX: Using a solid fill instead of <defs> gradient to prevent ID conflicts
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#E1306C" /> 
      <rect x="7.2" y="7.2" width="9.6" height="9.6" rx="2.7" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.3" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="15.9" cy="8.7" r="0.9" fill="#fff" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#000" />
      {/* cyan shadow */}
      <path d="M13.2 6v8.0c0 1.7-1.3 3-3 3-1.3 0-2.4-.8-2.8-2 .4 1 1.4 1.6 2.6 1.6 1.6 0 2.9-1.3 2.9-2.9V6h2.2c.4 1.1 1.2 2 2.2 2.6v2.4c-1.5-.4-2.8-1.2-3.7-2.3v5.2c0 2.7-2.2 4.9-4.9 4.9-2 0-3.8-1.2-4.5-3 .8 1.2 2.1 2 3.6 2 2.4 0 4.3-1.9 4.3-4.3V6h1.1z" fill="#25F4EE" opacity="0.9" transform="translate(-0.4,0.2)" />
      {/* pink shadow */}
      <path d="M13.2 6v8.0c0 1.7-1.3 3-3 3-1.3 0-2.4-.8-2.8-2 .4 1 1.4 1.6 2.6 1.6 1.6 0 2.9-1.3 2.9-2.9V6h2.2c.4 1.1 1.2 2 2.2 2.6v2.4c-1.5-.4-2.8-1.2-3.7-2.3v5.2c0 2.7-2.2 4.9-4.9 4.9-2 0-3.8-1.2-4.5-3 .8 1.2 2.1 2 3.6 2 2.4 0 4.3-1.9 4.3-4.3V6h1.1z" fill="#FE2C55" opacity="0.85" transform="translate(0.4,-0.2)" />
      {/* white main */}
      <path d="M13.2 6v8.0c0 1.7-1.3 3-3 3-1.7 0-3-1.3-3-3s1.3-3 3-3c.4 0 .8.1 1.1.2V6h1.9c.4 1.6 1.7 2.9 3.3 3.2v2.0c-1.2-.2-2.3-.8-3.3-1.6v4.4c0 2.7-2.2 4.9-4.9 4.9S6.4 16.7 6.4 14s2.2-4.9 4.9-4.9c.3 0 .7 0 1 .1V6h.9z" fill="#fff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path d="M13.2 19v-6h2l.3-2.3h-2.3V9.3c0-.7.2-1.2 1.2-1.2h1.2V6.1c-.2 0-1 0-2 0-2 0-3.3 1.2-3.3 3.4v1.2H8.8V13h1.5v6h2.9z" fill="#fff" />
    </svg>
  );
}

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-2">
      <IconBtn href="https://www.youtube.com/@infojr83" label="YouTube">
        <YouTubeIcon />
      </IconBtn>

      <IconBtn href="https://www.instagram.com/" label="Instagram">
        <InstagramIcon />
      </IconBtn>

      <IconBtn href="https://www.tiktok.com/" label="TikTok">
        <TikTokIcon />
      </IconBtn>

      <IconBtn href="https://www.facebook.com/" label="Facebook">
        <FacebookIcon />
      </IconBtn>
    </div>
  );
}