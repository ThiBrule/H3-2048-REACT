export default function Tile({ value, merged }) {
  const className =
    value === 0
      ? "tile empty"
      : `tile tile-${value} ${merged ? "merged" : ""}`;

  return (
    <div className={className}>
      {value !== 0 ? value : ""}
    </div>
  );
}
