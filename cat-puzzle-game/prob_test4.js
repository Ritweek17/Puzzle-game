import { generatePuzzle } from './src/engine/generator/puzzleGenerator.js';

console.log('Generating 7x7 puzzle...');
const start = Date.now();
try {
  const p = generatePuzzle(51); // Level 51 is 7x7
  console.log(`Generated in ${Date.now() - start}ms`);
} catch(e) {
  console.log('Error:', e.message);
}
