import { motion } from "framer-motion";

const tabs = [
  {
    title: "Easy",
    color: "bg-green-500",
    glow: "shadow-[0_4px_15px_rgba(34,197,94,0.4)]",
  },
  {
    title: "Medium",
    color: "bg-yellow-500",
    glow: "shadow-[0_4px_15px_rgba(234,179,8,0.4)]",
  },
  {
    title: "Hard",
    color: "bg-red-500",
    glow: "shadow-[0_4px_15px_rgba(239,68,68,0.4)]",
  },
];

function DifficultyTabs({ difficulty, setDifficulty }) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {tabs.map((tab) => {
        const isSelected = difficulty === tab.title;

        return (
          <motion.button
            key={tab.title}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setDifficulty(tab.title)}
            className={`
              px-6
              py-2.5
              rounded-full
              font-bold
              text-sm
              transition-all
              duration-300
              flex
              items-center
              gap-2
              ${
                isSelected
                  ? `${tab.color} text-white ${tab.glow} border-transparent`
                  : "bg-white/80 backdrop-blur-md text-gray-500 border border-gray-200 shadow-sm hover:shadow-md"
              }
            `}
          >
            <span
              className={`
                w-2.5
                h-2.5
                rounded-full
                ${isSelected ? "bg-white" : tab.color}
              `}
            />
            {tab.title}
          </motion.button>
        );
      })}
    </div>
  );
}

export default DifficultyTabs;