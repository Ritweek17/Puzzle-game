/**
 * Grow every region until its target size.
 */

const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function growRegions(regions, seeds, targets, random) {
  const size = regions.length;

  // Current size of each region
  const regionSizes = new Map();

  for (const seed of seeds) {
    regionSizes.set(seed.id, 1);
  }

  // BFS queue
  const queue = [...seeds];

  while (queue.length > 0) {
    const current = queue.shift();

    const currentSize = regionSizes.get(current.id);

    // Stop growing if target reached
    if (currentSize >= targets[current.id - 1]) {
      continue;
    }

    // Shuffle directions
    const shuffled = [...DIRECTIONS].sort(() => random() - 0.5);

    for (const [dr, dc] of shuffled) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (
        nr < 0 ||
        nr >= size ||
        nc < 0 ||
        nc >= size
      ) {
        continue;
      }

      if (regions[nr][nc] !== -1) {
        continue;
      }

      // Fill cell
      regions[nr][nc] = current.id;

      regionSizes.set(
        current.id,
        regionSizes.get(current.id) + 1
      );

      queue.push({
        id: current.id,
        row: nr,
        col: nc,
      });

      // Target reached
      if (
        regionSizes.get(current.id) >=
        targets[current.id - 1]
      ) {
        break;
      }
    }
  }

  return regions;
}