import { createPuzzle } from "../../types/puzzle";

import { getPuzzleConfig } from "../difficulty";

import { createSeed, seededRandom } from "../seed";

import {
  generateEmptyBoard,
  generateRegions,
} from "./index";

export function generatePuzzle(level) {
  // Difficulty
  const config = getPuzzleConfig(level);

  // Seed
  const seed = createSeed(level);

  const random = seededRandom(seed);

  // Empty Board
  const board = generateEmptyBoard(config.gridSize);

  // Region Generation
  const regions = generateRegions(
    board,
    config.regionCount,
    random
  );

  // Puzzle Object
  const puzzle = createPuzzle({
    level,
    difficulty: config.difficulty,
    gridSize: config.gridSize,
  });

  puzzle.board = board;
  puzzle.regions = regions;

  puzzle.metadata.seed = seed;

  return puzzle;
}