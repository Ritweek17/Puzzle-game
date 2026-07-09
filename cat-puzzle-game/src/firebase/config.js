/**
 * ----------------------------------------------------
 * File : config.js
 *
 * Purpose :
 * Firebase Initialization
 *
 * Status :
 * Version 2.0
 * Part 1
 * ----------------------------------------------------
 */

import { initializeApp } from "firebase/app";

const getAuthDomain = () => {
  if (typeof window !== "undefined" && window.location.hostname) {
    const host = window.location.hostname;
    if (host !== "localhost" && host !== "127.0.0.1" && !host.startsWith("192.168.")) {
      return host;
    }
  }
  return import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
};

const firebaseConfig = {

  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: getAuthDomain(),

  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    import.meta.env.VITE_FIREBASE_APP_ID,

};

const app = initializeApp(firebaseConfig);

export default app;