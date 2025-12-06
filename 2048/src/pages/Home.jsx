import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>2048 Challenge</h1>

      <div className="actions">
        <Link to="/game/4">
          <button>Grille 4×4</button>
        </Link>

        <Link to="/game/5">
          <button>Grille 5×5</button>
        </Link>

        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
    </div>
  );
}
