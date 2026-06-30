import { db } from "../firebase/firestore";
import { collection, query, where, onSnapshot, setDoc, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { getProgress } from "../utils/progress";

/**
 * Updates the current user's profile and stats in the users collection.
 * Called automatically after a successful progress sync.
 */
export async function updateLeaderboardProfile(firebaseUser) {
  if (!firebaseUser) return;
  
  const progress = getProgress();
  const completedLevels = Object.keys(progress.completedLevels || {}).length;
  const totalStars = Object.values(progress.stars || {}).reduce((acc, val) => acc + val, 0);

  const docRef = doc(db, "users", firebaseUser.uid);
  
  try {
    await setDoc(docRef, {
      uid: firebaseUser.uid,
      displayName: firebaseUser.displayName || "Unknown Explorer",
      photoURL: firebaseUser.photoURL || null,
      email: firebaseUser.email || null,
      completedLevels,
      totalStars,
      currentLevel: progress.currentLevel || 1,
      lastUpdated: serverTimestamp(),
      guest: false
    }, { merge: true });
  } catch (error) {
    console.error("[leaderboardService] updateLeaderboardProfile failed:", error);
  }
}

/**
 * Subscribes to the global leaderboard.
 * Sorts locally to avoid requiring composite Firestore indexes.
 * Ranking rules: completedLevels DESC, totalStars DESC, lastUpdated ASC.
 */
export function subscribeToLeaderboard(onUpdate, onError) {
  const q = query(collection(db, "users"), where("guest", "==", false));
  
  return onSnapshot(q, (snapshot) => {
    const players = [];
    snapshot.forEach(doc => {
      players.push(doc.data());
    });
    
    // Sort players locally
    players.sort((a, b) => {
      if (b.completedLevels !== a.completedLevels) {
        return (b.completedLevels || 0) - (a.completedLevels || 0);
      }
      if (b.totalStars !== a.totalStars) {
        return (b.totalStars || 0) - (a.totalStars || 0);
      }
      const aTime = a.lastUpdated?.toMillis ? a.lastUpdated.toMillis() : 0;
      const bTime = b.lastUpdated?.toMillis ? b.lastUpdated.toMillis() : 0;
      return aTime - bTime; // ASC (older is better for tiebreaker)
    });
    
    onUpdate(players);
  }, (error) => {
    console.error("[leaderboardService] subscription failed:", error);
    if (onError) onError(error);
  });
}

/**
 * Manually fetches the leaderboard once.
 */
export async function fetchLeaderboard() {
  const q = query(collection(db, "users"), where("guest", "==", false));
  const snapshot = await getDocs(q);
  const players = [];
  snapshot.forEach(doc => {
    players.push(doc.data());
  });
  
  // Sort players locally
  players.sort((a, b) => {
    if (b.completedLevels !== a.completedLevels) {
      return (b.completedLevels || 0) - (a.completedLevels || 0);
    }
    if (b.totalStars !== a.totalStars) {
      return (b.totalStars || 0) - (a.totalStars || 0);
    }
    const aTime = a.lastUpdated?.toMillis ? a.lastUpdated.toMillis() : 0;
    const bTime = b.lastUpdated?.toMillis ? b.lastUpdated.toMillis() : 0;
    return aTime - bTime;
  });
  
  return players;
}
