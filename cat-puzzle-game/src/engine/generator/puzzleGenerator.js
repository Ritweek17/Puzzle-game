import { createPuzzle } from "../../types/puzzle";

import { getPuzzleConfig } from "../difficulty";
import { createSeed, seededRandom } from "../seed";

import { generateEmptyBoard } from "./boardGenerator";
import { generateRegions } from "./region";
import { generateCats } from "./catGenerator";

/**
 * Generates a complete puzzle for the given level.
 *
 * @param {number} level
 * @returns {Object}
 */

export function generatePuzzle(level) {
  // Get difficulty configuration
  const config = getPuzzleConfig(level);

  // Create deterministic seed
  const seed = createSeed(level);

  const random = seededRandom(seed);

  // Create empty board
  const board = generateEmptyBoard(config.gridSize);

  // Generate regions
  const regions = generateRegions(
    board,
    config.regionCount,
    random
  );

  // Generate candidate cats
  const cats = generateCats(
    regions,
    random
  );

  // Create puzzle object
  const puzzle = createPuzzle({
    level,
    difficulty: config.difficulty,
    gridSize: config.gridSize,
  });

  puzzle.board = board;
  puzzle.regions = regions;
  puzzle.cats = cats;

  puzzle.metadata.seed = seed;

  return puzzle;
}