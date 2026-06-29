/**
 * ----------------------------------------------------
 * File : LevelCard.jsx
 *
 * Purpose :
 * Premium Level Card
 *
 * Status :
 * Final v2
 * ----------------------------------------------------
 */

import { Lock, Play, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function LevelCard({

  level,

  stars,

  completed,

  locked,

  current = false,

  onClick,

}) {

  return (

    <motion.button

      whileHover={
        !locked
          ? {
              scale: 1.06,
              y: -8,
            }
          : {}
      }

      whileTap={
        !locked
          ? {
              scale: 0.95,
            }
          : {}
      }

      onClick={onClick}

      disabled={locked}

      className={`
        relative
        h-44
        rounded-3xl
        overflow-hidden
        transition-all
        duration-300
        border-2

        ${
          current
            ? "border-[#7C5CFF] shadow-[0_0_25px_rgba(124,92,255,0.45)] bg-gradient-to-br from-white to-purple-50"
            : locked
            ? "border-gray-200 bg-gray-100 text-gray-400"
            : completed
            ? "border-green-300 bg-gradient-to-br from-green-50 to-white shadow-xl"
            : "border-white bg-white shadow-xl hover:shadow-2xl"
        }
      `}
    >

      {/* Current Badge */}

      {current && (

        <div
          className="
            absolute
            top-3
            right-3
            px-2
            py-1
            rounded-full
            bg-[#7C5CFF]
            text-white
            text-[10px]
            font-bold
          "
        >

          CURRENT

        </div>

      )}

      {/* Stars */}

      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">

        {[1, 2, 3].map((star) => (

          <span

            key={star}

            className={`
              text-xl
              transition-all

              ${
                stars >= star

                  ? "opacity-100 scale-100"

                  : "opacity-20 scale-90"

              }

            `}

          >

            ⭐

          </span>

        ))}

      </div>

      {/* Body */}

      <div className="h-full flex flex-col items-center justify-center">

        {locked ? (

          <Lock

            size={38}

            className="mb-3"

          />

        ) : completed ? (

          <CheckCircle2

            size={38}

            className="mb-3 text-green-500"

          />

        ) : (

          <Play

            fill="#7C5CFF"

            className="mb-3 text-[#7C5CFF]"

            size={34}

          />

        )}

        <div className="text-4xl font-extrabold">

          {level}

        </div>

        <div

          className={`
            mt-4
            text-sm
            font-semibold

            ${
              locked

                ? "text-gray-400"

                : completed

                ? "text-green-600"

                : "text-[#7C5CFF]"

            }

          `}

        >

          {locked
            ? "Locked"
            : completed
            ? "Completed"
            : "Play"}

        </div>

      </div>

    </motion.button>

  );

}

export default LevelCard;