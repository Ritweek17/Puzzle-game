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
import { validatePuzzle } from "../validator";

import { generateEmptyBoard } from "./boardGenerator";
import { generateRegions } from "./region";
import { generateCats } from "./catGenerator";

import { generateSolution } from "./solutionGenerator";

/**
 * Generate complete puzzle.
 */
export function generatePuzzle(level) {

  // Difficulty Configuration
  const config = getPuzzleConfig(level);

  // Seed
  const random = Math.random;

  // Retry whole puzzle generation
  for (
    let attempt = 1;
    attempt <= config.maxRetries;
    attempt++
  ) {

    // Empty Board
    const board = generateEmptyBoard(
      config.gridSize
    );

    // 1. Generate Random Valid Cat Layout first!
    let baseCats;
    try {
      baseCats = generateSolution(config.gridSize, random);
    } catch (e) {
      continue;
    }

    // 2. Generate Regions Around Cats
    const regions = generateRegions(
      board,
      baseCats,
      random
    );

    // 3. Generate Cats (Validator: must find exactly ONE solution for these regions)
    const allSolutions = generateCats(
      regions,
      random
    );

    // Ensure Exactly One Solution
    if (allSolutions.length !== 1) {
      continue;
    }
    
    const cats = allSolutions[0];

    // Backtracking failed
    if (cats.length !== config.regionCount) {
      continue;
    }

    // Create Puzzle
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

    puzzle.metadata.seed = Date.now();

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