/**
 * ----------------------------------------------------
 * File : Game.jsx
 *
 * Purpose :
 * Main gameplay screen.
 *
 * Status :
 * Final v1.0
 * ----------------------------------------------------
 */

import { useParams } from "react-router-dom";

import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import TopBar from "../../components/TopBar/TopBar";
import BottomBar from "../../components/BottomBar/BottomBar";
import Board from "../../components/Board/Board";

import useGame from "../../hooks/useGame";

function Game() {

  const { id } = useParams();

  const level = Number(id) || 1;

  const {

    puzzle,

    playerBoard,

    lives,

    hints,

    foundCats,

    totalCats,

    completed,

    gameOver,

    handleCellClick,

    handleCellDoubleClick,

    resetGame,

    undoLastMove,

    useHint,

  } = useGame(level);

  if (!puzzle) {

    return (

      <div className="flex items-center justify-center min-h-screen">

        Loading...

      </div>

    );

  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC]">

      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">

        <TopBar

          level={level}

          lives={lives}

          hints={hints}

          foundCats={foundCats}

          totalCats={totalCats}

        />

        <div className="flex justify-center mt-8">

          <Board

            puzzle={puzzle}

            playerBoard={playerBoard}

            onCellClick={handleCellClick}

            onCellDoubleClick={handleCellDoubleClick}

          />

        </div>

        <BottomBar

          onHint={useHint}

          onUndo={undoLastMove}

          onReset={resetGame}

        />

        {completed && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">

              <h1 className="text-4xl font-bold text-green-600">

                🎉 Level Complete!

              </h1>

              <p className="mt-4 text-gray-600">

                Great Job!

              </p>

            </div>

          </div>

        )}

        {gameOver && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">

              <h1 className="text-4xl font-bold text-red-600">

                💀 Game Over

              </h1>

              <button

                onClick={resetGame}

                className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"

              >

                Play Again

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default Game;