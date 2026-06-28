/**
 * Seed Generator
 * ----------------
 * Generates a deterministic seed
 * from the current level.
 */

export function createSeed(level) {
  if (typeof level !== "number" || level < 1) {
    throw new Error("Invalid level.");
  }

  return (
    level * 9301 +
    49297
  ) % 233280;
}

/**
 * Seeded Random Number Generator
 */

export function seededRandom(seed) {
  let value = seed;

  return function () {
    value =
      (value * 9301 + 49297) %
      233280;

    return value / 233280;
  };
}