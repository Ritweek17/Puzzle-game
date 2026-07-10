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
import { validatePuzzle } from "../engine/validator";
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
    puzzle.gridSize;

  /**
   * -----------------------------------
   * Reset Board
   * whenever level changes
   * -----------------------------------
   */

  useEffect(() => {

    console.log("puzzle.cats:", puzzle.cats);

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

    return cell.state !== CELL_STATE.REVEALED;

  });

}

  /**
   * -----------------------------------
   * Get Unplaced Solution Cats
   * -----------------------------------
   */
  function getUnplacedSolutionCats() {
    return puzzle.cats.filter((cat) => {
      const cell = playerBoard[cat.row][cat.col];
      return cell.state !== CELL_STATE.REVEALED;
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

  function checkWin() {

    const placedCats = [];

    playerBoard.forEach((r) =>

      r.forEach((c) => {

        if (c.state === CELL_STATE.REVEALED) {

          placedCats.push({ row: c.row, col: c.col });

        }

      })

    );

    const isWon =

      placedCats.length === puzzle.gridSize &&

      validatePuzzle({

        ...puzzle,

        cats: placedCats,

      }).valid;

    if (isWon) {

      setCompleted(true);

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

  const cell = playerBoard[row][col];

  // Ignore clicks on already solved (cat/boom) or locked cells
  if (cell.state === CELL_STATE.REVEALED || cell.state === CELL_STATE.EXPLODED) {

    return;

  }

  if (cell.locked) return;

  saveHistory();

  const board = cloneBoard();

  const targetCell = board[row][col];

  // EMPTY click -> CROSS
  if (targetCell.state === CELL_STATE.EMPTY) {

    playSound("click");

    targetCell.state = CELL_STATE.CROSS;

  } 
  // CROSS click -> Solution Check
  else if (targetCell.state === CELL_STATE.CROSS) {

    const isCorrect = puzzle.cats.some(

      (cat) => cat.row === row && cat.col === col

    );

    if (isCorrect) {

      playSound("correct");

      targetCell.state = CELL_STATE.REVEALED;

      targetCell.locked = true;

      targetCell.revealed = true;

    } else {

      playSound("wrong");

      targetCell.state = CELL_STATE.EXPLODED;

      targetCell.locked = true;

      targetCell.revealed = true;

      const nextLives = lives - 1;

      setLives(nextLives);

      setWrongClicks((prev) => prev + 1);

      // Shake board on incorrect guess
      setShakeBoard(true);

      setTimeout(() => {

        setShakeBoard(false);

      }, 350);

      if (nextLives <= 0) {

        setGameOver(true);

      }

    }

  }

  setPlayerBoard(board);

  // Recalculate found cats from board state
  let nextFound = 0;

  board.forEach((r) =>

    r.forEach((c) => {

      if (c.state === CELL_STATE.REVEALED) {

        nextFound++;

      }

    })

  );

  setFoundCats(nextFound);

  // Level complete only when all generated solution cats are found
  if (nextFound === puzzle.cats.length) {

    setCompleted(true);

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

  const unplacedCats = getUnplacedSolutionCats();

  if (unplacedCats.length === 0) return;

  const randomCat =

    unplacedCats[

      Math.floor(

        Math.random() * unplacedCats.length

      )

    ];

  const board = cloneBoard();

  const cell =

    board[randomCat.row][randomCat.col];

  playSound("hint");

  revealCorrect(cell);

  setHints(

    (prev) => prev - 1

  );

  setPlayerBoard(board);

  // Recalculate found cats from board state
  let nextFound = 0;

  board.forEach((r) =>

    r.forEach((c) => {

      if (c.state === CELL_STATE.REVEALED) {

        nextFound++;

      }

    })

  );

  setFoundCats(nextFound);

  if (nextFound === puzzle.cats.length) {

    setCompleted(true);

  }

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