/**
 * ----------------------------------------------------
 * File : Levels.jsx
 *
 * Purpose :
 * Premium Level Selection Screen
 *
 * Status :
 * Final v3
 * Part 1 / 4
 * ----------------------------------------------------
 */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Trophy } from "lucide-react";
import { motion } from "framer-motion";

import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import TopBar from "../../components/TopBar/TopBar";
import ContinueCard from "../../components/ContinueCard/ContinueCard";
import DifficultyTabs from "../../components/DifficultyTabs/DifficultyTabs";
import ProgressCard from "../../components/ProgressCard/ProgressCard";
import Pagination from "../../components/Pagination/Pagination";
import LevelCard from "../../components/LevelCard/LevelCard";

import happyCat from "../../assets/mascot/happy.png";

import levels from "../../data/levels";

import {
  isLocked,
  isCompleted,
  getStars,
} from "../../utils/progress";

function Levels() {
  const navigate = useNavigate();

  /**
   * Determine the current playable level:
   * The highest unlocked level that is NOT completed.
   */
  const currentPlayableLevel = useMemo(() => {
    let highest = 1;
    let allCompleted = true;
    for (const level of levels) {
      if (!isLocked(level.id)) {
        if (!isCompleted(level.id)) {
          highest = Math.max(highest, level.id);
          allCompleted = false;
        }
      }
    }
    return allCompleted ? levels.length : highest;
  }, []);

  /**
   * Difficulty
   */

  const [difficulty, setDifficulty] = useState("Easy");

  /**
   * Pagination
   */

  const LEVELS_PER_PAGE = 20;

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [difficulty]);

  /**
   * Filter Levels
   */

  const filteredLevels = useMemo(() => {
    return levels.filter((level) => level.difficulty === difficulty);
  }, [difficulty]);

  /**
   * Pagination
   */

  const totalPages = Math.ceil(filteredLevels.length / LEVELS_PER_PAGE);

  const paginatedLevels = filteredLevels.slice(
    (page - 1) * LEVELS_PER_PAGE,
    page * LEVELS_PER_PAGE
  );

  /**
   * Progress
   */

  const easyCompleted = levels.filter(
    (level) => level.difficulty === "Easy" && isCompleted(level.id)
  ).length;

  const mediumCompleted = levels.filter(
    (level) => level.difficulty === "Medium" && isCompleted(level.id)
  ).length;

  const hardCompleted = levels.filter(
    (level) => level.difficulty === "Hard" && isCompleted(level.id)
  ).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ================= Header ================= */}

        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              flex
              items-center
              justify-center
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <ArrowLeft size={22} />
          </button>

          <div className="flex-1">
            <TopBar title="Level Select" rightIcon={<Trophy size={20} />} />
          </div>

          <button
            onClick={() => navigate("/settings")}
            className="
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              flex
              items-center
              justify-center
              hover:rotate-90
              hover:scale-110
              transition-all
              duration-300
            "
          >
            <Settings size={22} />
          </button>
        </div>

        {/* ================= Continue ================= */}

        <ContinueCard
          currentLevel={currentPlayableLevel}
          onContinue={() => navigate(`/game/${currentPlayableLevel}`)}
        />

        {/* ================= Hero ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <img
            src={happyCat}
            alt="Happy Cat"
            className="
              w-24
              h-24
              rounded-full
              mx-auto
              shadow-lg
            "
          />

          <h2
            className="
              text-4xl
              font-bold
              mt-5
              text-[#2E2E3A]
            "
          >
            Choose Your Challenge
          </h2>

          <p className="mt-2 text-gray-600">
            Complete puzzles to unlock all 400 levels.
          </p>
        </motion.div>

        {/* ================= Progress ================= */}

        <div className="mt-10">
          <ProgressCard
            easy={easyCompleted}
            medium={mediumCompleted}
            hard={hardCompleted}
          />
        </div>

        {/* ================= Difficulty ================= */}

        <div className="mt-10">
          <DifficultyTabs
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        </div>
        {/* ================= Level Grid ================= */}

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            mt-10
            grid
            grid-cols-2
            sm:grid-cols-4
            lg:grid-cols-5
            gap-4 sm:gap-6
          "
        >
          {paginatedLevels.map((level) => (
            <LevelCard
              key={level.id}
              level={level.id}
              stars={getStars(level.id)}
              completed={isCompleted(level.id)}
              locked={isLocked(level.id)}
              current={level.id === currentPlayableLevel}
              onClick={() => {
                if (!isLocked(level.id)) {
                  navigate(`/game/${level.id}`);
                }
              }}
            />
          ))}
        </motion.div>

        {/* ================= Pagination ================= */}

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />

        {/* ================= Footer Text ================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            mt-10
            text-center
            text-gray-500
            text-sm
          "
        >
          Showing{" "}
          <span className="font-semibold">
            {(page - 1) * LEVELS_PER_PAGE + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold">
            {Math.min(page * LEVELS_PER_PAGE, filteredLevels.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredLevels.length}</span>{" "}
          {difficulty} Levels
        </motion.div>
      </div>
    </div>
  );
}

export default Levels;