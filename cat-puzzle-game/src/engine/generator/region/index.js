import { placeSeeds } from "./placeSeeds";
import { createTargetSizes } from "./targetSizes";
import { growRegions } from "./growRegions";
import { fillEmptyCells } from "./fillEmptyCells";

export function generateRegions(board, cats, random) {
  const { regions, seeds } = placeSeeds(
    board,
    cats,
    random
  );

  const targets = createTargetSizes(
    board.length,
    cats.length,
    random
  );

  const grown = growRegions(
    regions,
    seeds,
    targets,
    random
  );

  return fillEmptyCells(
    grown,
    random
  );
}