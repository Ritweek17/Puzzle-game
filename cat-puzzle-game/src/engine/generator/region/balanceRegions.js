/**
 * Count cells in every region.
 *
 * @param {number[][]} regions
 * @returns {Map<number, number>}
 */
export function getRegionSizes(regions) {
  const regionSizes = new Map();

  for (const row of regions) {
    for (const cell of row) {
      regionSizes.set(cell, (regionSizes.get(cell) || 0) + 1);
    }
  }

  return regionSizes;
}