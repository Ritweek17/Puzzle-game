import { generatePuzzle } from './src/engine/generator/puzzleGenerator.js';

console.log('Generating 200 puzzles for Level 51 (7x7)...');

const layouts = new Set();
let duplicates = 0;

for (let i = 1; i <= 200; i++) {
  try {
    const puzzle = generatePuzzle(51);
    
    // Extract cat coordinates
    const cats = puzzle.cats;
    
    const catStr = JSON.stringify(cats);
    console.log(`Puzzle ${i}`);
    console.log(`Cat Coordinates: ${catStr}`);
    
    if (layouts.has(catStr)) {
      duplicates++;
    }
    layouts.add(catStr);
    
  } catch (e) {
    console.log(`Error generating puzzle ${i}: ${e.message}`);
  }
}

console.log(`\nVerification Complete.`);
console.log(`Total generated: 200`);
console.log(`Unique layouts: ${layouts.size}`);
console.log(`Duplicates: ${duplicates}`);
