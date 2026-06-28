import { motion } from "framer-motion";

function RuleCard({
  icon,
  title,
  description,
  children,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        bg-white/70
        backdrop-blur-xl
        rounded-[24px]
        border
        border-white/60
        shadow-lg
        p-6
      "
    >
      <div className="flex justify-center mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#2E2E3A] text-center">
        {title}
      </h3>

      <p className="text-gray-600 text-center mt-2 mb-5">
        {description}
      </p>

      <div className="flex justify-center">
        {children}
      </div>

    </motion.div>
  );
}

export default RuleCard;