/**
 * ---------------------------------------------------
 * File: solutionGenerator.js
 *
 * Purpose:
 * Generates a valid cat solution.
 *
 * Rules:
 * - One cat per row
 * - One cat per column
 * - No adjacent cats
 * ---------------------------------------------------
 */

/**
 * Shuffle array using seeded random.
 */
function shuffle(array, random) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function canPlace(solution, row, col) {
  for (const cat of solution) {
    // Same column or same row check
    if (cat.col === col) return false;
    if (cat.row === row) return false;

    // Adjacent checks (horizontal, vertical, diagonal)
    if (
      Math.abs(cat.row - row) <= 1 &&
      Math.abs(cat.col - col) <= 1
    ) {
      return false;
    }
  }

  return true;
}

function solveRandomRows(size, rows, rowIndex, solution, random) {
  if (rowIndex === size) {
    return true;
  }

  const row = rows[rowIndex];
  const columns = shuffle([...Array(size).keys()], random);

  for (const col of columns) {
    if (canPlace(solution, row, col)) {
      solution.push({
        row,
        col,
      });

      if (solveRandomRows(size, rows, rowIndex + 1, solution, random)) {
        return true;
      }

      solution.pop();
    }
  }

  return false;
}

export function generateSolution(size, random) {
  const solution = [];
  const rows = shuffle([...Array(size).keys()], random);

  const success = solveRandomRows(size, rows, 0, solution, random);

  if (!success) {
    throw new Error("Unable to generate solution.");
  }

  return solution;
}