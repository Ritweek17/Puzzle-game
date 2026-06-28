const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function fillEmptyCells(regions, random) {
  const size = regions.length;

  let changed = true;

  while (changed) {
    changed = false;

    // Current region sizes
    const regionSizes = new Map();

    for (const row of regions) {
      for (const cell of row) {
        if (cell === -1) continue;

        regionSizes.set(
          cell,
          (regionSizes.get(cell) || 0) + 1
        );
      }
    }

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (regions[row][col] !== -1) continue;

        const candidates = [];

        for (const [dr, dc] of DIRECTIONS) {
          const nr = row + dr;
          const nc = col + dc;

          if (
            nr < 0 ||
            nr >= size ||
            nc < 0 ||
            nc >= size
          ) {
            continue;
          }

          const id = regions[nr][nc];

          if (id !== -1) {
            candidates.push({
              id,
              size: regionSizes.get(id),
            });
          }
        }

        if (candidates.length === 0) continue;

        // Smallest region first
        candidates.sort((a, b) => a.size - b.size);

        const smallestSize = candidates[0].size;

        const smallestRegions = candidates.filter(
          c => c.size === smallestSize
        );

        const chosen =
          smallestRegions[
            Math.floor(random() * smallestRegions.length)
          ];

        regions[row][col] = chosen.id;

        changed = true;
      }
    }
  }

  return regions;
}