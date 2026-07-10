/**
 * ----------------------------------------
 * File: difficulty.js
 *
 * Purpose:
 * Returns puzzle configuration
 * based on current level.
 * ----------------------------------------
 */

const LEVEL_RANGES = [
  { min: 1, max: 10, difficulty: "Very Easy", grid: 4 },
  { min: 11, max: 30, difficulty: "Easy", grid: 5 },
  { min: 31, max: Infinity, difficulty: "Medium/Hard", grid: 6 },
];

export function getPuzzleConfig(level) {
  if (typeof level !== "number" || level < 1) {
    throw new Error("Invalid level.");
  }

  const config = LEVEL_RANGES.find(
    (range) =>
      level >= range.min &&
      level <= range.max
  );

  if (!config) {
    throw new Error("No configuration found.");
  }

  return {
    level,

    difficulty: config.difficulty,

    gridSize: config.grid,

    // One region per row/column
    regionCount: config.grid,

    hints: config.grid <= 7,

    timer: config.grid >= 10,

    maxRetries: config.grid <= 8 ? 50000 : 100000,
  };
}