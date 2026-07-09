/**
 * ----------------------------------------------------
 * File : auth.js
 *
 * Purpose :
 * Firebase Authentication
 *
 * Exports :
 * - signInWithGoogle()
 * - logout()
 * - listenToAuth()
 * - auth
 *
 * Note :
 * Guest login is handled in AuthContext only.
 * It does not use Firebase at all.
 *
 * Status :
 * Version 2.0
 * Part 1
 * ----------------------------------------------------
 */

import {

  getAuth,

  GoogleAuthProvider,

  signInWithPopup,
  
  signInWithRedirect,
  
  getRedirectResult,

  signOut,

  onAuthStateChanged,

  setPersistence,

  browserLocalPersistence,

} from "firebase/auth";

import app from "./config";

const auth = getAuth(app);

// Initialize persistence globally at startup
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence initialized to local.");
  })
  .catch((err) => {
    console.error("Firebase Auth persistence failed to initialize:", err);
  });

const googleProvider = new GoogleAuthProvider();

/**
 * -----------------------------------
 * Google Login
 * -----------------------------------
 */

export async function loginWithGoogle() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  try {
    if (isMobile) {
      // For mobile browsers, use redirect to prevent popup blockers
      await signInWithRedirect(auth, googleProvider);
      return null; // Will be handled by getRedirectResult/onAuthStateChanged
    } else {
      // For desktop, use popup
      const result = await signInWithPopup(
        auth,
        googleProvider
      );
    
      return result.user;
    }
  } catch (error) {
    console.error("Google Sign-In failed. Code:", error.code, "Message:", error.message);
    throw error;
  }
}

export const signInWithGoogle = loginWithGoogle;

/**
 * -----------------------------------
 * Logout
 * Signs out from Firebase.
 * Guest logout is handled in AuthContext.
 * -----------------------------------
 */

export async function signOutFromFirebase() {

  await signOut(auth);

}

/**
 * -----------------------------------
 * Auth Listener
 * -----------------------------------
 */

export function listenToAuth(callback) {

  return onAuthStateChanged(

    auth,

    callback

  );

}

export { auth, getRedirectResult };