import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Core startup loop pages (statically imported for instant loads)
import Home from "./pages/Home/Home";
import Levels from "./pages/Levels/Levels";
import Game from "./pages/Game/Game";

// Auxiliary and heavy pages (lazy loaded to optimize bundle size)
const Settings = lazy(() => import("./pages/Settings/Settings"));
const HowToPlay = lazy(() => import("./pages/HowToPlay/HowToPlay"));
const Debug = lazy(() => import("./pages/Debug/Debug"));
const Statistics = lazy(() => import("./pages/Statistics/Statistics"));
const Leaderboard = lazy(() => import("./pages/Leaderboard/Leaderboard"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const Onboarding = lazy(() => import("./pages/Onboarding/Onboarding"));
const EditProfile = lazy(() => import("./pages/EditProfile/EditProfile"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C5CFF]"></div>
  </div>
);

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/debug" element={<Debug/>} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Suspense>
  );
}

export default App;