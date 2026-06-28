import { Lock } from "lucide-react";

function LevelCard({
  level,
  locked = false,
  stars = 0,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`
        w-full
        h-28

        rounded-[24px]

        bg-white/70
        backdrop-blur-xl

        border
        border-white/60

        shadow-lg

        flex
        flex-col
        justify-center
        items-center

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl

        disabled:opacity-60
        disabled:cursor-not-allowed
      `}
    >
      {locked ? (
        <Lock
          size={22}
          className="text-gray-500 mb-2"
        />
      ) : (
        <div className="text-yellow-400 text-sm mb-2">
          {"⭐".repeat(stars)}
        </div>
      )}

      <h2 className="text-2xl font-bold text-[#2E2E3A]">
        {level}
      </h2>

      <p className="text-xs text-gray-500 mt-2">
        {locked ? "Locked" : "Completed"}
      </p>
    </button>
  );
}

export default LevelCard;