import { motion } from "framer-motion";

function EmptyLeaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-64 text-center px-6 mt-10"
    >
      <div className="text-6xl mb-4">🏆</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">No players yet.</h2>
      <p className="text-gray-500">Be the first explorer to conquer the maze!</p>
    </motion.div>
  );
}

export default EmptyLeaderboard;
