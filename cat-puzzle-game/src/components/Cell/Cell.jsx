/**
 * ----------------------------------------------------
 * File : Cell.jsx
 *
 * Purpose :
 * Renders a single board cell.
 *
 * Status :
 * Final v5
 * ----------------------------------------------------
 */

import { memo } from "react";
import { motion } from "framer-motion";

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

          <motion.img

            src={normalMascot}

            alt="Cat"

            draggable={false}

            initial={{
              scale: 0,
              rotate: -20,
              opacity: 0,
            }}

            animate={{
              scale: [0, 1.25, 0.95, 1],
              rotate: [-20, 12, -8, 0],
              opacity: 1,
            }}

            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}

            className="
              w-8
              h-8
              object-contain
              select-none
              pointer-events-none
            "

          />

        );

      case CELL_STATE.EXPLODED:

        return (

          <motion.span

            initial={{
              scale: 0,
            }}

            animate={{
              scale: [0, 1.3, 1],
            }}

            transition={{
              duration: 0.25,
            }}

            className="text-2xl select-none"

          >

            💥

          </motion.span>

        );

      default:

        return null;

    }

  }

  return (

    <motion.button

      disabled={locked}

      onClick={onClick}

      whileHover={{
        scale: locked ? 1 : 1.05,
      }}

      whileTap={{
        scale: locked ? 1 : 0.95,
      }}

      transition={{
        duration: 0.15,
      }}

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
        overflow-hidden
        disabled:cursor-default
      "

      style={{
        backgroundColor: color,
      }}

    >

      {renderContent()}

    </motion.button>

  );

}

export default memo(Cell);