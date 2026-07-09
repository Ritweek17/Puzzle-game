import { generateSolution } from './src/engine/generator/solutionGenerator.js';
import { generateRegions } from './src/engine/generator/region/index.js';
import { generateCats } from './src/engine/generator/catGenerator.js';

const size = 5; // 5x5
const random = Math.random;

let counts = {};
for(let i=0; i<100; i++) {
  const board = Array(size).fill(0).map(()=>Array(size).fill(-1));
  const baseCats = generateSolution(size, random);
  const regions = generateRegions(board, baseCats, random);
  const solutions = generateCats(regions, random);
  const len = solutions.length;
  counts[len] = (counts[len] || 0) + 1;
}

console.log('5x5 Solution count distribution:');
console.log(counts);
