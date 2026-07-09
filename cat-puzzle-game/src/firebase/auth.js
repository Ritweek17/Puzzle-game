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

const googleProvider = new GoogleAuthProvider();

/**
 * -----------------------------------
 * Google Login
 * -----------------------------------
 */

export async function signInWithGoogle() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 0 && /Macintosh/.test(navigator.userAgent));

  try {
    // Before login, set local persistence so users remain logged in after refresh
    await setPersistence(auth, browserLocalPersistence);

    if (isMobile) {
      // For mobile browsers like Android Chrome, use redirect to prevent popup blockers
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