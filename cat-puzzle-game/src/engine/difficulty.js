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
  { min: 1, max: 20, difficulty: "Beginner", grid: 4 },
  { min: 21, max: 40, difficulty: "Easy", grid: 5 },
  { min: 41, max: 60, difficulty: "Easy+", grid: 6 },
  { min: 61, max: 80, difficulty: "Normal", grid: 7 },
  { min: 81, max: 100, difficulty: "Medium", grid: 8 },
  { min: 101, max: 120, difficulty: "Medium+", grid: 9 },
  { min: 121, max: 140, difficulty: "Hard", grid: 10 },
  { min: 141, max: 170, difficulty: "Hard+", grid: 11 },
  { min: 171, max: 200, difficulty: "Expert", grid: 12 },
  { min: 201, max: 230, difficulty: "Master", grid: 13 },
  { min: 231, max: 260, difficulty: "Grandmaster", grid: 14 },
  { min: 261, max: 290, difficulty: "Legend", grid: 15 },
  { min: 291, max: 320, difficulty: "Mythic", grid: 16 },
  { min: 321, max: 360, difficulty: "Immortal", grid: 17 },
  { min: 361, max: 400, difficulty: "Infinite", grid: 18 },
  { min: 401, max: Infinity, difficulty: "God Mode", grid: 20 },
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

    maxRetries: config.grid <= 8 ? 500 : 5000,
  };
}