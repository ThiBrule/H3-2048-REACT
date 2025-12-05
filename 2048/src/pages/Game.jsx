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

  // Initialisation de la grille
  useEffect(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
  }, [gridSize]);

  // Gestion du clavier
  useEffect(() => {
    function handleKey(e) {
      if (!grid) return;

      setGrid(prev => {
        let next = prev;

        if (e.key === "ArrowLeft") next = moveLeft(prev);
        if (e.key === "ArrowRight") next = moveRight(prev);
        if (e.key === "ArrowUp") next = moveUp(prev);
        if (e.key === "ArrowDown") next = moveDown(prev);

        // Si aucun changement → pas de nouvelle tuile
        if (JSON.stringify(prev) === JSON.stringify(next)) {
          return prev;
        }

        return addRandomTile(next); // Ajoute une tuile
      });
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [grid]);

  if (!grid) {
    return (
      <div className="game-page">
        <h2>Jeu 2048</h2>
        <p>Chargement…</p>
      </div>
    );
  }

  return (
    <div className="game-page">
      <h2>Jeu 2048</h2>
      <p>Grille sélectionnée : {gridSize}×{gridSize}</p>

      <Grid grid={grid} />
    </div>
  );
}
