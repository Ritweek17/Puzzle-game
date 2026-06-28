import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Levels from "./pages/Levels/Levels";
import Game from "./pages/Game/Game";
import Settings from "./pages/Settings/Settings";
import Debug from "./pages/Debug/Debug";
import HowToPlay from "./pages/HowToPlay/HowToPlay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/game/:id" element={<Game />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/how-to-play" element={<HowToPlay />} />
      <Route path="/debug" element={<Debug/>} />
    </Routes>
  );
}

export default App;