import { generatePuzzle } from './src/engine/generator/puzzleGenerator.js';
import { getPuzzleConfig } from './src/engine/difficulty.js';
const solutions = [];
for (let i = 1; i <= 50; i++) {
  try {
    const puzzle = generatePuzzle(i);
    solutions.push({ level: i, cats: puzzle.cats });
  } catch (e) {
    console.error(`Error on level ${i}:`, e.message);
  }
}
console.log(JSON.stringify(solutions, null, 2));
