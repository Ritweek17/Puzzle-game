/**
 * MeowMaze Puzzle Generator Verification Tool
 * 
 * Purpose:
 * Validates the correctness, uniqueness, and execution speed of the 
 * procedural puzzle generator across different difficulty levels.
 * 
 * Usage:
 * npx vite-node tools/verify_generator.js
 */

import { generatePuzzle } from "../src/engine/generator/puzzleGenerator.js";
import { generateCats } from "../src/engine/generator/catGenerator.js";

console.log("=========================================");
console.log("🐱 MeowMaze Generator Verification System");
console.log("=========================================");

const testLevels = [1, 20, 50, 100];
const iterationsPerLevel = 20;

let allPassed = true;

for (const level of testLevels) {
  console.log(`\nTesting Level ${level} (Running ${iterationsPerLevel} generations)...`);
  let totalTime = 0;
  let maxTime = 0;
  let uniqueCount = 0;
  let successCount = 0;

  for (let i = 0; i < iterationsPerLevel; i++) {
    const start = Date.now();
    try {
      const puzzle = generatePuzzle(level);
      const duration = Date.now() - start;
      
      totalTime += duration;
      maxTime = Math.max(maxTime, duration);
      successCount++;

      // Verify that the generated puzzle has exactly 1 valid solution (uniqueness test)
      const solutions = generateCats(puzzle.regions, Math.random);
      if (solutions.length === 1) {
        uniqueCount++;
      }
    } catch (e) {
      console.error(`  [FAIL] Generation failed at iteration ${i}:`, e.message);
    }
  }

  const avgTime = (totalTime / iterationsPerLevel).toFixed(2);
  const uniquenessPercentage = ((uniqueCount / iterationsPerLevel) * 100).toFixed(0);

  console.log(`  Success rate : ${successCount}/${iterationsPerLevel}`);
  console.log(`  Uniqueness   : ${uniquenessPercentage}% (Expects 100%)`);
  console.log(`  Average time : ${avgTime}ms`);
  console.log(`  Max time     : ${maxTime}ms`);

  if (successCount !== iterationsPerLevel || uniqueCount !== iterationsPerLevel) {
    allPassed = false;
  }
}

console.log("\n=========================================");
if (allPassed) {
  console.log("🟢 All Generator Verification Tests PASSED!");
} else {
  console.log("🔴 Some Verification Tests FAILED. Please audit regions or target sizes.");
}
console.log("=========================================");
