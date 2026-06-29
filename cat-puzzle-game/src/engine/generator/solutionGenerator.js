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

/**
 * Check if cat placement is valid.
 */
function canPlace(solution, row, col) {
  for (const cat of solution) {
    // Same column
    if (cat.col === col) {
      return false;
    }

    // Adjacent
    if (
      Math.abs(cat.row - row) <= 1 &&
      Math.abs(cat.col - col) <= 1
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Recursive backtracking.
 */
function solve(size, row, solution, random) {
  if (row === size) {
    return true;
  }

  const columns = shuffle(
    [...Array(size).keys()],
    random
  );

  for (const col of columns) {
    if (!canPlace(solution, row, col)) {
      continue;
    }

    solution.push({
      row,
      col,
    });

    if (
      solve(
        size,
        row + 1,
        solution,
        random
      )
    ) {
      return true;
    }

    solution.pop();
  }

  return false;
}

/**
 * Generate complete solution.
 */
export function generateSolution(
  size,
  random
) {
  const solution = [];

  const success = solve(
    size,
    0,
    solution,
    random
  );

  if (!success) {
    throw new Error(
      "Unable to generate solution."
    );
  }

  return solution;
}