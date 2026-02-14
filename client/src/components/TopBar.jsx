import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, MessageCircle, Star, Menu, Share2, Users } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu.jsx";
import SocialIcons from "./SocialIcons.jsx";

const LOGO_SRC = "/logo%20street.jpg";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

const INITIAL_COUNT = 1345;

function IconLink({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        [
          "inline-flex h-10 w-10 items-center justify-center rounded-full",
          "bg-white/70 ring-1 ring-[var(--ring)] shadow-soft",
          "transition hover:scale-[1.03] active:scale-[0.98]",
          isActive ? "text-slate-900" : "text-slate-600",
        ].join(" ")
      }
    >
      <Icon size={18} />
    </NavLink>
  );
}

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(INITIAL_COUNT);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats`);
        const data = await res.json();
        if (data.ok && data.count) {
          setVisitorCount(INITIAL_COUNT + data.count);
        }
      } catch (err) {
        // If fail, just stick to initial count
      }
    };
    fetchStats();
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "AHS Ministry - Prayer Companion",
      text: "Adventure with the Holy Spirit: 24/7 Prayer Support.",
      url: window.location.origin,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert("Link copied!");
    }
  };

  return (
    <header className="w-full">
      <div className="rounded-3xl bg-white/70 shadow-soft ring-1 ring-[var(--ring)] px-4 py-3 backdrop-blur">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3">
          
          {/* LEFT: Menu & Counter */}
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 ring-1 ring-[var(--ring)] shadow-soft text-slate-700 hover:scale-[1.03] active:scale-[0.98] transition"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <HamburgerMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Counter Badge */}
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-green-700 bg-green-50 px-3 py-1.5 rounded-full shadow-sm ring-1 ring-green-100">
              <Users size={12} className="text-green-600" />
              <span>{visitorCount.toLocaleString()} prayed</span>
            </div>
          </div>

          {/* CENTER: Logo + New Ministry Text (Desktop) */}
          <div className="hidden sm:flex flex-col items-center justify-center">
            {/* The Logo Image */}
            <img
              src={LOGO_SRC}
              alt="AHS Ministry"
              draggable={false}
              loading="eager"
              className="object-contain rounded-2xl bg-white/60 ring-1 ring-[var(--ring)] shadow-soft px-2 py-1 h-24 md:h-32 max-w-[500px]"
            />
            
            {/* ✅ NEW: Ministry Text Below Logo */}
            <div className="mt-2 text-center">
              <div className="text-xl font-black text-slate-900 tracking-tight leading-none font-serif">
                AHS MINISTRY
              </div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mt-0.5">
                Adventure with the Holy Spirit
              </div>
            </div>
          </div>

          {/* RIGHT: Share Button & Desktop Socials */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleShare}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100 shadow-soft transition hover:scale-[1.03] active:scale-[0.98]"
              aria-label="Share App"
              title="Share this app"
            >
              <Share2 size={18} />
            </button>

            <div className="hidden lg:block scale-90 origin-right">
              <SocialIcons />
            </div>

            <div className="hidden lg:block h-6 w-px bg-slate-300/50"></div>

            <div className="hidden sm:flex items-center gap-2">
              <IconLink to="/" label="Home" Icon={Home} />
              <IconLink to="/chat" label="Chat" Icon={MessageCircle} />
              <IconLink to="/reviews" label="Reviews" Icon={Star} />
            </div>
          </div>
        </div>

        {/* MOBILE ONLY: Logo + Text Row */}
        <div className="mt-3 flex flex-col items-center justify-center sm:hidden">
          <img
            src={LOGO_SRC}
            alt="AHS Ministry"
            draggable={false}
            loading="eager"
            className="object-contain rounded-2xl bg-white/60 ring-1 ring-[var(--ring)] shadow-soft px-2 py-1 h-20 max-w-[95vw]"
          />
          {/* ✅ NEW: Mobile Text */}
          <div className="mt-2 text-center">
            <div className="text-lg font-black text-slate-900 leading-none font-serif">
              AHS MINISTRY
            </div>
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-0.5">
              Adventure with the Holy Spirit
            </div>
          </div>
        </div>

        {/* MOBILE ONLY: Social Icons Row (Hidden on Home) */}
        {!isHome && (
          <div className="mt-3 sm:hidden">
            <SocialIcons />
          </div>
        )}
      </div>
    </header>
  );
}