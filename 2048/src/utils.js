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

function compress(row) {
  const newRow = row.filter(v => v !== 0);
  while (newRow.length < row.length) newRow.push(0);
  return newRow;
}

function merge(row) {
  let gained = 0;

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      gained += row[i];
      row[i + 1] = 0;
    }
  }

  return { row, gained };
}

export function moveLeft(grid) {
  let totalGained = 0;

  const newGrid = grid.map(row => {
    let line = compress([...row]);
    const mergeResult = merge(line);
    line = mergeResult.row;
    totalGained += mergeResult.gained;
    line = compress(line);
    return line;
  });

  return { grid: newGrid, gained: totalGained };
}


export function moveRight(grid) {
  let totalGained = 0;

  const newGrid = grid.map(row => {
    let line = compress([...row].reverse());
    const mergeResult = merge(line);
    line = mergeResult.row;
    totalGained += mergeResult.gained;
    line = compress(line).reverse();
    return line;
  });

  return { grid: newGrid, gained: totalGained };
}

export function moveUp(grid) {
  let totalGained = 0;
  const size = grid.length;
  const newGrid = createEmptyGrid(size);

  for (let col = 0; col < size; col++) {
    let column = compress(grid.map(row => row[col]));
    const mergeResult = merge(column);
    column = mergeResult.row;
    totalGained += mergeResult.gained;
    column = compress(column);

    for (let row = 0; row < size; row++) {
      newGrid[row][col] = column[row];
    }
  }

  return { grid: newGrid, gained: totalGained };
}

export function moveDown(grid) {
  let totalGained = 0;
  const size = grid.length;
  const newGrid = createEmptyGrid(size);

  for (let col = 0; col < size; col++) {
    let column = compress(grid.map(row => row[col]).reverse());
    const mergeResult = merge(column);
    column = mergeResult.row;
    totalGained += mergeResult.gained;
    column = compress(column).reverse();

    for (let row = 0; row < size; row++) {
      newGrid[row][col] = column[row];
    }
  }

  return { grid: newGrid, gained: totalGained };
}
export function isGameOver(grid) {
  const size = grid.length;

  
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return false;
    }
  }

  const moves = [moveLeft, moveRight, moveUp, moveDown];

  for (let move of moves) {
    const result = move(grid);
    if (JSON.stringify(result.grid) !== JSON.stringify(grid)) {
      return false; 
    }
  }

  return true; 
}
