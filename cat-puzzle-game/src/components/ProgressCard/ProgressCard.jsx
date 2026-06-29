import { motion } from "framer-motion";

function ProgressBar({

  title,

  completed,

  total,

  color,

}) {

  const percentage =

    (completed / total) * 100;

  return (

    <div className="mb-6">

      <div className="flex justify-between items-center mb-2">

        <span className="font-semibold">

          {title}

        </span>

        <span className="text-gray-500">

          {completed}/{total}

        </span>

      </div>

      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

        <motion.div

          initial={{ width: 0 }}

          animate={{

            width: `${percentage}%`,

          }}

          transition={{

            duration: 0.8,

          }}

          className={`h-full ${color}`}

        />

      </div>

    </div>

  );

}

function ProgressCard({

  easy,

  medium,

  hard,

}) {

  const totalCompleted =

    easy + medium + hard;

  return (

    <motion.div

      initial={{

        opacity: 0,

        y: 20,

      }}

      animate={{

        opacity: 1,

        y: 0,

      }}

      className="

        bg-white

        rounded-3xl

        shadow-xl

        p-6

      "

    >

      <h2 className="text-2xl font-bold mb-6">

        Progress

      </h2>

      <ProgressBar

        title="🟢 Easy"

        completed={easy}

        total={150}

        color="bg-green-500"

      />

      <ProgressBar

        title="🟡 Medium"

        completed={medium}

        total={150}

        color="bg-yellow-500"

      />

      <ProgressBar

        title="🔴 Hard"

        completed={hard}

        total={100}

        color="bg-red-500"

      />

      <hr className="my-5" />

      <ProgressBar

        title="🏆 Overall"

        completed={totalCompleted}

        total={400}

        color="bg-gradient-to-r from-[#7C5CFF] to-[#54D6C7]"

      />

    </motion.div>

  );

}

export default ProgressCard;