import { useEffect, useState } from "react";
import { getLeaderboard } from "../api";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function fetchScores() {
      const data = await getLeaderboard();

      // tri par meilleur score
      data.sort((a, b) => b.score - a.score);
      setScores(data);
    }

    fetchScores();
  }, []);

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>

      {scores.length === 0 ? (
        <p>Aucun score pour le moment...</p>
      ) : (
        <ol>
          {scores.map((entry) => (
            <li key={entry.id}>
              {entry.name} — {entry.score}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
