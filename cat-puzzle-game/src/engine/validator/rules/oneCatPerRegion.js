/**
 * Every region must contain exactly one cat.
 */

export function oneCatPerRegion(puzzle) {

  const regionCats = new Map();

  for (const cat of puzzle.cats) {

    const id =
      puzzle.regions[cat.row][cat.col];

    regionCats.set(
      id,
      (regionCats.get(id) || 0) + 1
    );

  }

  const regions =
    new Set(puzzle.regions.flat());

  for (const id of regions) {

    if (regionCats.get(id) !== 1) {

      return false;

    }

  }

  return true;

}