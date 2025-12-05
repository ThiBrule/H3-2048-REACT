import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import {
  createEmptyGrid,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  isGameOver
} from "../utils";
import { postScore } from "../api";

export default function Game({ gridSize }) {
  const [grid, setGrid] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  // -----------------------------
  // INITIALISATION DU JEU
  // -----------------------------
  useEffect(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setGameOver(false);
  }, [gridSize]);

  // -----------------------------
  // SCORE + BEST SCORE
  // -----------------------------
  function updateScore(gained) {
    const newScore = score + gained;
    setScore(newScore);

    if (newScore > bestScore) {
      localStorage.setItem("bestScore", newScore);
      setBestScore(newScore);
    }
  }

  // -----------------------------
  // ENVOI DU SCORE À L'API
  // -----------------------------
  async function sendScoreToAPI(finalScore) {
    await postScore("Player", finalScore); 
  }

  // -----------------------------
  // GESTION DES TOUCHES
  // -----------------------------
  useEffect(() => {
    function handleKey(e) {
      if (!grid || gameOver) return;

      const moves = {
        ArrowLeft: moveLeft,
        ArrowRight: moveRight,
        ArrowUp: moveUp,
        ArrowDown: moveDown,
      };

      const fn = moves[e.key];
      if (!fn) return;

      const result = fn(grid);

      // Si rien ne change → pas de mouvement
      if (JSON.stringify(result.grid) === JSON.stringify(grid)) return;

      // maj du score
      updateScore(result.gained);

      // Ajout tuile aléatoire
      const newGrid = addRandomTile(result.grid);
      setGrid(newGrid);

      // Vérification Game Over
      if (isGameOver(newGrid)) {
        setGameOver(true);
        sendScoreToAPI(score + result.gained);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [grid, score, gameOver]);

  // -----------------------------
  // RESTART
  // -----------------------------
  function restart() {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setGameOver(false);
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  if (!grid) return <p>Chargement…</p>;

  return (
    <div className="game-page">
      <h2>2048</h2>

      <div className="scoreboard">
        <div className="box">Score : {score}</div>
        <div className="box">Best : {bestScore}</div>
      </div>

      <Grid grid={grid} />

      {gameOver && (
        <div className="gameover-modal">
          <div className="gameover-box">
            <h2>GAME OVER</h2>
            <p>Score : {score}</p>
            <p>Best : {bestScore}</p>

            <button onClick={restart}>Rejouer</button>
          </div>
        </div>
      )}
    </div>
  );
}
