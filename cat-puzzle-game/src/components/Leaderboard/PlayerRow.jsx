import { motion } from "framer-motion";
import { resolveIdentity } from "../../utils/identity";
import { useEffect, useRef } from "react";

function PlayerRow({ player, rank, isCurrentPlayer }) {
  const rowRef = useRef(null);
  const { displayName, avatarUrl } = resolveIdentity(player.profile, player);

  useEffect(() => {
    if (isCurrentPlayer && rowRef.current) {
      rowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isCurrentPlayer]);

  return (
    <motion.div
      ref={rowRef}
      whileHover={{ scale: 1.02 }}
      className={`
        flex items-center justify-between p-4 rounded-2xl mb-3
        backdrop-blur-md transition-all
        ${isCurrentPlayer 
          ? "bg-purple-50/90 border-2 border-[#7C5CFF] shadow-[0_0_15px_rgba(124,92,255,0.3)]" 
          : "bg-white/80 border border-white/60 shadow-md hover:shadow-lg"}
      `}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 text-center font-extrabold text-gray-400">
          #{rank}
        </div>
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover bg-white"
        />
        <div className="flex flex-col">
          <div className="font-bold text-gray-800 flex items-center gap-2">
            {displayName}
            {isCurrentPlayer && (
              <span className="bg-[#7C5CFF] text-white text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                You
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Lvl {player.currentLevel || 1}
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col items-end">
        <div className="font-extrabold text-gray-800 text-lg leading-none">
          {player.completedLevels}
        </div>
        <div className="text-xs text-gray-500 font-semibold flex items-center gap-1 mt-1">
          {player.totalStars} ⭐
        </div>
      </div>
    </motion.div>
  );
}

export default PlayerRow;
