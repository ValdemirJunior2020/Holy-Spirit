// client/src/App.jsx  (ADD Reviews route + pageview tracking)
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import BottomTabs from "./components/BottomTabs.jsx";

import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import PrayerWall from "./pages/PrayerWall.jsx";
import Partners from "./pages/Partners.jsx";
import Profile from "./pages/Profile.jsx";
import Gallery from "./pages/Gallery.jsx";
import Reviews from "./pages/Reviews.jsx";

import { trackPageView } from "./utils/analytics.js";

export default function App() {
  const loc = useLocation();

  useEffect(() => {
    trackPageView(loc.pathname);
  }, [loc.pathname]);

  return (
    <div className="min-h-screen w-full flex justify-center">
      <div className="w-full max-w-md min-h-screen flex flex-col">
        <TopBar />
        <main className="flex-1 px-4 pb-28 pt-4 flex flex-col justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/prayer-wall" element={<PrayerWall />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <BottomTabs />
      </div>
    </div>
  );
}
