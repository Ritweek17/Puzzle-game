/**
 * ----------------------------------------------------
 * File : TopBar.jsx
 *
 * Purpose :
 * Displays top information.
 *
 * Status :
 * Final v6 — patch: title-mode now supports optional Back button
 * ----------------------------------------------------
 */

import { ArrowLeft } from "lucide-react";

import normalMascot from "../../assets/mascot/normal.png";
import happyMascot from "../../assets/mascot/happy.png";
import sadMascot from "../../assets/mascot/sad.png";
import thinkingMascot from "../../assets/mascot/thinking.png";
import winMascot from "../../assets/mascot/win.png";

function TopBar({

  // Levels Page / Title Pages

  title,

  rightIcon,

  // Game Page

  level,

  lives,

  hints,

  foundCats,

  totalCats,

  completed,

  gameOver,

  // Navigation (supported in both title-mode and game-mode)

  showBack = false,

  onBack,

}) {

  /**
   * -----------------------------------
   * Title Bar (Levels page, HowToPlay, Settings, etc.)
   * Now supports an optional Back button on the left.
   * -----------------------------------
   */

  if (title) {

    return (

      <div
        className="
          bg-white/90
          backdrop-blur-md
          rounded-2xl
          shadow-xl
          p-4
          flex
          items-center
          justify-center
          relative
        "
      >

        {/* Optional Back Button */}

        {showBack && (

          <button

            onClick={onBack}

            className="
              w-10
              h-10
              rounded-full
              bg-white
              border
              border-gray-100
              shadow-lg
              hover:shadow-xl
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
              flex
              items-center
              justify-center
              absolute
              left-4
            "

            aria-label="Go back"

          >

            <ArrowLeft size={20} strokeWidth={2.5} />

          </button>

        )}

        {/* Centred Title */}

        <div className="flex items-center gap-3">

          <h1 className="text-2xl font-bold text-[#2E2E3A]">

            {title}

          </h1>

          {rightIcon}

        </div>

      </div>

    );

  }

  /**
   * -----------------------------------
   * Mascot
   * -----------------------------------
   */

  function getMascot() {

    if (completed) return winMascot;

    if (gameOver) return sadMascot;

    if (foundCats > 0) return happyMascot;

    if (hints <= 1) return thinkingMascot;

    return normalMascot;

  }

  /**
   * -----------------------------------
   * Game TopBar
   * -----------------------------------
   */

  return (

    <div className="space-y-6">

      {/* ================= Header ================= */}

      <div
        className="
          bg-white/90
          backdrop-blur-md
          rounded-3xl
          shadow-xl
          px-6
          py-5
          flex
          items-center
          relative
        "
      >

        {/* Back */}

        {showBack && (

          <button

            onClick={onBack}

            className="
              w-12
              h-12
              rounded-full
              bg-white
              border
              border-gray-100
              shadow-lg
              hover:shadow-xl
              hover:scale-105
              active:scale-95
              transition-all
              duration-200
              flex
              items-center
              justify-center
              absolute
              left-5
            "

          >

            <ArrowLeft

              size={24}

              strokeWidth={2.5}

            />

          </button>

        )}

        {/* Level */}

        <div className="w-full text-center">

          <p className="text-sm tracking-wide text-gray-500">

            LEVEL

          </p>

          <h2 className="text-5xl font-bold text-[#2E2E3A] mt-1">

            {level}

          </h2>

        </div>

      </div>

      {/* ================= Stats ================= */}

      <div
        className="
          bg-white/90
          backdrop-blur-md
          rounded-3xl
          shadow-xl
          px-6
          py-5
          flex
          justify-around
          items-center
        "
      >

        {/* Lives */}

        <div className="text-center">

          <p className="text-xs text-gray-500 mb-2">

            LIVES

          </p>

          <div className="text-3xl">

            {Array.from({

              length: lives,

            }).map((_, index) => (

              <span key={index}>

                ❤️

              </span>

            ))}

          </div>

        </div>

        {/* Found */}

        <div className="text-center">

          <p className="text-xs text-gray-500 mb-2">

            FOUND

          </p>

          <div className="flex items-center gap-2">

            <img

              src={getMascot()}

              alt="Mascot"

              className="w-11 h-11 object-contain"

            />

            <span className="text-3xl font-bold">

              {foundCats}/{totalCats}

            </span>

          </div>

        </div>

        {/* Hints */}

        <div className="text-center">

          <p className="text-xs text-gray-500 mb-2">

            HINTS

          </p>

          <div className="text-3xl font-bold">

            💡 {hints}

          </div>

        </div>

      </div>

    </div>

  );

}

export default TopBar;