/**
 * ----------------------------------------------------
 * File : Cell.jsx
 *
 * Purpose :
 * Renders a single board cell.
 *
 * Status :
 * Final
 * ----------------------------------------------------
 */

import { CELL_STATE } from "../../constants/gameConstants";

function Cell({
  color,
  state,
  locked,
  onClick,
  onDoubleClick,
}) {
  function renderContent() {
    switch (state) {
      case CELL_STATE.CROSS:
        return (
          <span className="text-red-600 font-bold text-xl select-none">
            ✖
          </span>
        );

      case CELL_STATE.REVEALED:
        return (
          <span className="text-2xl select-none">
            🐱
          </span>
        );

      case "exploded":
        return (
          <span className="text-2xl select-none">
            💥
          </span>
        );

      default:
        return null;
    }
  }

  return (
    <button
      disabled={locked}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`
        aspect-square
        rounded-xl
        border-2
        border-white
        shadow-md
        flex
        items-center
        justify-center
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        select-none
        disabled:cursor-default
        disabled:hover:scale-100
      `}
      style={{
        backgroundColor: color,
      }}
    >
      {renderContent()}
    </button>
  );
}

export default Cell;