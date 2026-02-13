// client/src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar.jsx";
import BottomTabs from "./components/BottomTabs.jsx";

// ✅ match your real pages (case-sensitive for Netlify/Linux)
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Reviews from "./pages/Reviews.jsx";
import Gallery from "./pages/Gallery.jsx";
import Partners from "./pages/Partners.jsx";
import PrayerWall from "./pages/PrayerWall.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/prayer-wall" element={<PrayerWall />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <BottomTabs />
    </div>
  );
}
