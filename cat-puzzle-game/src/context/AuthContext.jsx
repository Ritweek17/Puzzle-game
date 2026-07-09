/**
 * ----------------------------------------------------
 * File : AuthContext.jsx
 *
 * Purpose :
 * Global Authentication Context
 *
 * Exposes :
 * - user         : Firebase user OR guest object OR null
 * - loading      : boolean, true while Firebase resolves auth state
 * - login()      : Sign in with Google via Firebase
 * - loginAsGuest(): Set a local guest user — no Firebase call
 * - logout()     : Sign out (Firebase or clear guest)
 * - syncStatus   : "idle" | "syncing" | "synced" | "offline"
 * - lastSynced   : Date | null — timestamp of last successful upload
 *
 * Sync status events :
 * progressSync.js dispatches a custom "meowmaze:sync" event on
 * window whenever an upload starts, succeeds, or fails.
 * AuthContext listens and updates syncStatus + lastSynced.
 *
 * Guest Mode :
 * A guest user is a plain object stored in React state only.
 * It has { displayName, isGuest: true }.
 * It does not interact with Firebase or Firestore at all.
 * All progress stays in LocalStorage (identical to V1).
 *
 * Cloud Sync (V2) :
 * When a real Firebase user logs in:
 *   1. Download cloud progress.
 *   2. Merge with local progress (best of both — no data loss).
 *   3. Write merged result to LocalStorage.
 *   4. Register uid in progress.js so future saves auto-upload.
 *
 * On logout:
 *   - Unregister uid so no further uploads happen.
 *   - Local progress is preserved (never wiped on logout).
 *
 * Status :
 * Version 2.0 — cloud sync + sync status
 * ----------------------------------------------------
 */

import {

  createContext,
  useContext,
  useEffect,
  useState,

} from "react";
import { useNavigate } from "react-router-dom";

import {

  loginWithGoogle,
  signOutFromFirebase,
  listenToAuth,
  auth,
  getRedirectResult,

} from "../firebase/auth";

import { updateLeaderboardProfile } from "../services/leaderboardService";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firestore";

import {

  downloadProgress,
  mergeProgress,

} from "../services/progressSync";

import {
  getProgress,
  saveProgressData,
  setAuthUser,
} from "../utils/progress";
import { getLocalProfile, saveLocalProfile, clearLocalProfile } from "../utils/localProfile";
const AuthContext = createContext(null);

/**
 * Guest user sentinel object.
 * Keeps shape consistent with Firebase user where it matters.
 */

const GUEST_USER = {
  displayName: "Guest",
  email: null,
  photoURL: null,
  isGuest: true,
};

export function AuthProvider({ children }) {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [playerProfile, setPlayerProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  /**
   * -----------------------------------
   * Cloud Sync Status
   * "idle"    — no sync has happened yet (fresh login)
   * "syncing" — upload in progress
   * "synced"  — last upload succeeded
   * "offline" — last upload failed (network / Firestore error)
   * -----------------------------------
   */

  const [syncStatus, setSyncStatus] = useState("idle");

  const [lastSynced, setLastSynced] = useState(null);

  /**
   * -----------------------------------
   * Listen for sync events from progressSync.js
   * Events dispatched: "meowmaze:sync"
   * Event detail: { status: "syncing" | "synced" | "offline" }
   * -----------------------------------
   */

  useEffect(() => {

    function handleSyncEvent(event) {

      const { status } = event.detail;

      setSyncStatus(status);

      if (status === "synced") {

        setLastSynced(new Date());

        if (auth.currentUser) {
          updateLeaderboardProfile(auth.currentUser);
        }

      }

    }

    window.addEventListener("meowmaze:sync", handleSyncEvent);

    return () => {

      window.removeEventListener("meowmaze:sync", handleSyncEvent);

    };

  }, []);

  /**
   * -----------------------------------
   * handleFirebaseLogin
   * Called when Firebase auth state resolves to a real user.
   * Downloads cloud progress, merges with local, saves back.
   * Registers uid so future saves auto-upload.
   * -----------------------------------
   */

  async function handleFirebaseLogin(firebaseUser) {

    // 1. Register uid — future completeLevel() calls will upload.
    setAuthUser(firebaseUser.uid);

    // 2. Immediately ensure the user document exists in Firestore
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      const localProf = getLocalProfile();

      // We only merge local guest profile if they are migrating from Guest to Google.
      // A guest profile has no uid or isGuest: true, and is completed.
      const shouldMigrate = localProf && localProf.profileCompleted && (!localProf.uid || localProf.uid === "guest" || localProf.isGuest);

      if (!snap.exists()) {
        let mergedProfile = shouldMigrate ? { ...localProf } : {};
        
        // Remove guest-specific flags
        delete mergedProfile.isGuest;
        delete mergedProfile.uid;
        
        if (!mergedProfile.username) {
          mergedProfile.username = firebaseUser.displayName || "Player";
        }
        
        if (firebaseUser.photoURL) {
          mergedProfile.googlePhoto = firebaseUser.photoURL;
        }

        if (!mergedProfile.selectedAvatar && !mergedProfile.avatar) {
          if (firebaseUser.photoURL) {
            mergedProfile.selectedAvatar = "google";
          } else {
            mergedProfile.selectedAvatar = "orange";
          }
        }
        
        mergedProfile.profileCompleted = true;
        
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          account: {
            email: firebaseUser.email || null,
            googleName: firebaseUser.displayName || "Anonymous",
            googlePhoto: firebaseUser.photoURL || null
          },
          profile: mergedProfile,
          completedLevels: 0,
          totalStars: 0,
          currentLevel: 1,
          guest: false,
          createdAt: serverTimestamp(),
          lastUpdated: serverTimestamp()
        });
        setPlayerProfile(mergedProfile);

        if (shouldMigrate) {
          clearLocalProfile();
        }
      } else {
        const existingData = snap.data();
        let firestoreProfile = existingData.profile || {};

        let mergedProfile;
        if (shouldMigrate) {
          // Merge local guest profile with firestore profile
          // Priority for username: custom guest username > firestore username > google displayName
          mergedProfile = { ...firestoreProfile };
          
          if (localProf.username && localProf.username !== "Guest" && localProf.username !== "Guest Player") {
            mergedProfile.username = localProf.username;
          }
          
          if (localProf.selectedAvatar && localProf.selectedAvatar !== "google") {
            mergedProfile.selectedAvatar = localProf.selectedAvatar;
          }
          if (localProf.avatar) {
            mergedProfile.avatar = localProf.avatar;
          }
          
          // Clear local profile after migration
          clearLocalProfile();
        } else {
          // Normal refresh: Firestore profile is the sole source of truth!
          mergedProfile = { ...firestoreProfile };
        }

        if (!mergedProfile.username) {
          mergedProfile.username = firebaseUser.displayName || existingData?.account?.googleName || "Player";
        }

        if (firebaseUser.photoURL) {
          mergedProfile.googlePhoto = firebaseUser.photoURL;
        }

        if (!mergedProfile.selectedAvatar && !mergedProfile.avatar) {
          const googlePhoto = firebaseUser.photoURL || existingData?.account?.googlePhoto;
          if (googlePhoto) {
            mergedProfile.selectedAvatar = "google";
          } else {
            mergedProfile.selectedAvatar = "orange";
          }
        }

        mergedProfile.profileCompleted = true;

        await setDoc(userRef, {
          account: {
            email: firebaseUser.email || existingData?.account?.email || null,
            googleName: firebaseUser.displayName || existingData?.account?.googleName || "Anonymous",
            googlePhoto: firebaseUser.photoURL || existingData?.account?.googlePhoto || null
          },
          profile: mergedProfile,
          lastUpdated: serverTimestamp()
        }, { merge: true });
        
        setPlayerProfile(mergedProfile);
      }
    } catch (err) {
      console.error("Firestore user document creation failed:", err);
    }

    // 3. Show syncing status while we fetch cloud data.
    setSyncStatus("syncing");

    try {

      // 3. Download cloud progress (null if first-time user).
      const cloudProgress = await downloadProgress(firebaseUser.uid);

      // 4. Merge cloud with local — never lose any progress.
      if (cloudProgress) {

        const localProgress = getProgress();

        const merged = mergeProgress(localProgress, cloudProgress);

        // 5. Write merged progress back to LocalStorage.
        //    Use saveProgressData (not completeLevel) to avoid
        //    triggering an upload loop on login.
        saveProgressData(merged);

      }

      setSyncStatus("synced");

      setLastSynced(new Date());

    } catch {

      setSyncStatus("offline");

    }

  }

  /**
   * -----------------------------------
   * Firebase auth state listener
   * -----------------------------------
   */

  useEffect(() => {
    let unsubscribe = null;
    let isMounted = true;

    async function initializeAuthentication() {
      console.log("APP START");
      console.log("AUTH CHECKING");

      let finalUser = null;

      // 1. Check for redirect result on mobile first.
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        try {
          const result = await getRedirectResult(auth);
          if (result && result.user) {
            console.log("REDIRECT RESULT RECEIVED:", result.user.email);
            finalUser = result.user;
          }
        } catch (error) {
          console.error("Redirect result failed:", error);
        }
      }

      // 2. Wait for onAuthStateChanged to resolve persistence (or confirm logged out).
      try {
        const persistentUser = await new Promise((resolve) => {
          const unsub = listenToAuth((user) => {
            unsub(); // unsubscribe immediately, we only need the first result!
            resolve(user);
          });
        });

        if (persistentUser) {
          finalUser = persistentUser;
        }
      } catch (error) {
        console.error("Persistent auth lookup failed:", error);
      }

      console.log("AUTH READY");

      // 3. Process the resolved user (either Google user or Guest).
      if (isMounted) {
        if (finalUser) {
          console.log("AUTH USER FOUND");
          setUser(finalUser);
          await handleFirebaseLogin(finalUser);
          console.log("PLAYER LOADED");
          
          if (isMobile) {
            try {
              const userRef = doc(db, "users", finalUser.uid);
              const snap = await getDoc(userRef);
              
              if (!snap.exists() || (!snap.data().profile?.profileCompleted && !getLocalProfile())) {
                navigate("/onboarding");
              } else {
                navigate("/levels");
              }
            } catch (e) {
              console.error("Error checking onboarding status after redirect:", e);
              navigate("/levels");
            }
          }
        } else {
          const localProf = getLocalProfile();
          setUser({ isGuest: true, uid: "guest" });
          setAuthUser(null);

          if (localProf && localProf.profileCompleted) {
            setPlayerProfile(localProf);
            setSyncStatus("offline");
          } else {
            setPlayerProfile(null);
            setSyncStatus("idle");
            if (window.location.pathname !== "/onboarding") {
              navigate("/onboarding");
            }
          }
          console.log("GUEST CREATED");
        }

        // 4. Set loading to false only after everything is fully loaded and initialized!
        setLoading(false);
      }

      // 5. Register the long-running auth listener to handle subsequent logins, logouts, etc.
      if (isMounted) {
        unsubscribe = listenToAuth(async (currentUser) => {
          if (!isMounted) return;
          console.log("Auth state listener triggered:", currentUser?.email || "No User");
          
          if (currentUser) {
            let alreadyLoggedIn = false;
            setUser((prev) => {
              if (prev && prev.uid === currentUser.uid && !prev.isGuest) {
                alreadyLoggedIn = true;
                return prev;
              }
              return currentUser;
            });
            
            if (!alreadyLoggedIn) {
              await handleFirebaseLogin(currentUser);
            }
          } else {
            setUser((prev) => {
              if (prev && !prev.isGuest) {
                const localProf = getLocalProfile();
                setAuthUser(null);
                if (localProf && localProf.profileCompleted) {
                  setPlayerProfile(localProf);
                } else {
                  setPlayerProfile(null);
                }
                return { isGuest: true, uid: "guest" };
              }
              return prev;
            });
          }
        });
      }
    }

    initializeAuthentication();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up onSnapshot listener for the user's profile to keep it updated in real-time
  useEffect(() => {
    let unsubscribeSnapshot = null;

    if (user && !user.isGuest) {
      const userRef = doc(db, "users", user.uid);
      unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPlayerProfile(data.profile || null);
        }
      });
    } else {
      setPlayerProfile(null);
    }

    return () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [user]);

  /**
   * -----------------------------------
   * login()
   * Triggers Google OAuth popup.
   * Firebase auth listener will update user + run sync.
   * -----------------------------------
   */

  async function login() {
    console.log("LOGIN START");
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      console.log("POPUP OPEN");
    }

    try {
      const fbUser = await loginWithGoogle();
      if (!fbUser) {
        // Redirect flow in progress on mobile browser
        return;
      }
      
      console.log("GOOGLE SUCCESS");
      console.log("AUTH USER FOUND");
      
      setUser(fbUser);
      await handleFirebaseLogin(fbUser);
      console.log("PLAYER LOADED");

      const userRef = doc(db, "users", fbUser.uid);
      const snap = await getDoc(userRef);
      
      if (!snap.exists() || (!snap.data().profile?.profileCompleted && !getLocalProfile())) {
        navigate("/onboarding");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Google login failed. Code:", error?.code, "Message:", error?.message);
      throw error;
    }
  }

  /**
   * -----------------------------------
   * loginAsGuest()
   * Sets a local guest user in state only.
   * NO Firebase call. NO Firestore access.
   * Gameplay is identical to Version 1.
   * -----------------------------------
   */

  function loginAsGuest() {

    // Explicitly ensure uid is NOT registered for guests.
    setAuthUser(null);

    setSyncStatus("idle");

    setLastSynced(null);
    setPlayerProfile(null);
    setUser(GUEST_USER);

  }

  /**
   * -----------------------------------
   * logout()
   * Handles both Firebase users and guest users.
   * Local progress is NEVER wiped on logout.
   * -----------------------------------
   */

  async function logout() {
    try {
      if (user && !user.isGuest) {
        await signOutFromFirebase();
      }
      setAuthUser(null);
      
      // Do NOT restore an old Guest profile. Keep the current Player Profile locally.
      if (playerProfile) {
        saveLocalProfile(playerProfile);
      }

      setUser({ isGuest: true, uid: "guest" });
      setSyncStatus("offline");
      setLastSynced(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  const value = {

    user,
    playerProfile,
    setPlayerProfile,
    loading,

    login,

    loginAsGuest,

    logout,

    syncStatus,

    lastSynced,

  };

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

}

export function useAuth() {

  return useContext(AuthContext);

}