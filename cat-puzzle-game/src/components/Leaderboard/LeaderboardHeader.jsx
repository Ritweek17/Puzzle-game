import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LeaderboardHeader({ onRefresh, isRefreshing, userStatus }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-8 z-10 relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700"
      >
        <ArrowLeft size={22} />
      </motion.button>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-[#2E2E3A] flex items-center gap-2">
          <span>🏆</span> Leaderboard
        </h1>
        {userStatus === "synced" && (
          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-green-600 bg-green-50 rounded-full px-2 py-0.5 border border-green-100">
            🟢 Synced
          </span>
        )}
        {userStatus === "guest" && (
          <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 border border-gray-200">
            ⚪ Guest
          </span>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRefresh}
        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-gray-700"
      >
        <RefreshCw size={22} className={isRefreshing ? "animate-spin" : ""} />
      </motion.button>
    </div>
  );
}

export default LeaderboardHeader;
