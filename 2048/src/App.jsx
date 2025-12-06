import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";

function GameWrapper() {
  const { size } = useParams();
  return <Game gridSize={Number(size)} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:size" element={<GameWrapper />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}
