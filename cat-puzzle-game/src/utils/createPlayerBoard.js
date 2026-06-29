/**
 * ----------------------------------------------------
 * File : createPlayerBoard.js
 *
 * Purpose :
 * Creates player's empty board.
 *
 * Status :
 * Final
 * ----------------------------------------------------
 */

import { CELL_STATE } from "../constants/gameConstants";

export default function createPlayerBoard(size) {
  return Array.from(
    { length: size },
    (_, row) =>
      Array.from(
        { length: size },
        (_, col) => ({
          row,
          col,

          state: CELL_STATE.EMPTY,

          revealed: false,

          locked: false,
        })
      )
  );
}