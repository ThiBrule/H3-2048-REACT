import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

export default function App() {

  const [gridSize, setGridSize] = useState(4);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setGridSize={setGridSize} />} />
        <Route path="/game" element={<Game gridSize={gridSize} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}
