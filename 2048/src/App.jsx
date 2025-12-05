// src/App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

export default function App() {
  // taille de grille globale (4 ou 5)
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
