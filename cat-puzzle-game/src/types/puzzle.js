/**
 * Puzzle Object Template
 * ----------------------
 * Every generated puzzle in MeowMaze
 * follows this structure.
 */

export function createPuzzle({
  level,
  difficulty,
  gridSize,
  regionCount,
}) {
  return {
    // Basic Information
    level,
    difficulty,

    // Board
    gridSize,
    regionCount,

    // Generated Data
    regions: [],

    // Player State
    cats: [],

    // Final Solution
    solution: [],

    // Game Stats
    moves: 0,
    hintsUsed: 0,
    mistakes: 0,

    // Status
    completed: false,

    createdAt: Date.now(),
  };
}