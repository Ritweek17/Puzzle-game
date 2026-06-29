/**
 * ----------------------------------------------------
 * File : gameConstants.js
 *
 * Purpose :
 * Stores all gameplay constants.
 *
 * Status :
 * Final (Do Not Modify)
 * ----------------------------------------------------
 */

/**
 * State of every cell.
 *
 * EMPTY     -> Nothing selected.
 * CROSS     -> Player thinks there is NO cat.
 * REVEALED  -> Cell has been opened.
 */

export const CELL_STATE = {
  EMPTY: "empty",
  CROSS: "cross",
  REVEALED: "revealed",
};

/**
 * Gameplay
 */

export const MAX_LIVES = 3;

export const MAX_HINTS = 3;

/**
 * Animation timings
 */

export const CELL_ANIMATION = 180;

/**
 * Score
 */

export const CAT_SCORE = 100;

export const WRONG_CLICK_PENALTY = 25;

/**
 * Board
 */

export const MIN_BOARD_SIZE = 4;

export const MAX_BOARD_SIZE = 20;