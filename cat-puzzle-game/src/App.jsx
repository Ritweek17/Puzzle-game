import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Levels from "./pages/Levels/Levels";
import Game from "./pages/Game/Game";
import Settings from "./pages/Settings/Settings";
import Debug from "./pages/Debug/Debug";
import HowToPlay from "./pages/HowToPlay/HowToPlay";
import Statistics from "./pages/Statistics/Statistics";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import ProfilePage from "./pages/Profile/Profile";
import Onboarding from "./pages/Onboarding/Onboarding";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C5CFF]"></div>
      </div>
    );
  }

  return (
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
  );
}

export default App;