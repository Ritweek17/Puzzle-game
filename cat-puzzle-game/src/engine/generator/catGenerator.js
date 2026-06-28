/**
 * Shuffle array using seeded random
 */
function shuffleArray(array, random) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/**
 * Group all cells by region
 */
function groupCellsByRegion(regions) {
  const regionMap = new Map();

  const size = regions.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const regionId = regions[row][col];

      if (!regionMap.has(regionId)) {
        regionMap.set(regionId, []);
      }

      regionMap.get(regionId).push({
        row,
        col,
      });
    }
  }

  return regionMap;
}

/**
 * Check whether a cat can be placed
 */
function canPlaceCat(cats, row, col) {
  for (const cat of cats) {

    // Same Row
    if (cat.row === row) {
      return false;
    }

    // Same Column
    if (cat.col === col) {
      return false;
    }

    // Adjacent (8 directions)
    if (
      Math.abs(cat.row - row) <= 1 &&
      Math.abs(cat.col - col) <= 1
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Generate candidate cat positions
 *
 * One cat per region.
 * Other constraints are attempted but not guaranteed.
 */
export function generateCats(regions, random) {

  const regionMap = groupCellsByRegion(regions);

  const cats = [];

  for (const [, cells] of regionMap) {

    const shuffledCells = shuffleArray(
      cells,
      random
    );

    let placed = false;

    for (const cell of shuffledCells) {

      if (
        canPlaceCat(
          cats,
          cell.row,
          cell.col
        )
      ) {

        cats.push(cell);

        placed = true;

        break;

      }

    }

    /**
     * Fallback
     *
     * If no valid position exists,
     * choose first random cell.
     *
     * Validator will reject it later.
     */

    if (!placed) {

      cats.push(shuffledCells[0]);

    }

  }

  return cats;

}