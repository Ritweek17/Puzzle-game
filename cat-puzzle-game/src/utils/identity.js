/**
 * Centralized identity resolution for MeowMaze players.
 * Ensures ONE source of truth for avatar and username fallbacks across the app.
 */

export function resolveIdentity(playerProfile, firebaseUser = null) {
  if (!playerProfile) {
    return {
      displayName: firebaseUser?.displayName || "Guest Player",
      avatarUrl: firebaseUser?.photoURL || "https://api.dicebear.com/7.x/notionists/svg?seed=guest"
    };
  }

  // ONE source of truth for username
  const displayName = playerProfile.username || firebaseUser?.displayName || "Player";
  
  // ONE source of truth for avatar, strictly obeying avatarType
  let avatarUrl;
  
  if (playerProfile.avatarType === "google") {
    // Only use google photo if they explicitly set avatarType to google
    avatarUrl = firebaseUser?.photoURL || playerProfile.avatar || "https://api.dicebear.com/7.x/notionists/svg?seed=guest";
  } else {
    // Default to custom (even if avatarType is undefined/legacy, we prefer custom avatar string)
    avatarUrl = playerProfile.avatar || firebaseUser?.photoURL || `https://api.dicebear.com/7.x/notionists/svg?seed=${firebaseUser?.uid || 'guest'}`;
  }

  return {
    displayName,
    avatarUrl
  };
}
