/**
 * ----------------------------------------------------
 * File : BottomBar.jsx
 *
 * Purpose :
 * Game Action Buttons
 *
 * Status :
 * Final v3
 * ----------------------------------------------------
 */

function BottomBar({

  onHint,

  onUndo,

  onReset,

  hints,

  undos,

  gameOver,

  completed,

}) {

  /**
   * Disable Buttons
   */

  const hintDisabled =
    hints <= 0 ||
    gameOver ||
    completed;

  const undoDisabled =
    undos <= 0 ||
    gameOver ||
    completed;

  return (

    <div
      className="
        mt-8
        flex
        flex-wrap
        justify-center
        gap-4
      "
    >

      {/* Hint */}

      <button

        onClick={onHint}

        disabled={hintDisabled}

        className={`
          px-6
          py-3
          rounded-xl
          font-bold
          shadow-lg
          transition-all
          duration-200

          ${
            hintDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-white active:scale-95"
          }

        `}

      >

        💡 Hint ({hints})

      </button>

      {/* Undo */}

      <button

        onClick={onUndo}

        disabled={undoDisabled}

        className={`
          px-6
          py-3
          rounded-xl
          font-bold
          shadow-lg
          transition-all
          duration-200

          ${
            undoDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
          }

        `}

      >

        ↩ Undo ({undos})

      </button>

      {/* Reset */}

      <button

        onClick={onReset}

        className="
          px-6
          py-3
          rounded-xl
          bg-red-500
          hover:bg-red-600
          text-white
          font-bold
          shadow-lg
          transition-all
          duration-200
          active:scale-95
        "

      >

        🔄 Reset

      </button>

    </div>

  );

}

export default BottomBar;