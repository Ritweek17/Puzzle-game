/**
 * ----------------------------------------
 * File: puzzleGenerator.js
 *
 * Purpose:
 * Generates a complete puzzle.
 *
 * Flow:
 * Board
 *   ↓
 * Regions
 *   ↓
 * Cats
 *   ↓
 * Validator
 *   ↓
 * Retry until valid
 * ----------------------------------------
 */

import { createPuzzle } from "../../types/puzzle";

import { getPuzzleConfig } from "../difficulty";
import { createSeed, seededRandom } from "../seed";
import { validatePuzzle } from "../validator";

import { generateEmptyBoard } from "./boardGenerator";
import { generateRegions } from "./region";
import { generateCats } from "./catGenerator";

/**
 * Generate complete puzzle.
 */
export function generatePuzzle(level) {

  // Difficulty Configuration
  const config = getPuzzleConfig(level);

  // Seed
  const seed = createSeed(level);

  const random = seededRandom(seed);

  // Empty Board
  const board = generateEmptyBoard(
    config.gridSize
  );

  // Regions
  const regions = generateRegions(
    board,
    config.regionCount,
    random
  );

  // Retry until valid puzzle
  for (
    let attempt = 1;
    attempt <= config.maxRetries;
    attempt++
  ) {

    // Generate candidate cats
    const cats = generateCats(
      regions,
      random
    );

    // Create puzzle
    const puzzle = createPuzzle({

      level,

      difficulty:
        config.difficulty,

      gridSize:
        config.gridSize,

    });

    puzzle.board = board;

    puzzle.regions = regions;

    puzzle.cats = cats;

    puzzle.metadata.seed = seed;

    puzzle.metadata.attempts =
      attempt;

    // Validate
    const validation =
      validatePuzzle(puzzle);

    if (validation.valid) {

      console.log(
        `✅ Puzzle generated after ${attempt} attempt(s)`
      );

      return puzzle;

    }

  }

  throw new Error(
    `Unable to generate puzzle after ${config.maxRetries} attempts.`
  );

}