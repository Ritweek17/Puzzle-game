/**
 * Creates an empty NxN board.
 *
 * Example (size = 4)
 *
 * [
 *  [-1,-1,-1,-1],
 *  [-1,-1,-1,-1],
 *  [-1,-1,-1,-1],
 *  [-1,-1,-1,-1]
 * ]
 */

export function generateEmptyBoard(size) {

  if (!Number.isInteger(size) || size < 4) {
    throw new Error("Invalid board size.");
  }

  return Array.from(
    { length: size },
    () => Array(size).fill(-1)
  );

}