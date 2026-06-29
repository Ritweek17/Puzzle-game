import { Play } from "lucide-react";
import { motion } from "framer-motion";

function ContinueCard({ currentLevel, onContinue }) {

  const isFirstLevel = currentLevel === 1;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onContinue}
      className="
        w-full
        rounded-3xl
        bg-gradient-to-r
        from-[#7C5CFF]
        to-[#54D6C7]
        text-white
        shadow-xl
        p-6
        text-left
      "
    >
      <div className="flex items-center gap-4">

        <div className="
          w-14
          h-14
          rounded-full
          bg-white/20
          flex
          items-center
          justify-center
        ">
          <Play fill="white" size={24}/>
        </div>

        <div>

          <h2 className="text-2xl font-bold">

            {isFirstLevel
              ? "Start Game"
              : "Continue Playing"}

          </h2>

          <p className="text-white/90 mt-1">

            {isFirstLevel
              ? "Begin your adventure"
              : `Continue from Level ${currentLevel}`}

          </p>

        </div>

      </div>

    </motion.button>
  );
}

export default ContinueCard;