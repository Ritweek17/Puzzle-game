/**
 * ----------------------------------------------------
 * File : firestore.js
 *
 * Purpose :
 * Firestore Initialization
 *
 * Exports :
 * - db : Firestore instance
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import { getFirestore } from "firebase/firestore";

import app from "./config";

const db = getFirestore(app);

export { db };
