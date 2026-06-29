/**
 * ----------------------------------------------------
 * File : TopBar.jsx
 *
 * Purpose :
 * Displays game information.
 *
 * Status :
 * Final v1.0
 * ----------------------------------------------------
 */

function TopBar({
  level,
  lives,
  hints,
  foundCats,
  totalCats,
}) {

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

        <span className="text-2xl">
          {Array.from({ length: lives }).map((_, index) => (
            <span key={index}>❤️</span>
          ))}
        </span>

      </div>

      {/* Found Cats */}

      <div className="flex flex-col items-center">

        <span className="text-xs text-gray-500">
          FOUND
        </span>

        <span className="text-xl font-bold">
          🐱 {foundCats}/{totalCats}
        </span>

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