import { placeSeeds } from "./placeSeeds";
import { createTargetSizes } from "./targetSizes";
import { growRegions } from "./growRegions";
import { fillEmptyCells } from "./fillEmptyCells";

export function generateRegions(board, regionCount, random) {
  const { regions, seeds } = placeSeeds(
    board,
    regionCount,
    random
  );

  const targets = createTargetSizes(
    board.length,
    regionCount
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