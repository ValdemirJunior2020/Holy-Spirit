// client/src/components/SocialIcons.jsx
import React from "react";

function IconBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-2xl bg-white ring-1 ring-[var(--ring)] shadow-soft hover:scale-[1.02] transition"
    >
      {children}
    </a>
  );
}

export default function SocialIcons() {
  // use unique gradient id so it never conflicts
  const uid = React.useId().replace(/[:]/g, "");
  const igGradId = `igGrad_${uid}`;

  return (
    <div className="flex items-center gap-2">
      {/* YouTube (red) */}
      <IconBtn href="https://www.youtube.com/@infojr83" label="YouTube">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M23 7.6a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.5A3 3 0 0 0 1 7.6 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.4a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.5 12 31 31 0 0 0 23 7.6Z"
            fill="#FF0000"
          />
          <path d="M10 15.5V8.5L16 12l-6 3.5Z" fill="#ffffff" />
        </svg>
      </IconBtn>

      {/* Instagram (gradient) */}
      <IconBtn href="https://instagram.com/" label="Instagram">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={igGradId} x1="0" y1="24" x2="24" y2="0">
              <stop offset="0" stopColor="#F58529" />
              <stop offset="0.35" stopColor="#DD2A7B" />
              <stop offset="0.7" stopColor="#8134AF" />
              <stop offset="1" stopColor="#515BD4" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5" fill={`url(#${igGradId})`} />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#ffffff" />
        </svg>
      </IconBtn>

      {/* TikTok (brand-ish colors) */}
      <IconBtn href="https://tiktok.com/" label="TikTok">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 3v10.2a3.8 3.8 0 1 1-3-3.7V6.2c1.2 0 2.4.4 3.4 1.1C16 8.4 17.7 9 19.5 9V6.1c-2.1 0-4-1.2-5.1-3.1H14Z"
            fill="#000000"
          />
          <path
            d="M12.3 10.2c-.4-.1-.8-.2-1.3-.2a4.8 4.8 0 1 0 4.8 4.8V13c-.8.6-1.8 1-2.8 1v.8a3.2 3.2 0 1 1-2-3v-1.6Z"
            fill="#25F4EE"
            opacity="0.75"
          />
          <path
            d="M13 9.5c-.4-.1-.8-.2-1.2-.2a4.8 4.8 0 1 0 4.8 4.8V12.3c-.8.6-1.8 1-2.8 1v.8a3.2 3.2 0 1 1-2-3V9.5Z"
            fill="#FE2C55"
            opacity="0.75"
          />
        </svg>
      </IconBtn>

      {/* Facebook (blue) */}
      <IconBtn href="https://facebook.com/" label="Facebook">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.4-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"
            fill="#1877F2"
          />
        </svg>
      </IconBtn>
    </div>
  );
}
