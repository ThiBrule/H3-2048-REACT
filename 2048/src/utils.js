export function createEmptyGrid(size = 4) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}
