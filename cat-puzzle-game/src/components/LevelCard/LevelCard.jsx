/**
 * ----------------------------------------------------
 * File : LevelCard.jsx
 *
 * Purpose :
 * Single Level Card
 *
 * Status :
 * Final v1
 * ----------------------------------------------------
 */

import { Lock } from "lucide-react";
import { motion } from "framer-motion";

function LevelCard({

  level,

  stars,

  completed,

  locked,

  onClick,

}) {

  return (

    <motion.button

      whileHover={
        !locked
          ? {
              scale: 1.05,
              y: -5,
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
        backdrop-blur-xl
        shadow-xl
        transition-all
        duration-300
        overflow-hidden

        ${
          locked
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white/80 hover:shadow-2xl"
        }
      `}
    >

      {/* Stars */}

      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">

        {[1, 2, 3].map((star) => (

          <span

            key={star}

            className={`text-xl

              ${
                stars >= star
                  ? "opacity-100"
                  : "opacity-20"
              }

            `}

          >

            ⭐

          </span>

        ))}

      </div>

      {/* Content */}

      <div className="flex flex-col items-center justify-center h-full">

        {locked ? (

          <Lock
            size={34}
            className="mb-3"
          />

        ) : (

          <div className="text-5xl font-bold">

            {level}

          </div>

        )}

        <div className="mt-4 text-sm">

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