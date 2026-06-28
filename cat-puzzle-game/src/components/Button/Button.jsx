function Button({
  text,
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        flex
        items-center
        justify-center
        gap-3

        py-5
        px-6

        rounded-[20px]

        text-white
        text-lg
        font-bold

        cursor-pointer
        select-none

        shadow-lg

        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_18px_35px_rgba(124,92,255,0.30)]

        active:scale-95

        disabled:opacity-60
        disabled:cursor-not-allowed
        disabled:hover:translate-y-0
        disabled:hover:scale-100
        disabled:hover:shadow-lg

        ${className}
      `}
    >
      {icon && (
        <span className="flex items-center justify-center">
          {icon}
        </span>
      )}

      <span>{text}</span>
    </button>
  );
}

export default Button;