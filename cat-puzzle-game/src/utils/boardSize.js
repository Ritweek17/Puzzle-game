const CELL_SIZES = {
  4: { desktop: 70, tablet: 60, mobile: 55 },
  5: { desktop: 65, tablet: 55, mobile: 50 },
  6: { desktop: 60, tablet: 50, mobile: 45 },
  7: { desktop: 55, tablet: 48, mobile: 42 },
  8: { desktop: 50, tablet: 45, mobile: 38 },
  9: { desktop: 46, tablet: 40, mobile: 34 },
  10: { desktop: 42, tablet: 36, mobile: 30 },
  11: { desktop: 38, tablet: 34, mobile: 28 },
  12: { desktop: 35, tablet: 30, mobile: 26 },
  13: { desktop: 32, tablet: 28, mobile: 24 },
  14: { desktop: 30, tablet: 26, mobile: 22 },
  15: { desktop: 28, tablet: 24, mobile: 20 },
  16: { desktop: 26, tablet: 22, mobile: 18 },
  17: { desktop: 24, tablet: 20, mobile: 17 },
  18: { desktop: 22, tablet: 18, mobile: 16 },
  20: { desktop: 20, tablet: 16, mobile: 14 },
};

export function getCellSize(gridSize) {
  return (
    CELL_SIZES[gridSize] || {
      desktop: 20,
      tablet: 16,
      mobile: 14,
    }
  );
}