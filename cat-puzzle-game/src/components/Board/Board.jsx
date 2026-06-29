/**
 * ----------------------------------------------------
 * File : Board.jsx
 *
 * Purpose :
 * Renders complete puzzle board.
 *
 * Status :
 * Final v4
 * ----------------------------------------------------
 */

import { motion } from "framer-motion";

import Cell from "../Cell/Cell";
import { getRegionColor } from "../../utils/regionColors";

function Board({
  puzzle,
  playerBoard,
  onCellClick,
  shake,
}) {

  if (!puzzle || !playerBoard) {
    return null;
  }

  /**
   * Responsive Cell Size
   */

  let cellSize = 64;

  if (puzzle.gridSize >= 8) cellSize = 56;
  if (puzzle.gridSize >= 10) cellSize = 48;
  if (puzzle.gridSize >= 12) cellSize = 42;
  if (puzzle.gridSize >= 15) cellSize = 36;
  if (puzzle.gridSize >= 18) cellSize = 30;
  if (puzzle.gridSize >= 20) cellSize = 26;

  return (

    <div className="w-full overflow-x-auto overflow-y-hidden py-2">

      <div className="flex justify-center min-w-max">

        <motion.div

          animate={
            shake
              ? {
                  x: [-12, 12, -10, 10, -6, 6, 0],
                }
              : {
                  x: 0,
                }
          }

          transition={{
            duration: 0.35,
          }}

          className="grid gap-[2px] bg-white rounded-2xl shadow-xl p-2"

          style={{
            gridTemplateColumns: `repeat(${puzzle.gridSize}, ${cellSize}px)`,
          }}

        >

          {playerBoard.map((row, rowIndex) =>

            row.map((cell, colIndex) => (

              <Cell

                key={`${rowIndex}-${colIndex}`}

                color={
                  getRegionColor(
                    puzzle.regions[rowIndex][colIndex]
                  )
                }

                state={cell.state}

                locked={cell.locked}

                onClick={() =>
                  onCellClick(
                    rowIndex,
                    colIndex
                  )
                }

              />

            ))

          )}

        </motion.div>

      </div>

    </div>

  );

}

export default Board;