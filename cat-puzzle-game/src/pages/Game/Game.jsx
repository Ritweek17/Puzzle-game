/**
 * ----------------------------------------------------
 * File : Game.jsx
 *
 * Purpose :
 * Main Gameplay Screen
 *
 * Status :
 * Final v6
 * Part 1
 * ----------------------------------------------------
 */

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import TopBar from "../../components/TopBar/TopBar";
import BottomBar from "../../components/BottomBar/BottomBar";
import Board from "../../components/Board/Board";
import { playSound } from "../../utils/sound";
import Confetti from "react-confetti";
import { motion } from "framer-motion"; 
import { updateStats } from "../../utils/stats";
import { ArrowLeft } from "lucide-react";


import useGame from "../../hooks/useGame";

import { completeLevel } from "../../utils/progress";

function Game() {

  const navigate = useNavigate();

  const { id } = useParams();

  const width = window.innerWidth;

  const height = window.innerHeight;

  const level = Number(id) || 1;

const {

  puzzle,

  playerBoard,

  lives,

  hints,

  undos,

  foundCats,

  wrongClicks,

  totalCats,

  completed,

  gameOver,

  shakeBoard,

  handleCellClick,

  resetGame,

  undoLastMove,

  useHint,

} = useGame(level);
  /**
   * -----------------------------------
   * Calculate Stars
   * -----------------------------------
   */

  function calculateStars() {

    if (wrongClicks <= 2) {

      return 3;

    }

    if (wrongClicks <= 4) {

      return 2;

    }

    return 1;

  }

  /**
   * -----------------------------------
   * Save Progress
   * -----------------------------------
   */

 /**
 * -----------------------------------
 * Save Progress
 * Play Win Sound
 * -----------------------------------
 */

useEffect(() => {

  if (!completed) return;

  // 🔊 Play Win Sound

  if (calculateStars() === 3) {

    playSound("threeStar");

  }

  else {

    playSound("levelComplete");

  }

  // 💾 Save Progress

  completeLevel(

    level,

    calculateStars()

  );

  // 📊 Update Statistics

  updateStats({

    gamesPlayed: 1,

    levelsCompleted: 1,

    totalStars: calculateStars(),

    wrongClicks,

    hintsUsed: 3 - hints,

    undosUsed: 3 - undos,

  });

}, [

  completed,

  level,

  wrongClicks,

  hints,

  undos,

]);

/**
 * -----------------------------------
 * Game Over Sound
 * -----------------------------------
 */

useEffect(() => {

  if (!gameOver) return;

  playSound("gameOver");

}, [gameOver]);

  /**
   * -----------------------------------
   * Loading
   * -----------------------------------
   */

  if (!puzzle) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  /**
   * -----------------------------------
   * Next Level
   * -----------------------------------
   */

  function handleNextLevel() {

    navigate(`/game/${level + 1}`);

  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC]">

  <BackgroundDecoration />

  <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">

    {/* Header */}

    <div className="flex items-start gap-4">

      {/* Top Bar */}

      <div className="flex-1">

        <TopBar

          showBack

          onBack={() => navigate("/levels")}

          level={level}

          lives={lives}

          hints={hints}

          foundCats={foundCats}

          totalCats={totalCats}

          completed={completed}

          gameOver={gameOver}

        />

      </div>

    </div>

    {/* Board */}

    <div className="mt-8 flex justify-center">

      <Board

        puzzle={puzzle}

        playerBoard={playerBoard}

        onCellClick={handleCellClick}

        shake={shakeBoard}

      />

    </div>

    {/* Bottom Bar */}

    <BottomBar

      onHint={useHint}

      onUndo={undoLastMove}

      onReset={resetGame}

      hints={hints}

      undos={undos}

      gameOver={gameOver}

      completed={completed}

    />
      {/* 🎊 Confetti */}

    {completed && (

      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={300}
        gravity={0.18}
      />

    )}

      </div>
      {/* -----------------------------------
          WIN POPUP
      ----------------------------------- */}

      {completed && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[380px] text-center">

            <h1 className="text-5xl mb-3">
              🏆
            </h1>

            <h2 className="text-3xl font-bold text-green-600">

              Level Complete!

            </h2>

            <div className="flex justify-center gap-2 text-5xl mt-6">

              {Array.from({

              length: calculateStars(),

              }).map((_, index) => (

            <motion.span

            key={index}

            initial={{
            scale: 0,
            rotate: -180,
            opacity: 0,
          }}

      animate={{
        scale: [0, 1.4, 1],
        rotate: [-180, 20, -10, 0],
        opacity: 1,
      }}

      transition={{
        delay: index * 0.25,
        duration: 0.5,
        ease: "easeOut",
      }}

      whileHover={{
        scale: 1.25,
        rotate: 10,
      }}

      className="cursor-default"

    >

      ⭐

    </motion.span>

  ))}

</div>

            <div className="mt-6 space-y-2 text-lg">

              <p>

                Wrong Clicks :
                <span className="font-bold">

                  {" "}
                  {wrongClicks}

                </span>

              </p>

              <p>

                Lives Left :
                <span className="font-bold">

                  {" "}
                  {lives}

                </span>

              </p>

            </div>

            <button

              onClick={handleNextLevel}

              className="mt-8 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition"

            >

              Next Level →

            </button>

          </div>

        </div>

      )}

      {/* -----------------------------------
          GAME OVER
      ----------------------------------- */}

      {gameOver && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[380px] text-center">

            <h1 className="text-5xl mb-3">
              💀
            </h1>

            <h2 className="text-3xl font-bold text-red-600">

              Game Over

            </h2>

            <p className="mt-5 text-gray-600">

              Better luck next time!

            </p>

            <button

              onClick={resetGame}

              className="mt-8 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition"

            >

              Play Again

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Game;