/**
 * Creates an empty puzzle object.
 */

export function createPuzzle({
  level,
  difficulty,
  gridSize,
}) {

  return {

    level,

    difficulty,

    gridSize,

    board: [],

    regions: [],

    cats: [],

    solution: [],

    metadata: {

      seed: null,

      generatedAt: Date.now(),

    }

  };

}