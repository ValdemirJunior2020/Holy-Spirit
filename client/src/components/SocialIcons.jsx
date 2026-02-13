// client/src/components/SocialIcons.jsx
import React from "react";
import { Youtube, Instagram, Facebook } from "lucide-react";

const LINKS = {
  youtube: "https://www.youtube.com/@infojr83",
  instagram: "https://www.instagram.com/valdemir_junior_goncalves/",
  facebook: "https://www.facebook.com/valdemir.goncalves.679123/",
};

function Btn({ href, label, className, children }) {
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
    >
      {children}
    </a>
  );
}

export default function SocialIcons() {
  return (
    <div className="flex gap-2">
      {/* YouTube (red) */}
      <Btn
        href={LINKS.youtube}
        label="YouTube"
        className="bg-[#FF0000] text-white hover:brightness-110"
      >
        <Youtube size={18} />
      </Btn>

      {/* Instagram (gradient) */}
      <Btn
        href={LINKS.instagram}
        label="Instagram"
        className="text-white hover:brightness-110"
      >
        <span className="h-11 w-11 grid place-items-center rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
          }}
        >
          <Instagram size={18} />
        </span>
      </Btn>

      {/* Facebook (blue) */}
      <Btn
        href={LINKS.facebook}
        label="Facebook"
        className="bg-[#1877F2] text-white hover:brightness-110"
      >
        <Facebook size={18} />
      </Btn>
    </div>
  );
}
