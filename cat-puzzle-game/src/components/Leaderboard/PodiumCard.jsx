import { motion } from "framer-motion";
import { resolveIdentity, DEFAULT_AVATAR_URL } from "../../utils/identity";

function PodiumCard({ player, rank }) {
  if (!player) return <div className="flex-1" />;

  const { displayName, avatarUrl } = resolveIdentity(player.profile, player);
  const isFirst = rank === 1;
  const rankColors = {
    1: "from-yellow-300 to-yellow-500 shadow-yellow-400/50",
    2: "from-gray-300 to-gray-400 shadow-gray-400/50",
    3: "from-orange-300 to-orange-500 shadow-orange-400/50"
  };
  const rankEmojis = { 1: "🥇", 2: "🥈", 3: "🥉" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`
        flex flex-col items-center flex-1
        ${isFirst ? "z-10 -mt-6 transform scale-110" : "z-0"}
      `}
    >
      <div className="relative mb-3">
        <div className="absolute -top-4 -right-4 text-3xl z-20 drop-shadow-md">
          {rankEmojis[rank]}
        </div>
        <img
          src={avatarUrl}
          alt={displayName}
          className={`
            rounded-full object-cover border-4 border-white shadow-xl bg-white
            ${isFirst ? "w-24 h-24" : "w-20 h-20"}
          `}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_AVATAR_URL;
          }}
        />
        <div className={`
          absolute -bottom-2 left-1/2 -translate-x-1/2
          bg-gradient-to-r ${rankColors[rank]}
          text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white
        `}>
          #{rank}
        </div>
      </div>
      
      <div className={`
        bg-white/90 backdrop-blur-md rounded-2xl p-3 w-full text-center shadow-lg
        border border-white/50
        ${isFirst ? "pt-4" : ""}
      `}>
        <div className="font-bold text-gray-800 text-sm truncate w-full max-w-[90px] mx-auto">
          {displayName}
        </div>
        <div className="text-[10px] text-gray-500 font-semibold mt-1">
          {player.completedLevels} Lvl • {player.totalStars} ⭐
        </div>
      </div>
    </motion.div>
  );
}

export default PodiumCard;
