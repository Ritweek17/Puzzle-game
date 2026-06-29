/**
 * ----------------------------------------------------
 * File : TopBar.jsx
 *
 * Purpose :
 * Displays top information.
 *
 * Status :
 * Final v3
 * ----------------------------------------------------
 */

import normalMascot from "../../assets/mascot/normal.png";
import happyMascot from "../../assets/mascot/happy.png";
import sadMascot from "../../assets/mascot/sad.png";
import thinkingMascot from "../../assets/mascot/thinking.png";
import winMascot from "../../assets/mascot/win.png";

function TopBar({

  // Levels Page
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

}) {

  /**
   * -----------------------------------
   * Level Select Page
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
          justify-between
        "
      >

        <h1 className="text-2xl font-bold text-[#2E2E3A]">

          {title}

        </h1>

        <div>

          {rightIcon}

        </div>

      </div>

    );

  }

  /**
   * -----------------------------------
   * Select Mascot
   * -----------------------------------
   */

  function getMascot() {

    if (completed) {

      return winMascot;

    }

    if (gameOver) {

      return sadMascot;

    }

    if (foundCats > 0) {

      return happyMascot;

    }

    if (hints <= 1) {

      return thinkingMascot;

    }

    return normalMascot;

  }

  /**
   * -----------------------------------
   * Game Top Bar
   * -----------------------------------
   */

  return (

    <div
      className="
        bg-white/90
        backdrop-blur-md
        rounded-2xl
        shadow-xl
        p-4
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      "
    >

      {/* Level */}

      <div className="flex flex-col">

        <span className="text-xs text-gray-500">

          LEVEL

        </span>

        <span className="text-2xl font-bold">

          {level}

        </span>

      </div>

      {/* Lives */}

      <div className="flex flex-col items-center">

        <span className="text-xs text-gray-500">

          LIVES

        </span>

        <div className="text-2xl">

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

      <div className="flex flex-col items-center">

        <span className="text-xs text-gray-500">

          FOUND

        </span>

        <div className="flex items-center gap-2">

          <img

            src={getMascot()}

            alt="Mascot"

            className="w-10 h-10 object-contain"

          />

          <span className="text-xl font-bold">

            {foundCats}/{totalCats}

          </span>

        </div>

      </div>

      {/* Hints */}

      <div className="flex flex-col items-center">

        <span className="text-xs text-gray-500">

          HINTS

        </span>

        <span className="text-xl font-bold">

          💡 {hints}

        </span>

      </div>

    </div>

  );

}

export default TopBar;