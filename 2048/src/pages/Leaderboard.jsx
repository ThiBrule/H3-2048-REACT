import { useEffect, useState } from "react";
import { getLeaderboard } from "../api";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getLeaderboard();


      data.sort((a, b) => b.score - a.score);

      setScores(data);
    }
    load();
  }, []);

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>

      {scores.length === 0 ? (
        <p>Chargement...</p>
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
