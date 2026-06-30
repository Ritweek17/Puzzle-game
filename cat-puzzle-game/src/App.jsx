import { Routes, Route } from "react-router-dom";

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