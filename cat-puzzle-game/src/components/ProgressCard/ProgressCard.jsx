import { motion } from "framer-motion";

function ProgressBar({ title, completed, total, color, bgClass = "bg-gray-100" }) {
  const percentage = Math.min(100, Math.max(0, (completed / total) * 100));

  return (
    <div className="mb-5 last:mb-0">
      <div className="flex justify-between items-end mb-2">
        <span className="font-bold text-sm text-gray-700">{title}</span>
        <span className="text-xs font-semibold text-gray-400">
          {completed} / {total}
        </span>
      </div>
      <div
        className={`w-full h-3.5 rounded-full ${bgClass} overflow-hidden shadow-inner`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}

function ProgressCard({ easy, medium, hard }) {
  const totalCompleted = easy + medium + hard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-white/80
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_8px_32px_rgba(124,92,255,0.08)]
        border border-white/60
        p-7
      "
    >
      <div className="flex items-center gap-3 mb-7">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#7C5CFF] to-[#5B3DF5]" />
        <h2 className="text-xl font-extrabold text-[#2E2E3A]">Your Progress</h2>
      </div>

      <ProgressBar
        title="🟢 Easy"
        completed={easy}
        total={150}
        color="bg-green-400"
        bgClass="bg-green-50"
      />
      <ProgressBar
        title="🟡 Medium"
        completed={medium}
        total={150}
        color="bg-yellow-400"
        bgClass="bg-yellow-50"
      />
      <ProgressBar
        title="🔴 Hard"
        completed={hard}
        total={100}
        color="bg-red-400"
        bgClass="bg-red-50"
      />

      <div className="my-6 border-t border-gray-100" />

      <ProgressBar
        title="🏆 Overall Progress"
        completed={totalCompleted}
        total={400}
        color="bg-gradient-to-r from-[#7C5CFF] to-[#54D6C7]"
        bgClass="bg-purple-50"
      />
    </motion.div>
  );
}

export default ProgressCard;