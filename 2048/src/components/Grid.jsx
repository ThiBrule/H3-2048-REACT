import Tile from "./Tile";

export default function Grid({ grid }) {
  if (!grid) return null;

  const size = grid.length;
  const className = `grid grid-${size}`;

  return (
    <div className={className}>
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Tile key={r + "-" + c} value={value} />
        ))
      )}
    </div>
  );
}
