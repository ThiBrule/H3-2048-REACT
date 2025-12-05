export default function Game({ gridSize }) {
  return (
    <div className="game-page">
      <h2>Jeu 2048</h2>
      <p>Grille sélectionnée : {gridSize}×{gridSize}</p>

      <p>La grille apparaîtra ici…</p>
    </div>
  );
}
