import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>2048 HETIC</h1>

      <div className="actions">
        <Link to="/game">
          <button>Jouer</button>
        </Link>

        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </div>
    </div>
  );
}
