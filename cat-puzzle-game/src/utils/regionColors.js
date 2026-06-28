const COLORS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
  "#14b8a6",
  "#ec4899",
  "#6366f1",
  "#84cc16",
  "#06b6d4",
  "#f59e0b",
  "#d946ef",
  "#10b981",
  "#f43f5e",
];

export function getRegionColor(id) {
  if (id <= 0) return "#FFFFFF";

  return COLORS[(id - 1) % COLORS.length];
}