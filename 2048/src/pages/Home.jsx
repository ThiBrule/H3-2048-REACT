// src/pages/Home.jsx
import { useNavigate, Link } from "react-router-dom";

export default function Home({ setGridSize }) {
  const navigate = useNavigate();

  function startGame(size) {
    setGridSize(size);
    navigate("/game");
  }

  return (
    <div className="home">
      <h1>2048 HETIC</h1>
      <p>Choisis ta taille de grille :</p>

      <div className="actions">
        <button onClick={() => startGame(4)}>Grille 4×4</button>
        <button onClick={() => startGame(5)}>Grille 5×5</button>

        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
    </div>
  );
}
