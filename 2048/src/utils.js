// src/utils.js

// Crée une grille vide
export function createEmptyGrid(size = 4) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

// Ajoute une tuile (2 ou 4) dans une case vide
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

// --------- fonctions internes pour les mouvements ---------

function compress(row) {
  const newRow = row.filter(v => v !== 0);
  while (newRow.length < row.length) newRow.push(0);
  return newRow;
}

function merge(row) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] !== 0 && row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }
  return row;
}

// --------- MOVE LEFT ---------
export function moveLeft(grid) {
  return grid.map(row => {
    let line = compress(row);
    line = merge(line);
    line = compress(line);
    return line;
  });
}

// --------- MOVE RIGHT ---------
export function moveRight(grid) {
  return grid.map(row => {
    let line = [...row].reverse();
    line = compress(line);
    line = merge(line);
    line = compress(line);
    return line.reverse();
  });
}

// --------- MOVE UP ---------
export function moveUp(grid) {
  const size = grid.length;
  const newGrid = createEmptyGrid(size);

  for (let col = 0; col < size; col++) {
    let column = grid.map(row => row[col]);

    column = compress(column);
    column = merge(column);
    column = compress(column);

    for (let row = 0; row < size; row++) {
      newGrid[row][col] = column[row];
    }
  }

  return newGrid;
}

// --------- MOVE DOWN ---------
export function moveDown(grid) {
  const size = grid.length;
  const newGrid = createEmptyGrid(size);

  for (let col = 0; col < size; col++) {
    let column = grid.map(row => row[col]).reverse();

    column = compress(column);
    column = merge(column);
    column = compress(column);
    column = column.reverse();

    for (let row = 0; row < size; row++) {
      newGrid[row][col] = column[row];
    }
  }

  return newGrid;
}
