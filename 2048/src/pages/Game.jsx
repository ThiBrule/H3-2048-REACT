import { useEffect, useState } from "react";
import { createEmptyGrid, addRandomTile } from "../utils";
import Grid from "../components/Grid";

export default function Game({ gridSize }) {
  const [grid, setGrid] = useState(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    return g;
  });

  
  useEffect(() => {
    let g = createEmptyGrid(gridSize);
    g = addRandomTile(g);
    g = addRandomTile(g);
    setGrid(g);
  }, [gridSize]);

  return (
    <div className="game-page">
      <h2>Jeu 2048</h2>
      <p>Grille sélectionnée : {gridSize}×{gridSize}</p>

      <Grid grid={grid} />
    </div>
  );
}
