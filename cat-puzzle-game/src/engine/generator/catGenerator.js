/**
 * ----------------------------------------
 * File: catGenerator.js
 *
 * Smart Cat Generator
 * Uses recursive backtracking.
 * ----------------------------------------
 */

function shuffle(array, random) {

  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {

    const j = Math.floor(
      random() * (i + 1)
    );

    [copy[i], copy[j]] =
      [copy[j], copy[i]];

  }

  return copy;

}

function groupCellsByRegion(regions) {

  const map = new Map();

  const size = regions.length;

  for (let row = 0; row < size; row++) {

    for (let col = 0; col < size; col++) {

      const id = regions[row][col];

      if (!map.has(id)) {

        map.set(id, []);

      }

      map.get(id).push({
        row,
        col,
      });

    }

  }

  // ⭐ Small regions first
  return [...map.values()].sort(
    (a, b) => a.length - b.length
  );

}

function canPlace(cats, row, col) {

  for (const cat of cats) {

    if (cat.row === row) return false;

    if (cat.col === col) return false;

    if (
      Math.abs(cat.row - row) <= 1 &&
      Math.abs(cat.col - col) <= 1
    ) {
      return false;
    }

  }

  return true;

}

function solve(
  regions,
  index,
  cats,
  random
) {

  if (index >= regions.length) {
    return true;
  }

  const cells = shuffle(
    regions[index],
    random
  );

  for (const cell of cells) {

    if (
      !canPlace(
        cats,
        cell.row,
        cell.col
      )
    ) {
      continue;
    }

    cats.push(cell);

    if (
      solve(
        regions,
        index + 1,
        cats,
        random
      )
    ) {
      return true;
    }

    cats.pop();

  }

  return false;

}

export function generateCats(
  regions,
  random
) {

  const grouped =
    groupCellsByRegion(regions);

  const cats = [];

  const solved = solve(
    grouped,
    0,
    cats,
    random
  );

  if (!solved) {

    return [];

  }

  return cats;

}