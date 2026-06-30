import { Play } from "lucide-react";
import { motion } from "framer-motion";
import happyCat from "../../assets/mascot/happy.png";

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
        shadow-[0_8px_32px_rgba(124,92,255,0.25)]
        p-6
        text-left
        relative
        overflow-hidden
        flex items-center justify-between
      "
    >
      <div className="flex items-center gap-5 z-10 relative">
        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-white/20
          backdrop-blur-md
          flex
          items-center
          justify-center
          shadow-inner
        "
        >
          <Play fill="white" size={24} />
        </div>

        <div>
          <h2 className="text-[22px] font-extrabold leading-tight shadow-sm">
            {isFirstLevel ? "Start Game" : "Continue Playing"}
          </h2>
          <p className="text-white/90 text-sm font-medium mt-1">
            {isFirstLevel
              ? "Begin your adventure"
              : `Continue from Level ${currentLevel}`}
          </p>
        </div>
      </div>

      <div className="z-10 relative pr-2">
        <img
          src={happyCat}
          alt="Happy Cat"
          className="w-16 h-16 object-contain drop-shadow-xl"
        />
      </div>

      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full blur-xl -ml-10 -mb-10" />
    </motion.button>
  );
}

export default ContinueCard;