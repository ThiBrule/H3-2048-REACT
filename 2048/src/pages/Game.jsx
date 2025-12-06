import { useEffect, useState } from "react";
import Grid from "../components/Grid";
import PlayerName from "../components/PlayerName";

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

export default function Game({ gridSize, headerControls }) {
  // ---------------------------------
  // PSEUDO JOUEUR
  // ---------------------------------
  const savedName = localStorage.getItem("playerName") || "";
  const [playerName, setPlayerName] = useState(savedName);

  // ❗ POPUP SUPPRIMÉE ICI (comme demandé)
  // if (!playerName) {
  //   return <PlayerName onSave={setPlayerName} />;
  // }

  // ---------------------------------
  // STATES DU JEU
  // ---------------------------------
  const [grid, setGrid] = useState(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    Number(localStorage.getItem("bestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  // ---------------------------------
  // INITIALISATION
  // ---------------------------------
  useEffect(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setGameOver(false);
    setPaused(false);
  }, [gridSize]);

  // ---------------------------------
  // SCORE & BEST SCORE
  // ---------------------------------
  function updateScore(gained) {
    const newScore = score + gained;
    setScore(newScore);

    if (newScore > bestScore) {
      localStorage.setItem("bestScore", newScore);
      setBestScore(newScore);
    }
  }

  // ---------------------------------
  // API — POST SCORE FINAL
  // ---------------------------------
  async function sendScoreToAPI(finalScore) {
    if (!playerName) return;
    try {
      await postScore(playerName, finalScore);
    } catch (error) {
      console.error("Erreur API :", error);
    }
  }

  // ---------------------------------
  // PAUSE & RESTART depuis le Header
  // ---------------------------------
  useEffect(() => {
    if (!headerControls) return;

    headerControls.current.pause = () => {
      setPaused((prev) => !prev);
    };

    headerControls.current.restart = () => {
      restart();
    };
  });

  // ---------------------------------
  // TOUCHES CLAVIER
  // ---------------------------------
  useEffect(() => {
    function handleKey(e) {
      if (!grid || gameOver || paused) return;

      const moves = {
        ArrowLeft: moveLeft,
        ArrowRight: moveRight,
        ArrowUp: moveUp,
        ArrowDown: moveDown,
      };

      const fn = moves[e.key];
      if (!fn) return;

      const result = fn(grid);

      if (JSON.stringify(result.grid) === JSON.stringify(grid)) return;

      updateScore(result.gained);

      const newGrid = addRandomTile(result.grid);
      setGrid(newGrid);

      if (isGameOver(newGrid)) {
        const finalScore = score + result.gained;
        setGameOver(true);
        sendScoreToAPI(finalScore);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [grid, score, gameOver, paused]);

  // ---------------------------------
  // RESTART
  // ---------------------------------
  function restart() {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
    setScore(0);
    setGameOver(false);
    setPaused(false);
  }

  // ---------------------------------
  // RENDER
  // ---------------------------------
  if (!grid) return <p>Chargement…</p>;

  return (
    <div className="game-page">

      <div className="scoreboard">
        <div className="box">Score : {score}</div>
        <div className="box">Best : {bestScore}</div>
      </div>

      <Grid grid={grid} />

      {/* PAUSE */}
      {paused && !gameOver && (
        <div className="pause-overlay">
          <div className="pause-box" onClick={() => setPaused(false)}>
            <p>Clique pour reprendre</p>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {gameOver && (
        <div className="gameover-modal">
          <div className="gameover-box">
            <h2>GAME OVER</h2>
            <p>Score : {score}</p>
            <p>Meilleur : {bestScore}</p>

            <button onClick={restart}>Rejouer</button>
          </div>
        </div>
      )}
    </div>
  );
}
