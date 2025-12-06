import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useRef } from "react";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

function GameWrapper({ controls }) {
  const { size } = useParams();
  return <Game gridSize={Number(size)} headerControls={controls} />;
}

export default function App() {
  const controls = useRef({
    pause: () => {},
    restart: () => {},
  });

  return (
    <BrowserRouter>
      <Header
        onPause={() => controls.current.pause()}
        onRestart={() => controls.current.restart()}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:size" element={<GameWrapper controls={controls} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
