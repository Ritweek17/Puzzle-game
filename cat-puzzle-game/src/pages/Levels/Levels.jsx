/**
 * ----------------------------------------------------
 * File : Levels.jsx
 *
 * Purpose :
 * Level Selection Screen
 *
 * Status :
 * Final v2
 * Part 1
 * ----------------------------------------------------
 */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

import TopBar from "../../components/TopBar/TopBar";
import LevelCard from "../../components/LevelCard/LevelCard";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";

import levels from "../../data/levels";

import happyCat from "../../assets/mascot/happy.png";

import {
  isLocked,
  isCompleted,
  getStars,
} from "../../utils/progress";

function Levels() {

  const navigate = useNavigate();

  /**
   * -----------------------------------
   * Difficulty
   * -----------------------------------
   */

  const [difficulty, setDifficulty] =
    useState("Easy");

  /**
   * -----------------------------------
   * Filter Levels
   * -----------------------------------
   */

  const filteredLevels = useMemo(() => {

    return levels.filter(

      (level) =>

        level.difficulty === difficulty

    );

  }, [difficulty]);

  /**
   * -----------------------------------
   * Progress
   * -----------------------------------
   */

  const completedLevels = levels.filter(

    (level) =>

      isCompleted(level.id)

  ).length;

  const totalLevels =
    levels.length;

  const progress =

    (completedLevels /
      totalLevels) *

    100;

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <BackgroundDecoration />

      <div className="relative z-10 max-w-6xl mx-auto">

        <TopBar

          title="Level Select"

          rightIcon={<Trophy size={22} />}

        />

        {/* Hero */}

        <motion.div

          initial={{

            opacity: 0,

            y: 20,

          }}

          animate={{

            opacity: 1,

            y: 0,

          }}

          transition={{

            duration: 0.5,

          }}

          className="text-center mt-8"

        >

          <img

            src={happyCat}

            alt="Happy Cat"

            className="w-28 mx-auto  rounded-full shadow-lg"

          />

          <h2 className="text-4xl font-bold mt-5 text-[#2E2E3A]">

            Choose Your Challenge

          </h2>

          <p className="mt-2 text-gray-600">

            Complete puzzles to unlock new levels.

          </p>

        </motion.div>

        {/* Progress */}

        <motion.div

          initial={{

            opacity: 0,

          }}

          animate={{

            opacity: 1,

          }}

          transition={{

            delay: 0.2,

          }}

          className="mt-10 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-6"

        >

          <div className="flex justify-between font-semibold mb-3">

            <span>

              Progress

            </span>

            <span>

              {completedLevels}/
              {totalLevels}

              {" "}Levels

            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

            <motion.div

              initial={{

                width: 0,

              }}

              animate={{

                width: `${progress}%`,

              }}

              transition={{

                duration: 1,

              }}

              className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#54D6C7]"

            />

          </div>

        </motion.div>
        {/* Difficulty */}

        <div className="flex justify-center gap-4 mt-10 flex-wrap">

          {["Easy", "Medium", "Hard"].map((item) => (

            <button

              key={item}

              onClick={() => setDifficulty(item)}

              className={`

                px-7
                py-3
                rounded-full
                font-bold
                transition-all
                duration-300

                ${
                  difficulty === item
                    ? "bg-[#7C5CFF] text-white shadow-lg"
                    : "bg-white/70 backdrop-blur-lg border border-white/60 text-[#2E2E3A]"
                }

              `}

            >

              {item}

            </button>

          ))}

        </div>

        {/* Level Grid */}

        <motion.div

          layout

          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-5
            gap-6
            mt-10
          "

        >

          {filteredLevels.map((level) => (

            <LevelCard

              key={level.id}

              level={level.id}

              stars={getStars(level.id)}

              completed={isCompleted(level.id)}

              locked={isLocked(level.id)}

              onClick={() => {

                if (!isLocked(level.id)) {

                  navigate(

                    `/game/${level.id}`

                  );

                }

              }}

            />

          ))}

        </motion.div>

      </div>

    </div>

  );

}

export default Levels;