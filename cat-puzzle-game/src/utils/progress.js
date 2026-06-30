/**
 * ----------------------------------------------------
 * File : progress.js
 *
 * Purpose :
 * Save / Load Player Progress
 *
 * Version 2 addition :
 * When a Firebase user is active, any progress save
 * automatically triggers a cloud upload via progressSync.
 * Guest users (isGuest: true) never upload to Firestore.
 * The upload is fire-and-forget — local save always
 * succeeds regardless of network state.
 *
 * Status :
 * Final v5 — v2 patch: cloud sync
 * ----------------------------------------------------
 */

import { uploadProgress } from "../services/progressSync";

import { getStats, resetStats } from "./stats";

const STORAGE_KEY = "meowmaze_progress";

/**
 * -----------------------------------
 * Auth UID Reference
 * Set by AuthContext when a real Firebase user logs in.
 * Cleared on logout.
 * Never set for guest users.
 * -----------------------------------
 */

let _authUid = null;

/**
 * Called by AuthContext to register the Firebase user's uid.
 * Pass null to clear (on logout).
 * Guest users must NEVER call this — only real Firebase users.
 */

export function setAuthUser(uid) {

  _authUid = uid || null;

}

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
 * Always writes to LocalStorage first.
 * Then, if a Firebase uid is registered, triggers
 * a fire-and-forget cloud upload.
 * -----------------------------------
 */

function saveProgress(progress) {

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(progress)

  );

  // Cloud upload — only for real Firebase users, never for guests.

  if (_authUid) {

    const stats = getStats();

    // Fire-and-forget. Errors are caught inside uploadProgress.
    uploadProgress(_authUid, progress, stats);

  }

}

/**
 * -----------------------------------
 * Save Raw Progress Data
 * Used by AuthContext after merging cloud + local progress
 * on login. Does NOT trigger another cloud upload to avoid
 * a redundant write on login.
 * -----------------------------------
 */

export function saveProgressData(progress) {

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
  resetStats();

}