/**
 * ---------------------------------------------------
 * File: placeSeeds.js
 *
 * Purpose:
 * Places region seeds while keeping
 * good distance between them.
 * ---------------------------------------------------
 */

function distance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function placeSeeds(board, cats, random) {

  const size = board.length;

  const regions = board.map(row => [...row]);

  const seeds = [];

  let id = 1;
  for (const cat of cats) {
    regions[cat.row][cat.col] = id;
    seeds.push({
      id,
      row: cat.row,
      col: cat.col,
    });
    id++;
  }

  return {
    regions,
    seeds,
  };

}