/**
 * ----------------------------------------
 * File: growRegions.js
 *
 * Purpose:
 * Grow each region until target size
 * using frontier expansion.
 * ----------------------------------------
 */

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

export function growRegions(
  regions,
  seeds,
  targets,
  random
) {
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

    // Randomize the region growth order on every step
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

      // Select random element from frontier for organic, non-BFS growth
      const randomIndex = Math.floor(random() * frontier.length);
      const current = frontier[randomIndex];

      const dirs = shuffle(DIRECTIONS, random);
      let candidates = [];

      for (const [dr, dc] of dirs) {
        const nr = current.row + dr;
        const nc = current.col + dc;

        if (nr >= 0 && nr < size && nc >= 0 && nc < size && regions[nr][nc] === -1) {
          // Priority score relative to seed cat
          let score = 0;
          
          // 1. Adjacent to seed (high priority)
          if (Math.abs(nr - seed.row) <= 1 && Math.abs(nc - seed.col) <= 1) {
            score += 10;
          }
          // 2. Same row/col as seed (medium priority)
          if (nr === seed.row || nc === seed.col) {
            score += 5;
          }

          candidates.push({ nr, nc, score });
        }
      }

      if (candidates.length > 0) {
        // Sort by score descending, with a bit of randomness for tie-breakers
        candidates.sort((a, b) => b.score - a.score || random() - 0.5);

        const chosen = candidates[0];
        regions[chosen.nr][chosen.nc] = id;
        regionSizes.set(id, regionSizes.get(id) + 1);
        frontier.push({ row: chosen.nr, col: chosen.nc, id });
      } else {
        // Remove from frontier since it has no growable neighbors
        frontier.splice(randomIndex, 1);
      }
    }
  }

  return regions;
}