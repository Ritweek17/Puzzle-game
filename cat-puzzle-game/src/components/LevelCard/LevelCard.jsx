/**
 * ----------------------------------------------------
 * File : LevelCard.jsx
 *
 * Purpose :
 * Premium Level Card
 *
 * Status :
 * Final v3
 * ----------------------------------------------------
 */

import { Lock, Play, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function LevelCard({
  level,
  stars,
  completed,
  locked,
  current = false,
  onClick,
}) {
  let cardClass = "";
  let icon = null;
  let textLabel = "";
  let textClass = "";

  if (current) {
    cardClass =
      "border-[#7C5CFF] shadow-[0_8px_25px_rgba(124,92,255,0.25)] bg-gradient-to-br from-white to-[#F3EEFF]";
    icon = <Play fill="#7C5CFF" className="text-[#7C5CFF]" size={28} />;
    textLabel = "Play";
    textClass = "text-[#7C5CFF]";
  } else if (locked) {
    cardClass = "border-gray-200 bg-gray-50 text-gray-400";
    icon = <Lock size={28} className="text-gray-400" />;
    textLabel = "Locked";
    textClass = "text-gray-400";
  } else if (completed) {
    cardClass =
      "border-green-400 shadow-[0_8px_25px_rgba(74,222,128,0.2)] bg-gradient-to-br from-green-50 to-white hover:shadow-2xl";
    icon = <CheckCircle2 size={28} className="text-green-500" />;
    textLabel = "Completed";
    textClass = "text-green-600";
  } else {
    cardClass = "border-white bg-white shadow-xl hover:shadow-2xl";
    icon = <Play fill="#7C5CFF" className="text-[#7C5CFF]" size={28} />;
    textLabel = "Play";
    textClass = "text-[#7C5CFF]";
  }

  return (
    <motion.button
      whileHover={!locked ? { scale: 1.05, y: -4 } : {}}
      whileTap={!locked ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={locked}
      className={`
        w-full h-40
        rounded-3xl
        overflow-hidden
        transition-all
        duration-300
        border-2
        flex flex-col p-4
        ${cardClass}
      `}
    >
      <div className="w-full flex items-start justify-between h-6">
        <div className="flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`text-[15px] leading-none transition-all duration-300 ${
                stars >= star ? "opacity-100 drop-shadow-sm" : "opacity-20 grayscale"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        {current && (
          <div className="bg-[#7C5CFF] text-white text-[9px] font-extrabold px-2 py-1 rounded-full shadow-sm tracking-wide">
            CURRENT
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-1">
        {icon}
        <div className="text-3xl font-extrabold text-gray-800 mt-2 leading-none">
          {level}
        </div>
      </div>

      <div
        className={`text-[11px] font-bold uppercase tracking-wider mt-2 text-center w-full ${textClass}`}
      >
        {textLabel}
      </div>
    </motion.button>
  );
}

export default LevelCard;