// client/src/App.jsx
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import BottomTabs from "./components/BottomTabs.jsx";

import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Reviews from "./pages/Reviews.jsx";
import Gallery from "./pages/Gallery.jsx";
import Partners from "./pages/Partners.jsx";
import PrayerWall from "./pages/PrayerWall.jsx";
import Profile from "./pages/Profile.jsx";

import { trackPageView } from "./utils/analytics.js";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <TopBar />

      <main className="mx-auto max-w-5xl px-4 py-4 pb-28 sm:pb-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/prayer-wall" element={<PrayerWall />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <BottomTabs />
    </div>
  );
}
