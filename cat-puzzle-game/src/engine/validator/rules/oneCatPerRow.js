/**
 * Exactly one cat per row.
 */

export function oneCatPerRow(puzzle) {

  const rows =
    new Array(puzzle.gridSize).fill(0);

  for (const cat of puzzle.cats) {

    rows[cat.row]++;

  }

  return rows.every(
    row => row === 1
  );

}