import { useState } from "react";

import { generatePuzzle } from "../../engine/generator";
import { getPuzzleConfig } from "../../engine/difficulty";
import { getRegionColor } from "../../utils/regionColors";

function Debug() {
  const [level, setLevel] = useState(1);

  const puzzle = generatePuzzle(level);
  const config = getPuzzleConfig(level);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        🛠 MeowMaze Engine Debug
      </h1>

      <div className="grid lg:grid-cols-[360px_1fr] gap-10">

        {/* LEFT PANEL */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Puzzle Generator
          </h2>

          <label className="block font-semibold mb-2">
            Level
          </label>

          <input
            type="number"
            min="1"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full border rounded-xl px-4 py-3 mb-6"
          />

          <div className="space-y-3">

            <p>
              <strong>Difficulty:</strong> {config.difficulty}
            </p>

            <p>
              <strong>Grid:</strong> {config.gridSize} × {config.gridSize}
            </p>

            <p>
              <strong>Regions:</strong> {config.regionCount}
            </p>

            <p>
              <strong>Seed:</strong> {puzzle.metadata.seed}
            </p>

            <p>
              <strong>Cats:</strong> {puzzle.cats.length}
            </p>

          </div>

          <hr className="my-6" />

          <h3 className="text-xl font-bold mb-3">
            Puzzle Object
          </h3>

          <pre className="bg-black text-green-400 rounded-xl p-4 text-xs overflow-auto max-h-[420px]">
            {JSON.stringify(puzzle, null, 2)}
          </pre>

        </div>

        {/* RIGHT PANEL */}

        <div>

          <div
            className="grid gap-1 bg-gray-300 rounded-2xl p-2 w-fit"
            style={{
              gridTemplateColumns: `repeat(${config.gridSize}, 60px)`,
            }}
          >

            {puzzle.regions.map((row, rowIndex) =>

              row.map((cell, colIndex) => {

                const hasCat = puzzle.cats.some(
                  (cat) =>
                    cat.row === rowIndex &&
                    cat.col === colIndex
                );

                return (

                  <div
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      backgroundColor: getRegionColor(cell),
                    }}
                    className="
                      w-[60px]
                      h-[60px]
                      rounded-lg
                      border-2
                      border-white
                      shadow
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                      text-xl
                    "
                  >

                    {hasCat ? "🐱" : cell}

                  </div>

                );

              })

            )}

          </div>

          {/* Legend */}

          <div className="mt-8">

            <h2 className="text-xl font-bold mb-4">
              Region Legend
            </h2>

            <div className="flex flex-wrap gap-3">

              {Array.from(
                { length: config.regionCount },
                (_, i) => i + 1
              ).map((id) => (

                <div
                  key={id}
                  className="flex items-center gap-2"
                >

                  <div
                    className="w-6 h-6 rounded"
                    style={{
                      backgroundColor:
                        getRegionColor(id),
                    }}
                  />

                  <span>Region {id}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Debug;