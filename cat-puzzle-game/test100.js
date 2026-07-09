import { generatePuzzle } from './src/engine/generator/puzzleGenerator.js';

let duplicates = 0;
const uniqueCats = new Set();
for (let i = 1; i <= 100; i++) {
  try {
    const puzzle = generatePuzzle(i);
    // Sort coordinates to ensure order doesn't mask duplicates
    const catStr = JSON.stringify(
      puzzle.cats.sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col)
    );
    if (uniqueCats.has(catStr)) {
      duplicates++;
      console.log(`Duplicate found on level ${i}`);
    } else {
      uniqueCats.add(catStr);
      console.log(`Level ${i} unique cats:`, catStr);
    }
  } catch (e) {
    console.error(`Error on level ${i}:`, e.message);
  }
}
console.log(`\nTotal generated: 100`);
console.log(`Total duplicates: ${duplicates}`);
