import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerName from "../components/PlayerName";

export default function Home() {
  const navigate = useNavigate();

  const savedName = localStorage.getItem("playerName");
  const [playerName, setPlayerName] = useState(savedName || "");

  if (!playerName) {
    return <PlayerName onSave={setPlayerName} />;
  }

  return (
    <div className="home">
      <h1>Fusioncraft</h1>

      <div className="actions">
        <button onClick={() => navigate("/game/4")}>Grille 4×4</button>
        <button onClick={() => navigate("/game/5")}>Grille 5×5</button>
        <button onClick={() => navigate("/leaderboard")}>Leaderboard</button>
      </div>
    </div>
  );
}
