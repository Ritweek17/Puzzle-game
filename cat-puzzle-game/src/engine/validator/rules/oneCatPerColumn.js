/**
 * Exactly one cat per column.
 */

export function oneCatPerColumn(puzzle) {

  const cols =
    new Array(puzzle.gridSize).fill(0);

  for (const cat of puzzle.cats) {

    cols[cat.col]++;

  }

  return cols.every(
    col => col === 1
  );

}