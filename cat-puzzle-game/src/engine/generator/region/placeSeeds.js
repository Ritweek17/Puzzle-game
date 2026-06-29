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

export function placeSeeds(board, regionCount, random) {

  const size = board.length;

  const regions = board.map(row => [...row]);

  const seeds = [];

  const minDistance = Math.max(
    2,
    Math.floor(size / 3)
  );

  for (let id = 1; id <= regionCount; id++) {

    let placed = false;

    for (let attempt = 0; attempt < 500; attempt++) {

      const row = Math.floor(random() * size);
      const col = Math.floor(random() * size);

      if (regions[row][col] !== -1) {
        continue;
      }

      let valid = true;

      for (const seed of seeds) {

        if (
          distance(
            { row, col },
            seed
          ) < minDistance
        ) {

          valid = false;
          break;

        }

      }

      if (!valid) {
        continue;
      }

      regions[row][col] = id;

      seeds.push({
        id,
        row,
        col,
      });

      placed = true;

      break;

    }

    // Fallback if spacing isn't possible
    if (!placed) {

      while (true) {

        const row = Math.floor(random() * size);
        const col = Math.floor(random() * size);

        if (regions[row][col] !== -1) {
          continue;
        }

        regions[row][col] = id;

        seeds.push({
          id,
          row,
          col,
        });

        break;

      }

    }

  }

  return {
    regions,
    seeds,
  };

}