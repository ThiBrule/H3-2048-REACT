export default function Tile({ value }) {
  const tileClass =
    value === 0 ? "tile empty" : `tile tile-${value}`;

  return (
    <div className={tileClass}>
      {value !== 0 ? value : ""}
    </div>
  );
}
