/**
 * ----------------------------------------------------
 * File : progress.js
 *
 * Purpose :
 * Save / Load Player Progress
 *
 * Status :
 * Final v5
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

    currentLevel: 1,

    unlockedLevel: 1,

    completedLevels: {},

    stars: {},

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

      currentLevel:
        progress.currentLevel || 1,

      unlockedLevel:
        progress.unlockedLevel || 1,

      completedLevels:
        progress.completedLevels || {},

      stars:
        progress.stars || {},

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

  // Save completion

  progress.completedLevels[level] = true;

  // Save best stars

  progress.stars[level] = Math.max(

    progress.stars[level] || 0,

    stars

  );

  // Current Level

  progress.currentLevel = level;

  // Unlock next level

  progress.unlockedLevel = Math.max(

    progress.unlockedLevel,

    level + 1

  );

  saveProgress(progress);

}

/**
 * -----------------------------------
 * Get Stars
 * -----------------------------------
 */

export function getStars(level) {

  const progress = getProgress();

  return progress.stars[level] || 0;

}

/**
 * -----------------------------------
 * Check Completed
 * -----------------------------------
 */

export function isCompleted(level) {

  const progress = getProgress();

  return !!progress.completedLevels[level];

}

/**
 * -----------------------------------
 * Check Locked
 * -----------------------------------
 */

export function isLocked(level) {

  const progress = getProgress();

  return level > progress.unlockedLevel;

}

/**
 * -----------------------------------
 * Current Level
 * -----------------------------------
 */

export function getCurrentLevel() {

  return getProgress().currentLevel;

}

/**
 * -----------------------------------
 * Reset Progress
 * -----------------------------------
 */

export function resetProgress() {

  localStorage.removeItem(STORAGE_KEY);

}