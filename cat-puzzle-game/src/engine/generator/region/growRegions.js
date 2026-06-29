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

    for (const seed of seeds) {

      const id = seed.id;

      if (
        regionSizes.get(id) >=
        targets[id - 1]
      ) {
        continue;
      }

      const frontier =
        frontiers.get(id);

      if (
        frontier.length === 0
      ) {
        continue;
      }

      growing = true;

      const current =
        frontier.shift();

      const dirs =
        shuffle(
          DIRECTIONS,
          random
        );

      for (const [dr, dc] of dirs) {

        const nr =
          current.row + dr;

        const nc =
          current.col + dc;

        if (
          nr < 0 ||
          nr >= size ||
          nc < 0 ||
          nc >= size
        ) {
          continue;
        }

        if (
          regions[nr][nc] !== -1
        ) {
          continue;
        }

        regions[nr][nc] = id;

        regionSizes.set(
          id,
          regionSizes.get(id) + 1
        );

        frontier.push({
          row: nr,
          col: nc,
          id,
        });

        if (
          regionSizes.get(id) >=
          targets[id - 1]
        ) {
          break;
        }

      }

    }

  }

  return regions;

}