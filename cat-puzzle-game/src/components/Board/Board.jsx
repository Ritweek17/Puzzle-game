/**
 * ----------------------------------------------------
 * File : Board.jsx
 *
 * Purpose :
 * Renders the entire game board.
 *
 * Status :
 * Final v1.0
 * ----------------------------------------------------
 */

import Cell from "../Cell/Cell";
import { getRegionColor } from "../../utils/regionColors";

function Board({
  puzzle,
  playerBoard,
  onCellClick,
  onCellDoubleClick,
}) {
  if (!puzzle || !playerBoard) return null;

  // Responsive cell size
  let cellSize = 64;

  if (puzzle.gridSize >= 8) cellSize = 54;
  if (puzzle.gridSize >= 10) cellSize = 46;
  if (puzzle.gridSize >= 12) cellSize = 40;
  if (puzzle.gridSize >= 15) cellSize = 34;
  if (puzzle.gridSize >= 18) cellSize = 28;
  if (puzzle.gridSize >= 20) cellSize = 24;

  return (
    <div className="w-full overflow-auto flex justify-center">

      <div
        className="grid gap-[2px] rounded-2xl bg-white p-2 shadow-xl"
        style={{
          gridTemplateColumns: `repeat(${puzzle.gridSize}, ${cellSize}px)`,
        }}
      >

        {playerBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => (

            <Cell
              key={`${rowIndex}-${colIndex}`}

              color={getRegionColor(
                puzzle.regions[rowIndex][colIndex]
              )}

              state={cell.state}

              locked={cell.locked}

              onClick={() =>
                onCellClick(rowIndex, colIndex)
              }

              onDoubleClick={() =>
                onCellDoubleClick(
                  rowIndex,
                  colIndex
                )
              }

            />

          ))
        )}

      </div>

    </div>
  );
}

export default Board;