import { createPuzzle } from "../../types/puzzle";

import { getPuzzleConfig } from "../difficulty";
import { validatePuzzle } from "../validator";

import { generateEmptyBoard } from "./boardGenerator";
import { generateRegions } from "./region";
import { generateCats, hasAlternativeSolution } from "./catGenerator";

import { generateSolution } from "./solutionGenerator";
import { createSeed, seededRandom } from "../seed";

/**
 * Generate complete puzzle.
 */
export function generatePuzzle(level, customSeed = null) {
  // Difficulty Configuration
  const config = getPuzzleConfig(level);

  let seed = customSeed !== null ? customSeed : (level * 1000000 + Math.floor(Math.random() * 1000000));
  let random = seededRandom(seed);

  const MAX_ATTEMPTS = 50000;
  const startTime = Date.now();

  let success = false;
  let finalPuzzle = null;

  for (let resetCount = 0; resetCount < 5; resetCount++) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
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

      // 3. Ensure Exactly One Solution (Check if there is any alternative solution)
      const hasAlt = hasAlternativeSolution(regions, baseCats, random);
      if (hasAlt) {
        continue;
      }
      
      const cats = baseCats;

      // Create Puzzle
      const puzzle = createPuzzle({
        level,
        difficulty: config.difficulty,
        gridSize: config.gridSize,
      });

      puzzle.board = board;
      puzzle.regions = regions;
      puzzle.cats = cats;
      puzzle.metadata.seed = seed;
      puzzle.metadata.attempts = (resetCount * MAX_ATTEMPTS) + attempt;

      // Validate
      const validation = validatePuzzle(puzzle);

      if (validation.valid) {
        const generationTime = Date.now() - startTime;
        const coordsStr = cats.map(c => `(${c.row},${c.col})`).join(", ");

        console.log("----------------------------------------");
        console.log(`Level: ${level}`);
        console.log(`Seed: ${seed}`);
        console.log(`Attempts: ${puzzle.metadata.attempts}`);
        console.log(`Generation time: ${generationTime}ms`);
        console.log(`Cat coordinates: ${coordsStr}`);
        console.log("----------------------------------------");

        finalPuzzle = puzzle;
        success = true;
        break;
      }
    }

    if (success) {
      break;
    }

    // Reset entropy and retry
    seed = level * 1000000 + Math.floor(Math.random() * 1000000);
    random = seededRandom(seed);
  }

  if (!success) {
    throw new Error(
      `Unable to generate puzzle after safety limits reached.`
    );
  }

  return finalPuzzle;
}