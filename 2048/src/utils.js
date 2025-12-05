
export function createEmptyGrid(size = 4) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}


export function addRandomTile(grid) {
  const emptyCells = [];

  grid.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value === 0) emptyCells.push([r, c]);
    });
  });

  if (emptyCells.length === 0) return grid;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;

  return newGrid;
}
