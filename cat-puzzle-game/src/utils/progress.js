/**
 * ----------------------------------------------------
 * File : progress.js
 *
 * Purpose :
 * Save / Load Player Progress
 *
 * Status :
 * Final v4
 * ----------------------------------------------------
 */

const STORAGE_KEY = "meowmaze_progress";

/**
 * -----------------------------------
 * Default Progress
 * -----------------------------------
 */

function createDefaultProgress() {

  return {

    completedLevels: {},

    unlockedLevels: [1],

  };

}

/**
 * -----------------------------------
 * Get Progress
 * -----------------------------------
 */

export function getProgress() {

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {

    return createDefaultProgress();

  }

  try {

    const progress = JSON.parse(data);

    return {

      completedLevels:
        progress.completedLevels || {},

      unlockedLevels:
        progress.unlockedLevels || [1],

    };

  }

  catch {

    return createDefaultProgress();

  }

}

/**
 * -----------------------------------
 * Save Progress
 * -----------------------------------
 */

function saveProgress(progress) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(progress)

  );

}

/**
 * -----------------------------------
 * Complete Level
 * -----------------------------------
 */

export function completeLevel(level, stars) {

  const progress = getProgress();

  const previousStars =
    progress.completedLevels[level];

  /**
   * Save Best Stars Only
   */

  if (

    previousStars === undefined ||

    stars > previousStars

  ) {

    progress.completedLevels[level] =
      stars;

  }

  /**
   * Unlock Next Level
   */

  const nextLevel = level + 1;

  if (

    !progress.unlockedLevels.includes(
      nextLevel
    )

  ) {

    progress.unlockedLevels.push(
      nextLevel
    );

  }

  saveProgress(progress);

}

/**
 * -----------------------------------
 * Get Stars
 * -----------------------------------
 */

export function getStars(level) {

  const progress = getProgress();

  return progress.completedLevels[level] || 0;

}

/**
 * -----------------------------------
 * Check Completed
 * -----------------------------------
 */

export function isCompleted(level) {

  const progress = getProgress();

  return progress.completedLevels[level] !== undefined;

}

/**
 * -----------------------------------
 * Check Locked
 * -----------------------------------
 */

export function isLocked(level) {

  const progress = getProgress();

  return !progress.unlockedLevels.includes(level);

}

/**
 * -----------------------------------
 * Reset Progress
 * -----------------------------------
 */

export function resetProgress() {

  localStorage.removeItem(STORAGE_KEY);

}