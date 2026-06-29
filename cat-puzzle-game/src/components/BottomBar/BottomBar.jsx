/**
 * ----------------------------------------------------
 * File : BottomBar.jsx
 *
 * Purpose :
 * Game action buttons.
 *
 * Status :
 * Final v1.0
 * ----------------------------------------------------
 */

function BottomBar({
  onHint,
  onUndo,
  onReset,
}) {

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
        className="
          px-6
          py-3
          rounded-xl
          bg-yellow-400
          hover:bg-yellow-500
          text-white
          font-bold
          shadow-lg
          transition-all
          duration-200
          active:scale-95
        "
      >
        💡 Hint
      </button>

      {/* Undo */}

      <button
        onClick={onUndo}
        className="
          px-6
          py-3
          rounded-xl
          bg-blue-500
          hover:bg-blue-600
          text-white
          font-bold
          shadow-lg
          transition-all
          duration-200
          active:scale-95
        "
      >
        ↩ Undo
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