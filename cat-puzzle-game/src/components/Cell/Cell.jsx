/**
 * ----------------------------------------------------
 * File : Cell.jsx
 *
 * Purpose :
 * Renders a single board cell.
 *
 * Status :
 * Final v4
 * ----------------------------------------------------
 */

import { CELL_STATE } from "../../constants/gameConstants";

import normalMascot from "../../assets/mascot/normal.png";

function Cell({
  color,
  state,
  locked,
  onClick,
}) {

  /**
   * -----------------------------------
   * Render Cell Content
   * -----------------------------------
   */

  function renderContent() {

    switch (state) {

      case CELL_STATE.CROSS:

        return (

          <span className="text-red-600 text-2xl font-bold select-none">

            ✖

          </span>

        );

      case CELL_STATE.REVEALED:

        return (

          <img
            src={normalMascot}
            alt="Cat"
            className="
              w-8
              h-8
              object-contain
              select-none
              pointer-events-none
            "
            draggable={false}
          />

        );

      case CELL_STATE.EXPLODED:

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

      className="
        w-full
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
        disabled:cursor-default
        disabled:hover:scale-100
        overflow-hidden
      "

      style={{
        backgroundColor: color,
      }}

    >

      {renderContent()}

    </button>

  );

}

export default Cell;