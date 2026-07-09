import { generateSolution } from './src/engine/generator/solutionGenerator.js';
import { generateRegions } from './src/engine/generator/region/index.js';
import { generateCats } from './src/engine/generator/catGenerator.js';

const size = 6;
const random = Math.random;
let uniqueCount = 0;
let emptyCount = 0;

for(let i=0; i<1000; i++) {
  const board = Array(size).fill(0).map(()=>Array(size).fill(-1));
  const baseCats = generateSolution(size, random);
  try {
    const regions = generateRegions(board, baseCats, random);
    const cats = generateCats(regions, random);
    if (cats.length > 0) {
      uniqueCount++;
    } else {
      emptyCount++;
    }
  } catch (e) {
    // some error in generation
  }
}

console.log(`Out of 1000 attempts, ${uniqueCount} were unique puzzles, ${emptyCount} failed validation.`);
