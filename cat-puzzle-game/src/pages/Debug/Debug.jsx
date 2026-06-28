import { useState } from "react";

import { generatePuzzle } from "../../engine/generator";
import { getPuzzleConfig } from "../../engine/difficulty";
import { getRegionColor } from "../../utils/regionColors";

function Debug() {
  const [level, setLevel] = useState(1);

  // Generate Puzzle
  const puzzle = generatePuzzle(level);

  // Difficulty Info
  const config = getPuzzleConfig(level);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        🛠 MeowMaze Engine Debug
      </h1>

      <div className="grid lg:grid-cols-[350px_1fr] gap-10">

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
            onChange={(e) =>
              setLevel(Number(e.target.value))
            }
            className="w-full rounded-xl border px-4 py-3 mb-6"
          />

          <div className="space-y-3">

            <p>
              <strong>Difficulty :</strong>{" "}
              {config.difficulty}
            </p>

            <p>
              <strong>Grid :</strong>{" "}
              {config.gridSize} × {config.gridSize}
            </p>

            <p>
              <strong>Regions :</strong>{" "}
              {config.regionCount}
            </p>

            <p>
              <strong>Seed :</strong>{" "}
              {puzzle.metadata.seed}
            </p>

          </div>

          <hr className="my-6" />

          <h3 className="text-xl font-bold mb-3">
            Puzzle Object
          </h3>

          <pre className="bg-black text-green-400 rounded-xl p-4 text-xs overflow-auto max-h-[450px]">
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
            {puzzle.regions.flat().map((cell, index) => (

              <div
                key={index}
                style={{
                  backgroundColor: getRegionColor(cell),
                }}
                className="
                  w-[60px]
                  h-[60px]
                  rounded-lg
                  border-2
                  border-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-white
                  shadow
                "
              >
                {cell}
              </div>

            ))}
          </div>

          {/* Region Legend */}

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

                  <span>{id}</span>

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