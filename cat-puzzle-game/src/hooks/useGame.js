/**
 * ----------------------------------------------------
 * File : useGame.js
 *
 * Purpose :
 * Gameplay Engine
 *
 * Status :
 * Final v6
 * Part 1A
 * ----------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";

import { generatePuzzle } from "../engine/generator";
import createPlayerBoard from "../utils/createPlayerBoard";
import { playSound } from "../utils/sound";

import {
  CELL_STATE,
  MAX_HINTS,
  MAX_LIVES,
} from "../constants/gameConstants";

export default function useGame(level = 1) {

  /**
   * -----------------------------------
   * Generate Puzzle
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
 * Undo Count
 * -----------------------------------
 */

  const [undos, setUndos] =
  useState(3);

  /**
   * -----------------------------------
   * Found Cats
   * -----------------------------------
   */

  const [foundCats, setFoundCats] =
    useState(0);

  /**
   * -----------------------------------
   * Wrong Clicks
   * -----------------------------------
   */

  const [wrongClicks, setWrongClicks] =
    useState(0);

/**
 * -----------------------------------
 * Board Shake
 * -----------------------------------
 */

const [shakeBoard, setShakeBoard] =
  useState(false);

/**
 * -----------------------------------
 * Move History
 * -----------------------------------
 */

const [history, setHistory] =
  useState([]);

  /**
   * -----------------------------------
   * Game State
   * -----------------------------------
   */

  const [completed, setCompleted] =
    useState(false);

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
   * Reset Board
   * whenever level changes
   * -----------------------------------
   */

  useEffect(() => {

    setPlayerBoard(

      createPlayerBoard(
        puzzle.gridSize
      )

    );

    setLives(MAX_LIVES);

    setHints(MAX_HINTS);
    
    setUndos(3);

    setFoundCats(0);

    setWrongClicks(0);

    setShakeBoard(false);
    
    setHistory([]);
    
    setCompleted(false);

    setGameOver(false);

  }, [puzzle]);

  /**
   * -----------------------------------
   * Reset Game
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
    
    setUndos(3);

    setFoundCats(0);

    setWrongClicks(0);

    setShakeBoard(false);

    setHistory([]); 

    setCompleted(false);

    setGameOver(false);

  }

  /**
   * -----------------------------------
   * Check Hidden Cat
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
 * Get Hidden Cats
 * -----------------------------------
 */

function getHiddenCats() {

  return puzzle.cats.filter((cat) => {

    const cell = playerBoard[cat.row][cat.col];

    return !cell.revealed;

  });

}

  /**
   * -----------------------------------
   * Clone Board
   * -----------------------------------
   */

  function cloneBoard() {

    return playerBoard.map(

      (row) =>

        row.map(

          (cell) => ({
            ...cell,
          })

        )

    );

  }

  /**
 * -----------------------------------
 * Save Current State
 * -----------------------------------
 */

/**
 * -----------------------------------
 * Save Current State
 * -----------------------------------
 */

function saveHistory() {

  setHistory((prev) => [

    ...prev,

    {

      board: cloneBoard(),

      lives,

      hints,

      foundCats,

      wrongClicks,

      completed,

      gameOver,

    },

  ]);

}
  /**
   * -----------------------------------
   * Check Win
   * -----------------------------------
   */

  function checkWin(foundCatsCount) {

    if (foundCatsCount >= totalCats) {

      setCompleted(true);

      return true;

    }

    return false;

  }

  /**
   * -----------------------------------
   * Check Game Over
   * -----------------------------------
   */

  function checkGameOver(nextLives) {

    if (nextLives <= 0) {

      setGameOver(true);

      return true;

    }

    return false;

  }

  /**
   * -----------------------------------
   * Lock Cell
   * -----------------------------------
   */

  function lockCell(cell) {

    cell.locked = true;

    cell.revealed = true;

  }

  /**
   * -----------------------------------
   * Reveal Correct Cell
   * -----------------------------------
   */

  function revealCorrect(cell) {

    cell.state = CELL_STATE.REVEALED;

    lockCell(cell);

  }

  /**
   * -----------------------------------
   * Reveal Wrong Cell
   * -----------------------------------
   */

  function revealWrong(cell) {

    cell.state = CELL_STATE.EXPLODED;

    lockCell(cell);

  }

  /**
   * -----------------------------------
   * Single Click Gameplay
   *
   * EMPTY
   *   ↓
   * CROSS
   *   ↓
   * Reveal
   * -----------------------------------
   */

/**
 * -----------------------------------
 * Single Click Gameplay
 * -----------------------------------
 */

function handleCellClick(row, col) {

  if (completed || gameOver) return;

  saveHistory();

  const board = cloneBoard();

  const cell = board[row][col];

  if (cell.locked) return;

  if (cell.revealed) return;

  /**
   * First Click
   */

  if (cell.state === CELL_STATE.EMPTY) {

    // 🔊 Click Sound
    playSound("click");

    cell.state = CELL_STATE.CROSS;

    setPlayerBoard(board);

    return;

  }

  /**
   * Second Click
   */

  if (cell.state === CELL_STATE.CROSS) {

    /**
     * Correct Cell
     */

    if (hasHiddenCat(row, col)) {

      // 🔊 Correct Sound
      playSound("correct");

      revealCorrect(cell);

      const nextFound =
        foundCats + 1;

      setFoundCats(nextFound);

      checkWin(nextFound);

    }

    /**
     * Wrong Cell
     */

    else {

      // 🔊 Wrong Sound
      playSound("wrong");

      revealWrong(cell);

      const nextLives =
        lives - 1;

      setLives(nextLives);

      setWrongClicks(

        (prev) => prev + 1

      );

      // 📳 Shake Board
      setShakeBoard(true);

      setTimeout(() => {

        setShakeBoard(false);

      }, 350);

      checkGameOver(nextLives);

    }

    setPlayerBoard(board);

  }

}
  /**
   * -----------------------------------
   * Undo
   *
   * (Sprint 2)
   * -----------------------------------
   */

 /**
 * -----------------------------------
 * Undo Last Move
 * -----------------------------------
 */

/**
 * -----------------------------------
 * Undo Last Move
 * -----------------------------------
 */

/**
 * -----------------------------------
 * Undo Last Move
 * -----------------------------------
 */

function undoLastMove() {

  if (history.length === 0) return;

  if (undos <= 0) return;

  playSound("undo");

  const previous =
    history[history.length - 1];

  setPlayerBoard(previous.board);

  setLives(previous.lives);

  setHints(previous.hints);

  setFoundCats(previous.foundCats);

  setWrongClicks(previous.wrongClicks);

  setCompleted(previous.completed);

  setGameOver(previous.gameOver);

  setHistory(

    history.slice(0, -1)

  );

  // Consume one Undo

  setUndos(

    (prev) => prev - 1

  );

}

  /**
 * -----------------------------------
 * Hint
 * -----------------------------------
 */

function useHint() {

  if (completed || gameOver) return;

  if (hints <= 0) return;
  
  saveHistory();

  const hiddenCats = getHiddenCats();

  if (hiddenCats.length === 0) return;

  const randomCat =
    hiddenCats[
      Math.floor(
        Math.random() * hiddenCats.length
      )
    ];

  const board = cloneBoard();

  const cell =
    board[randomCat.row][randomCat.col];

    playSound("hint");

  revealCorrect(cell);

  const nextFound =
    foundCats + 1;

  setFoundCats(nextFound);

  setHints(

    (prev) => prev - 1

  );

  setPlayerBoard(board);

  checkWin(nextFound);

}

  /**
   * -----------------------------------
   * Public API
   * -----------------------------------
   */

  return {

    /**
     * Puzzle
     */

    puzzle,

    /**
     * Board
     */

    playerBoard,

    /**
     * Stats
     */

    lives,

    hints,

    foundCats,

    wrongClicks,

    totalCats,

    completed,

    gameOver,

    /**
     * Actions
     */

    shakeBoard,

    handleCellClick,

    resetGame,

    undoLastMove,

    useHint,

    undos,

  };

}