import {
  oneCatPerRegion,
  oneCatPerRow,
  oneCatPerColumn,
  noAdjacentCats,
} from "./rules";

/**
 * Validate entire puzzle.
 *
 * @param {Object} puzzle
 * @returns {{
 *   valid: boolean,
 *   errors: string[]
 * }}
 */

export function validatePuzzle(puzzle) {
  const errors = [];

  if (!oneCatPerRegion(puzzle)) {
    errors.push("Each region must contain exactly one cat.");
  }

  if (!oneCatPerRow(puzzle)) {
    errors.push("Each row must contain exactly one cat.");
  }

  if (!oneCatPerColumn(puzzle)) {
    errors.push("Each column must contain exactly one cat.");
  }

  if (!noAdjacentCats(puzzle)) {
    errors.push("Cats cannot touch each other.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}