import { generateEmptyBoard } from "../src/engine/generator/boardGenerator.js";
import { generateSolution } from "../src/engine/generator/solutionGenerator.js";
import { placeSeeds } from "../src/engine/generator/region/placeSeeds.js";
import { fillEmptyCells } from "../src/engine/generator/region/fillEmptyCells.js";
import { createTargetSizes } from "../src/engine/generator/region/targetSizes.js";

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function shuffle(array, random) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Aggressive priority-biased growRegions
function growRegionsAggressive(regions, seeds, targets, random) {
  const size = regions.length;
  const regionSizes = new Map();
  const frontiers = new Map();

  for (const seed of seeds) {
    regionSizes.set(seed.id, 1);
    frontiers.set(seed.id, [seed]);
  }

  let growing = true;

  while (growing) {
    growing = false;
    const shuffledSeeds = shuffle(seeds, random);

    for (const seed of shuffledSeeds) {
      const id = seed.id;

      if (regionSizes.get(id) >= targets[id - 1]) {
        continue;
      }

      const frontier = frontiers.get(id);
      if (frontier.length === 0) {
        continue;
      }

      growing = true;

      // Select frontier cell and try to grow
      const randomIndex = Math.floor(random() * frontier.length);
      const current = frontier[randomIndex];

      const dirs = shuffle(DIRECTIONS, random);
      let candidates = [];

      for (const [dr, dc] of dirs) {
        const nr = current.row + dr;
        const nc = current.col + dc;

        if (nr >= 0 && nr < size && nc >= 0 && nc < size && regions[nr][nc] === -1) {
          let score = 0;
          
          // 1. Adjacent to seed (highest priority)
          const isAdj = Math.abs(nr - seed.row) <= 1 && Math.abs(nc - seed.col) <= 1;
          // 2. Same row or column (medium priority)
          const isSameRowCol = nr === seed.row || nc === seed.col;

          if (isAdj) {
            score = 100;
          } else if (isSameRowCol) {
            score = 50;
          } else {
            score = 1; // Heavily penalized free cell
          }

          candidates.push({ nr, nc, score });
        }
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => b.score - a.score || random() - 0.5);
        const chosen = candidates[0];
        regions[chosen.nr][chosen.nc] = id;
        regionSizes.set(id, regionSizes.get(id) + 1);
        frontier.push({ row: chosen.nr, col: chosen.nc, id });
      } else {
        frontier.splice(randomIndex, 1);
      }
    }
  }

  return regions;
}

function canPlace(cats, row, col) {
  for (const cat of cats) {
    if (cat.row === row) return false;
    if (cat.col === col) return false;
    if (Math.abs(cat.row - row) <= 1 && Math.abs(cat.col - col) <= 1) {
      return false;
    }
  }
  return true;
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
      map.get(id).push({ row, col });
    }
  }
  return [...map.values()].sort((a, b) => a.length - b.length);
}

function hasAlternativeSolution(regions, baseCats, random) {
  const grouped = groupCellsByRegion(regions);
  const baseCatsSet = new Set(baseCats.map(c => `${c.row},${c.col}`));
  
  let foundAlternative = false;

  function solve(index, cats) {
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
        solve(index + 1, cats);
        cats.pop();
      }
    }
  }

  solve(0, []);
  return foundAlternative;
}

const random = Math.random;

console.log("Searching for a unique 7x7 puzzle with aggressive region constraint growth...");
const startTime = Date.now();
let attempts = 0;
while (attempts < 100000) {
  attempts++;
  const board = generateEmptyBoard(7);
  const baseCats = generateSolution(7, random);
  const targets = createTargetSizes(7, 7, random);

  const { regions, seeds } = placeSeeds(board, baseCats, random);
  const grown = growRegionsAggressive(regions, seeds, targets, random);
  const filled = fillEmptyCells(grown, random);
  
  const hasAlt = hasAlternativeSolution(filled, baseCats, random);

  if (!hasAlt) {
    const elapsed = Date.now() - startTime;
    console.log(`Success! Unique 7x7 puzzle found on attempt: ${attempts} in ${elapsed}ms`);
    console.log("Base Cats (Solution):", baseCats);
    break;
  }

  if (attempts % 100 === 0) {
    console.log(`Still searching... Attempt ${attempts} (${Date.now() - startTime}ms elapsed)`);
  }
}
