/**
 * ----------------------------------------------------
 * File : progressSync.js
 *
 * Purpose :
 * Cloud Save — Firestore sync for player progress.
 *
 * Responsibilities :
 * - uploadProgress(uid, progress, stats) : write data → Firestore
 * - downloadProgress(uid)                : read Firestore → return data
 * - mergeProgress(local, cloud)          : merge safely, never lose data
 *
 * Sync Status Events :
 * uploadProgress dispatches custom "meowmaze:sync" events on window
 * so that AuthContext can update syncStatus and lastSynced:
 *   { detail: { status: "syncing" } }  — upload started
 *   { detail: { status: "synced"  } }  — upload succeeded
 *   { detail: { status: "offline" } }  — upload failed
 *
 * Design note :
 * uploadProgress receives progress and stats as parameters
 * (already read by the caller) to avoid a circular dependency
 * with utils/progress.js.
 *
 * Rules :
 * - ONLY called for authenticated Firebase users (not guests).
 * - Guest users never reach this module.
 * - All functions catch errors internally and never throw
 *   to callers — local save is always the source of truth.
 *
 * Firestore Path :
 * users / {uid} / progress / game
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import {

  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  serverTimestamp,

} from "firebase/firestore";

import { db } from "../firebase/firestore";

/* --------------------------------------------------------
   Internal helpers
-------------------------------------------------------- */

/**
 * Returns the Firestore document reference for a user's progress.
 * Path: users/{uid}/progress/game
 */

function getProgressRef(uid) {

  return doc(db, "users", uid, "progress", "game");

}

/**
 * Dispatches a "meowmaze:sync" CustomEvent on window.
 * AuthContext listens for these to update syncStatus.
 */

function dispatchSyncEvent(status) {

  window.dispatchEvent(

    new CustomEvent("meowmaze:sync", {

      detail: { status },

    })

  );

}

/* --------------------------------------------------------
   uploadProgress
   Accepts already-read progress and stats objects and writes
   them to Firestore.
   Dispatches sync status events for AuthContext to consume.
   Fire-and-forget safe — errors are logged but never thrown.

   @param {string} uid       - Firebase user uid
   @param {object} progress  - progress object from getProgress()
   @param {object} stats     - stats object from getStats()
-------------------------------------------------------- */

export async function uploadProgress(uid, progress, stats) {

  if (!uid || !progress) {

    return;

  }

  // Notify listeners that an upload has started.
  dispatchSyncEvent("syncing");

  try {

    const ref = getProgressRef(uid);

    await setDoc(

      ref,

      {

        currentLevel:    progress.currentLevel,

        unlockedLevel:   progress.unlockedLevel,

        completedLevels: progress.completedLevels,

        stars:           progress.stars,

        statistics:      stats || {},

        lastUpdated:     serverTimestamp(),

      },

      // merge: true so we never accidentally wipe unrelated fields
      { merge: true }

    );

    // Notify listeners that the upload succeeded.
    dispatchSyncEvent("synced");

  } catch (error) {

    // Upload failures are non-fatal — local progress is the source of truth.
    console.warn("[progressSync] uploadProgress failed:", error);

    // Notify listeners that we are offline / upload failed.
    dispatchSyncEvent("offline");

  }

}

/* --------------------------------------------------------
   downloadProgress
   Fetches cloud progress for the given uid.
   Returns the cloud data object, or null if none exists.

   @param  {string} uid
   @return {object|null}
-------------------------------------------------------- */

export async function downloadProgress(uid) {

  if (!uid) {

    return null;

  }

  try {

    const ref = getProgressRef(uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      return null;

    }

    return snap.data();

  } catch (error) {

    console.warn("[progressSync] downloadProgress failed:", error);

    return null;

  }

}

/* --------------------------------------------------------
   mergeProgress
   Merges local (LocalStorage) progress with cloud progress.

   Merge strategy — always keeps the best / most progress:
   - unlockedLevel  : Math.max(local, cloud)
   - currentLevel   : from whichever has the higher unlockedLevel
   - completedLevels: union of both objects
   - stars          : per-level maximum of both

   @param  {object} local  - progress object from LocalStorage
   @param  {object} cloud  - progress object from Firestore
   @return {object}        - merged progress object
-------------------------------------------------------- */

export function mergeProgress(local, cloud) {

  // If either side is missing, return the other unchanged.

  if (!cloud) {

    return local;

  }

  if (!local) {

    return {

      currentLevel:    cloud.currentLevel    || 1,

      unlockedLevel:   cloud.unlockedLevel   || 1,

      completedLevels: cloud.completedLevels || {},

      stars:           cloud.stars           || {},

    };

  }

  // unlockedLevel — keep the highest.

  const mergedUnlockedLevel = Math.max(

    local.unlockedLevel || 1,

    cloud.unlockedLevel || 1

  );

  // currentLevel — from whichever side has more progress.

  const mergedCurrentLevel =

    (local.unlockedLevel || 1) >= (cloud.unlockedLevel || 1)

      ? local.currentLevel || 1

      : cloud.currentLevel || 1;

  // completedLevels — union (cloud first, then local overwrites).

  const mergedCompletedLevels = {

    ...( cloud.completedLevels || {} ),

    ...( local.completedLevels || {} ),

  };

  // stars — per-level maximum.

  const allLevelKeys = new Set([

    ...Object.keys(local.stars || {}),

    ...Object.keys(cloud.stars || {}),

  ]);

  const mergedStars = {};

  for (const key of allLevelKeys) {

    mergedStars[key] = Math.max(

      local.stars?.[key]  || 0,

      cloud.stars?.[key]  || 0

    );

  }

  return {

    currentLevel:    mergedCurrentLevel,

    unlockedLevel:   mergedUnlockedLevel,

    completedLevels: mergedCompletedLevels,

    stars:           mergedStars,

  };

}

/* --------------------------------------------------------
   deleteCloudProgress
   Permanently erases cloud progress (subcollection) and 
   resets leaderboard stats to 0 (users/{uid}).
-------------------------------------------------------- */

export async function deleteCloudProgress(uid) {
  if (!uid) return;
  try {
    const ref = getProgressRef(uid);
    await deleteDoc(ref);

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      completedLevels: 0,
      totalStars: 0,
      currentLevel: 1,
      lastUpdated: serverTimestamp(),
      statistics: deleteField(),
      progress: deleteField(),
      lastCompleted: deleteField(),
      bestTimes: deleteField(),
      stars: deleteField(),
      achievementsProgress: deleteField()
    });

    // Also delete publicProfile for the leaderboard
    const publicRef = doc(db, "publicProfiles", uid);
    await deleteDoc(publicRef);
  } catch (error) {
    console.error("[progressSync] deleteCloudProgress failed:", error);
  }
}
