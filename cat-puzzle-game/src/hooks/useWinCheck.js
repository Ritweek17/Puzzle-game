import { validatePuzzle } from "../engine/validator";

/**
 * Checks if the user's current cat placements
 * satisfy all puzzle rules.
 */
export default function useWinCheck(puzzle, cats) {
  if (!puzzle) return false;

  const userPuzzle = {
    ...puzzle,
    cats,
  };

  return validatePuzzle(userPuzzle).valid;
}