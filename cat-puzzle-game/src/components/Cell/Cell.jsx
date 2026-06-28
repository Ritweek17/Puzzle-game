function Cell({
  color,
  children,
}) {
  return (
    <div
      className="
        w-16
        h-16
        rounded-xl
        border-2
        border-white
        shadow-sm
        flex
        items-center
        justify-center
        transition-all
        duration-300
      "
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
}

export default Cell;