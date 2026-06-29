const DIRECTIONS = [

  [-1,-1],
  [-1,0],
  [-1,1],

  [0,-1],
  [0,1],

  [1,-1],
  [1,0],
  [1,1],

];

/**
 * Cats cannot touch.
 */

export function noAdjacentCats(puzzle) {

  const occupied = new Set();

  for (const cat of puzzle.cats) {

    occupied.add(
      `${cat.row},${cat.col}`
    );

  }

  for (const cat of puzzle.cats) {

    for (const [dr, dc] of DIRECTIONS) {

      const key =
        `${cat.row + dr},${cat.col + dc}`;

      if (occupied.has(key)) {

        return false;

      }

    }

  }

  return true;

}