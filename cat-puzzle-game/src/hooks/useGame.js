/**
 * ----------------------------------------------------
 * File : useGame.js
 *
 * Purpose :
 * Gameplay engine.
 *
 * Status :
 * Part 1
 * Do not modify.
 * ----------------------------------------------------
 */

import { useMemo, useState } from "react";

import { generatePuzzle } from "../engine/generator";

import createPlayerBoard from "../utils/createPlayerBoard";

import {
  MAX_LIVES,
  MAX_HINTS,
} from "../constants/gameConstants";

export default function useGame(level = 1) {

  /**
   * -----------------------------------
   * Puzzle
   * -----------------------------------
   */

  const puzzle = useMemo(() => {
    return generatePuzzle(level);
  }, [level]);

  /**
   * -----------------------------------
   * Player Board
   * -----------------------------------
   */

  const [playerBoard, setPlayerBoard] =
    useState(() =>
      createPlayerBoard(
        puzzle.gridSize
      )
    );

  /**
   * -----------------------------------
   * Lives
   * -----------------------------------
   */

  const [lives, setLives] =
    useState(MAX_LIVES);

  /**
   * -----------------------------------
   * Hints
   * -----------------------------------
   */

  const [hints, setHints] =
    useState(MAX_HINTS);

  /**
   * -----------------------------------
   * Found Cats
   * -----------------------------------
   */

  const [foundCats, setFoundCats] =
    useState(0);

  /**
   * -----------------------------------
   * Completed
   * -----------------------------------
   */

  const [completed, setCompleted] =
    useState(false);

  /**
   * -----------------------------------
   * Game Over
   * -----------------------------------
   */

  const [gameOver, setGameOver] =
    useState(false);

  /**
   * -----------------------------------
   * Total Cats
   * -----------------------------------
   */

  const totalCats =
    puzzle.cats.length;

  /**
   * -----------------------------------
   * Reset
   * -----------------------------------
   */

  function resetGame() {

    setPlayerBoard(
      createPlayerBoard(
        puzzle.gridSize
      )
    );

    setLives(MAX_LIVES);

    setHints(MAX_HINTS);

    setFoundCats(0);

    setCompleted(false);

    setGameOver(false);

  }

  /**
   * -----------------------------------
   * Utility
   * Returns true if hidden cat exists.
   * -----------------------------------
   */

  function hasHiddenCat(
    row,
    col
  ) {

    return puzzle.cats.some(
      (cat) =>
        cat.row === row &&
        cat.col === col
    );

  }

  /**
   * -----------------------------------
   * Utility
   * Clone board.
   * -----------------------------------
   */

  function cloneBoard() {

    return playerBoard.map(
      (row) =>
        row.map(
          (cell) => ({ ...cell })
        )
    );

  }

  /**
   * -----------------------------------
   * Single Click
   *
   * (Will implement in Part 2)
   * -----------------------------------
   */

/**
 * -----------------------------------
 * Single Click
 *
 * EMPTY -> CROSS
 *
 * Revealed / Locked cells ignore click.
 * -----------------------------------
 */

function handleCellClick(row, col) {

  if (completed || gameOver) return;

  const board = cloneBoard();

  const cell = board[row][col];

  if (cell.locked) return;

  if (cell.revealed) return;

  if (cell.state === "empty") {

    cell.state = "cross";

  } else if (cell.state === "cross") {

    cell.state = "empty";

  }

  setPlayerBoard(board);

}

/**
 * -----------------------------------
 * Double Click
 *
 * CROSS -> Reveal
 * -----------------------------------
 */

function handleCellDoubleClick(row, col) {

  if (completed || gameOver) return;

  const board = cloneBoard();

  const cell = board[row][col];

  if (cell.locked) return;

  if (cell.revealed) return;

  // Player must mark cross first
  if (cell.state !== "cross") return;

  const correct = hasHiddenCat(row, col);

  if (correct) {

    cell.state = "revealed";

    cell.revealed = true;

    cell.locked = true;

    const newFound = foundCats + 1;

    setFoundCats(newFound);

    if (newFound === totalCats) {

      setCompleted(true);

    }

  } else {

    cell.state = "exploded";

    cell.revealed = true;

    cell.locked = true;

    const newLives = lives - 1;

    setLives(newLives);

    if (newLives <= 0) {

      setGameOver(true);

    }

  }

  setPlayerBoard(board);
}

}

  