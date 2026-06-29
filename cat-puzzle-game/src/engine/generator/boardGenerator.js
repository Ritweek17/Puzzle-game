/**
 * ---------------------------------------------------
 * File: boardGenerator.js
 *
 * Purpose:
 * Creates an empty square board of size N × N.
 *
 * Example (size = 4)
 *
 * [
 *   [-1,-1,-1,-1],
 *   [-1,-1,-1,-1],
 *   [-1,-1,-1,-1],
 *   [-1,-1,-1,-1]
 * ]
 * ---------------------------------------------------
 */

/**
 * Create an empty board.
 *
 * @param {number} size
 * @returns {number[][]}
 */

export function generateEmptyBoard(size) {

  if (!Number.isInteger(size)) {
    throw new Error("Board size must be an integer.");
  }

  if (size < 4 || size > 20) {
    throw new Error(
      "Board size must be between 4 and 20."
    );
  }

  return Array.from(
    { length: size },
    () => Array(size).fill(-1)
  );

}

/**
 * Clone an existing board.
 *
 * Useful for:
 * - Solver
 * - Hint Engine
 * - Undo / Redo
 */

export function cloneBoard(board) {

  return board.map(row => [...row]);

}

/**
 * Check if coordinates are inside board.
 */

export function isInsideBoard(board, row, col) {

  return (
    row >= 0 &&
    col >= 0 &&
    row < board.length &&
    col < board.length
  );

}