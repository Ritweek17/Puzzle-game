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

  signOut,

  onAuthStateChanged,

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

  const result = await signInWithPopup(
    auth,
    googleProvider
  );

  return result.user;

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

export { auth };