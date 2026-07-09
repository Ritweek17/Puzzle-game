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
  random,
  allSolutions
) {
  if (allSolutions.length > 1) return;

  if (index >= regions.length) {
    allSolutions.push([...cats]);
    return;
  }

  const cells = shuffle(
    regions[index],
    random
  );

  for (const cell of cells) {
    if (allSolutions.length > 1) {
      break;
    }

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

    solve(
      regions,
      index + 1,
      cats,
      random,
      allSolutions
    );

    cats.pop();
  }
}

export function generateCats(
  regions,
  random
) {

  let grouped =
    groupCellsByRegion(regions);

  // Randomize region traversal order while keeping small regions generally first
  const bySize = new Map();
  for (const group of grouped) {
    const len = group.length;
    if (!bySize.has(len)) bySize.set(len, []);
    bySize.get(len).push(group);
  }
  
  grouped = [];
  const sortedSizes = [...bySize.keys()].sort((a, b) => a - b);
  for (const size of sortedSizes) {
    const groups = bySize.get(size);
    const shuffledGroups = shuffle(groups, random);
    grouped.push(...shuffledGroups);
  }

  const cats = [];
  const allSolutions = [];

  solve(
    grouped,
    0,
    cats,
    random,
    allSolutions
  );

  if (allSolutions.length === 0) {
    return [];
  }

  return allSolutions;
}

export function hasAlternativeSolution(regions, baseCats, random) {
  const grouped = groupCellsByRegion(regions);
  const baseCatsSet = new Set(baseCats.map(c => `${c.row},${c.col}`));
  
  let foundAlternative = false;

  function solveAlt(index, cats) {
    if (foundAlternative) return;

    if (index >= grouped.length) {
      let isBase = true;
      for (const cat of cats) {
        if (!baseCatsSet.has(`${cat.row},${cat.col}`)) {
          isBase = false;
          break;
        }
      }
      if (!isBase) {
        foundAlternative = true;
      }
      return;
    }

    const cells = grouped[index];
    for (const cell of cells) {
      if (foundAlternative) break;

      if (canPlace(cats, cell.row, cell.col)) {
        cats.push(cell);
        solveAlt(index + 1, cats);
        cats.pop();
      }
    }
  }

  solveAlt(0, []);
  return foundAlternative;
}