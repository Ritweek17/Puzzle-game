import { generatePuzzle } from "../src/engine/generator/puzzleGenerator.js";

// Safety check to ensure ES modules run fine
console.log("Starting verification of MeowMaze puzzle generator...");

const levelsToTest = [1, 20, 50, 100];
const puzzlesPerLevel = 50; // Total 200 puzzles

const statistics = {};

let globalPuzzleCounter = 1;

for (const level of levelsToTest) {
  console.log(`\n========================================`);
  console.log(`TESTING LEVEL ${level}`);
  console.log(`========================================`);

  const catLayouts = new Set();
  const regionMaps = new Set();
  let totalAttempts = 0;
  let minAttempts = Infinity;
  let maxAttempts = -Infinity;
  let totalTime = 0;
  let uniqueCount = 0;

  for (let i = 0; i < puzzlesPerLevel; i++) {
    const startTime = Date.now();
    const puzzle = generatePuzzle(level);
    const elapsed = Date.now() - startTime;

    const attempts = puzzle.metadata.attempts;
    totalAttempts += attempts;
    if (attempts < minAttempts) minAttempts = attempts;
    if (attempts > maxAttempts) maxAttempts = attempts;

    totalTime += elapsed;

    // Serialize cat coordinates to get uniqueness signature
    const catCoordsStr = puzzle.cats
      .map(c => `(${c.row},${c.col})`)
      .sort()
      .join(",");
    
    if (!catLayouts.has(catCoordsStr)) {
      uniqueCount++;
      catLayouts.add(catCoordsStr);
    }

    // Serialize region map
    const regionSig = puzzle.regions.map(row => row.join("")).join("|");
    regionMaps.add(regionSig);

    console.log(`Puzzle #${globalPuzzleCounter}`);
    console.log(`  Level: ${level}`);
    console.log(`  Attempts: ${attempts}`);
    console.log(`  Generation time: ${elapsed}ms`);
    console.log(`  Cats: ${catCoordsStr}`);
    console.log(`  Region Signature: ${regionSig}`);
    console.log("----------------------------------------");

    globalPuzzleCounter++;
  }

  const uniqueLayoutRatio = (catLayouts.size / puzzlesPerLevel) * 100;
  const uniqueRegionRatio = (regionMaps.size / puzzlesPerLevel) * 100;
  const avgAttempts = totalAttempts / puzzlesPerLevel;
  const avgTime = totalTime / puzzlesPerLevel;

  statistics[level] = {
    puzzlesPerLevel,
    uniqueLayoutRatio,
    uniqueRegionRatio,
    avgAttempts,
    minAttempts,
    maxAttempts,
    avgTime,
  };
}

console.log("\n========================================");
console.log("SUMMARY STATISTICS");
console.log("========================================");
for (const level of levelsToTest) {
  const stats = statistics[level];
  console.log(`Level ${level}:`);
  console.log(`  Puzzles generated: ${stats.puzzlesPerLevel}`);
  console.log(`  Unique Cat Layouts: ${stats.uniqueLayoutRatio.toFixed(1)}% (${stats.uniqueLayoutRatio >= 90 ? "PASS" : "INFO"})`);
  console.log(`  Unique Region Shapes: ${stats.uniqueRegionRatio.toFixed(1)}%`);
  console.log(`  Average Attempts: ${stats.avgAttempts.toFixed(2)} (Min: ${stats.minAttempts}, Max: ${stats.maxAttempts})`);
  console.log(`  Average Generation Time: ${stats.avgTime.toFixed(1)}ms`);
  console.log("----------------------------------------");
}
