import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firestore";

/**
 * Update the player's custom profile.
 * We use merge: true so we don't accidentally overwrite `account`, `progress`, or `stats` data.
 */
export async function updatePlayerProfile(uid, profileData) {
  if (!uid) throw new Error("Cannot update profile without a valid UID.");
  
  const userRef = doc(db, "users", uid);
  
  // Data to merge into the profile field
  const updateData = {
    profile: {
      ...profileData,
    },
    lastUpdated: serverTimestamp()
  };

  try {
    await setDoc(userRef, updateData, { merge: true });
    return true;
  } catch (error) {
    console.error("[profileService] updatePlayerProfile failed:", error);
    throw error;
  }
}

/**
 * Validate username rules
 * Minimum 3 characters, maximum 20 characters
 * Cannot be empty, cannot contain only spaces.
 */
export function validateUsername(username) {
  if (!username) return "Username is required.";
  const trimmed = username.trim();
  if (trimmed.length < 3) return "Username must be at least 3 characters.";
  if (trimmed.length > 20) return "Username must be a maximum of 20 characters.";
  return null; // Valid
}
