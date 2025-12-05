import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import {
  createEmptyGrid,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
} from "../utils";

export default function Game({ gridSize }) {
  const [grid, setGrid] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );

  // Initialisation
  useEffect(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
  }, [gridSize]);


  // Fonction mise à jour des scores
  function updateScore(gained) {
    const newScore = score + gained;
    setScore(newScore);

    if (newScore > bestScore) {
      localStorage.setItem("bestScore", newScore);
      setBestScore(newScore);
    }
  }


  // Gestion des touches
  useEffect(() => {
    function handleKey(e) {
      if (!grid) return;

      const moves = {
        ArrowLeft: moveLeft,
        ArrowRight: moveRight,
        ArrowUp: moveUp,
        ArrowDown: moveDown,
      };

      const fn = moves[e.key];
      if (!fn) return;

      const result = fn(grid);

      // Si rien n'a changé → on ne fait rien
      if (JSON.stringify(result.grid) === JSON.stringify(grid)) return;

      updateScore(result.gained);

      setGrid(prev => addRandomTile(result.grid));
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid, score, bestScore]);



  if (!grid) return <p>Chargement…</p>;

  return (
    <div className="game-page">
      <h2>2048</h2>
      <p>Grille : {gridSize}×{gridSize}</p>

      <div className="scoreboard">
        <div className="box">Score : {score}</div>
        <div className="box">Best : {bestScore}</div>
      </div>

      <Grid grid={grid} />
    </div>
  );
}
