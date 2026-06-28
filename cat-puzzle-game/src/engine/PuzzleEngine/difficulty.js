/**
 * Difficulty Manager
 * ------------------
 * Decides puzzle configuration based on current level.
 */

const LEVEL_RANGES = [
  {
    minLevel: 1,
    maxLevel: 20,

    name: "Beginner",

    gridSize: 4,

    minRegions: 5,
    maxRegions: 6,

    hints: true,
    timer: false,
  },

  {
    minLevel: 21,
    maxLevel: 50,

    name: "Easy",

    gridSize: 5,

    minRegions: 7,
    maxRegions: 9,

    hints: true,
    timer: false,
  },

  {
    minLevel: 51,
    maxLevel: 100,

    name: "Easy+",

    gridSize: 6,

    minRegions: 10,
    maxRegions: 12,

    hints: true,
    timer: false,
  },

  {
    minLevel: 101,
    maxLevel: 180,

    name: "Normal",

    gridSize: 7,

    minRegions: 13,
    maxRegions: 16,

    hints: true,
    timer: false,
  },

  {
    minLevel: 181,
    maxLevel: 280,

    name: "Medium",

    gridSize: 8,

    minRegions: 17,
    maxRegions: 20,

    hints: false,
    timer: false,
  },

  {
    minLevel: 281,
    maxLevel: 400,

    name: "Medium+",

    gridSize: 9,

    minRegions: 21,
    maxRegions: 25,

    hints: false,
    timer: false,
  },

  {
    minLevel: 401,
    maxLevel: 550,

    name: "Hard",

    gridSize: 10,

    minRegions: 26,
    maxRegions: 30,

    hints: false,
    timer: true,
  },

  {
    minLevel: 551,
    maxLevel: 750,

    name: "Hard+",

    gridSize: 11,

    minRegions: 31,
    maxRegions: 36,

    hints: false,
    timer: true,
  },

  {
    minLevel: 751,
    maxLevel: 1000,

    name: "Expert",

    gridSize: 12,

    minRegions: 37,
    maxRegions: 44,

    hints: false,
    timer: true,
  },

  {
    minLevel: 1001,
    maxLevel: 1300,

    name: "Master",

    gridSize: 13,

    minRegions: 45,
    maxRegions: 53,

    hints: false,
    timer: true,
  },

  {
    minLevel: 1301,
    maxLevel: 1700,

    name: "Grandmaster",

    gridSize: 14,

    minRegions: 54,
    maxRegions: 63,

    hints: false,
    timer: true,
  },

  {
    minLevel: 1701,
    maxLevel: Infinity,

    name: "Infinite",

    gridSize: 15,

    minRegions: 64,
    maxRegions: 75,

    hints: false,
    timer: true,
  },
];

export function getPuzzleConfig(level) {
  if (typeof level !== "number" || level < 1) {
    throw new Error("Invalid level number.");
  }

  const config = LEVEL_RANGES.find(
    (range) =>
      level >= range.minLevel &&
      level <= range.maxLevel
  );

  if (!config) {
    throw new Error("No configuration found.");
  }

  const regionCount =
    Math.floor(
      Math.random() *
        (config.maxRegions - config.minRegions + 1)
    ) + config.minRegions;

  return {
    level,

    difficulty: config.name,

    gridSize: config.gridSize,

    regionCount,

    hints: config.hints,

    timer: config.timer,
  };
}