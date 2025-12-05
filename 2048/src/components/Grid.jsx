import Tile from "./Tile";

export default function Grid({ grid }) {
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid.length}, 80px)`,
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px"
      }}
    >
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Tile key={`${r}-${c}`} value={value} />
        ))
      )}
    </div>
  );
}
