import orange from "../assets/avatars/orange.png";
import white from "../assets/avatars/white.png";
import black from "../assets/avatars/black.png";
import robot from "../assets/avatars/robot.png";
import ghost from "../assets/avatars/ghost.png";
import king from "../assets/avatars/king.png";
import ninja from "../assets/avatars/ninja.png";
import cute from "../assets/avatars/cute.png";

export const AVATAR_MAP = {
  orange,
  white,
  black,
  robot,
  ghost,
  king,
  ninja,
  cute
};

export const DEFAULT_AVATAR_URL = orange;

export function resolveIdentity(playerProfile, firebaseUser = null) {
  const googleDisplayName = firebaseUser?.displayName || firebaseUser?.account?.googleName;
  const googlePhoto = firebaseUser?.photoURL || firebaseUser?.account?.googlePhoto || playerProfile?.googlePhoto;

  const displayName = playerProfile?.username || googleDisplayName || "Guest Player";

  // 1. Custom selected game avatar (ID like "orange", or a full URL/path if legacy)
  const selectedAvatar = playerProfile?.selectedAvatar;
  let customAvatarUrl = null;
  if (selectedAvatar) {
    if (selectedAvatar === "google") {
      customAvatarUrl = googlePhoto;
    } else {
      customAvatarUrl = AVATAR_MAP[selectedAvatar] || selectedAvatar;
    }
  }

  // 2. Previously saved avatar (could be URL or ID)
  const legacyAvatar = playerProfile?.avatar;
  let legacyAvatarUrl = null;
  if (legacyAvatar) {
    if (legacyAvatar === "google") {
      legacyAvatarUrl = googlePhoto;
    } else {
      legacyAvatarUrl = AVATAR_MAP[legacyAvatar] || legacyAvatar;
    }
  }

  // 3. Google photo
  const googlePhotoUrl = googlePhoto || null;

  // 4. Default avatar
  const defaultAvatarUrl = DEFAULT_AVATAR_URL;

  // Apply Priority: Custom selected -> Previously saved -> Google photo -> Default
  const avatarUrl = customAvatarUrl || legacyAvatarUrl || googlePhotoUrl || defaultAvatarUrl;

  return {
    displayName,
    avatarUrl
  };
}
