/**
 * ----------------------------------------------------
 * File : localProfile.js
 *
 * Purpose :
 * Manages the local Guest Profile in LocalStorage.
 * Ensures every player always has an identity, even
 * if they never link a Google Account.
 * ----------------------------------------------------
 */

const STORAGE_KEY = "meowmaze_profile";

export function getLocalProfile() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to parse local profile:", err);
    return null;
  }
}

export function saveLocalProfile(profileData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...profileData,
      lastUpdated: new Date().toISOString()
    }));
  } catch (err) {
    console.error("Failed to save local profile:", err);
  }
}

export function clearLocalProfile() {
  localStorage.removeItem(STORAGE_KEY);
}
