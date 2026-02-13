// client/src/components/SocialIcons.jsx
import React from "react";
import { Youtube, Instagram, Facebook } from "lucide-react";

const LINKS = {
  youtube: "https://www.youtube.com/@infojr83",
  instagram: "https://www.instagram.com/valdemir_junior_goncalves/",
  tiktok: "https://www.tiktok.com/@infojr83",
  facebook: "https://www.facebook.com/valdemir.goncalves.679123/",
};

function Btn({ href, label, className, style, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={
        "h-11 w-11 grid place-items-center rounded-2xl shadow-soft ring-1 ring-[var(--ring)] transition active:scale-[0.98] " +
        className
      }
      style={style}
    >
      {children}
    </a>
  );
}

function TikTokMark() {
  return (
    <span className="relative text-[18px] leading-none font-black">
      <span className="absolute -left-[1px] -top-[1px] text-[#00F2EA]">♪</span>
      <span className="absolute left-[1px] top-[1px] text-[#FF004F]">♪</span>
      <span className="relative text-white">♪</span>
    </span>
  );
}

export default function SocialIcons() {
  return (
    <div className="flex gap-2">
      {/* YouTube (red) */}
      <Btn href={LINKS.youtube} label="YouTube" className="bg-[#FF0000] text-white hover:brightness-110">
        <Youtube size={18} />
      </Btn>

      {/* Instagram (gradient) */}
      <Btn
        href={LINKS.instagram}
        label="Instagram"
        className="text-white hover:brightness-110"
        style={{
          background:
            "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
        }}
      >
        <Instagram size={18} />
      </Btn>

      {/* TikTok (black + colored mark) */}
      <Btn href={LINKS.tiktok} label="TikTok" className="bg-black hover:brightness-110">
        <TikTokMark />
      </Btn>

      {/* Facebook (blue) */}
      <Btn href={LINKS.facebook} label="Facebook" className="bg-[#1877F2] text-white hover:brightness-110">
        <Facebook size={18} />
      </Btn>
    </div>
  );
}
