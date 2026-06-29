import { motion } from "framer-motion";

const tabs = [
  {
    title: "Easy",
    color: "bg-green-500",
  },
  {
    title: "Medium",
    color: "bg-yellow-500",
  },
  {
    title: "Hard",
    color: "bg-red-500",
  },
];

function DifficultyTabs({

  difficulty,

  setDifficulty,

}) {

  return (

    <div className="flex justify-center gap-4 flex-wrap">

      {tabs.map((tab) => (

        <motion.button

          key={tab.title}

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={() =>

            setDifficulty(tab.title)

          }

          className={`

            px-7
            py-3
            rounded-full
            font-bold
            transition-all
            duration-300
            flex
            items-center
            gap-2

            ${
              difficulty === tab.title

                ? "bg-[#7C5CFF] text-white shadow-xl"

                : "bg-white border border-gray-200 shadow"

            }

          `}

        >

          <span

            className={`

              w-3
              h-3
              rounded-full

              ${tab.color}

            `}

          />

          {tab.title}

        </motion.button>

      ))}

    </div>

  );

}

export default DifficultyTabs;