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
  let h = seed | 0;

  return function () {
    h = (h + 0x6D2B79F5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}