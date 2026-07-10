import { validatePuzzle } from "../src/engine/validator/validator.js";

// Let's mock a puzzle object for a 4x4 grid
const puzzle = {
  gridSize: 4,
  regions: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [2, 2, 3, 3],
    [2, 2, 3, 3]
  ]
};

// 4 cats in the same row: (0,0), (0,1), (0,2), (0,3)
const badCats = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 0, col: 3 }
];

const validation = validatePuzzle({
  ...puzzle,
  cats: badCats
});

console.log("Validation result for bad cats:", validation);
