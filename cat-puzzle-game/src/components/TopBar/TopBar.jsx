import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar({
  title,
  showBack = true,
  rightIcon = null,
  onRightClick = () => {},
}) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Left */}
      <div className="w-12">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-white/70
              backdrop-blur-lg
              border border-white/60
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
              active:scale-95
            "
          >
            <ArrowLeft
              size={22}
              className="text-[#2E2E3A]"
            />
          </button>
        )}
      </div>

      {/* Title */}
      <h1 className="flex-1 text-center text-3xl font-bold text-[#2E2E3A]">
        {title}
      </h1>

      {/* Right */}
      <div className="w-12 flex justify-end">
        {rightIcon && (
          <button
            onClick={onRightClick}
            className="
              w-12 h-12
              flex items-center justify-center
              rounded-full
              bg-white/70
              backdrop-blur-lg
              border border-white/60
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
              active:scale-95
            "
          >
            {rightIcon}
          </button>
        )}
      </div>
    </header>
  );
}

export default TopBar;