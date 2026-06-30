import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updatePlayerProfile, validateUsername } from "../services/profileService";
import { saveLocalProfile } from "../utils/localProfile";

export function useProfile() {
  const { user, playerProfile, setPlayerProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveProfile = async (profileData) => {
    if (!user) return false;
    
    setIsSaving(true);
    setError(null);
    
    const usernameError = validateUsername(profileData.username);
    if (usernameError) {
      setError(usernameError);
      setIsSaving(false);
      return false;
    }

    const sanitizedData = {
      ...profileData,
      username: profileData.username.trim()
    };

    try {
      if (user.isGuest) {
        // Save local guest profile
        saveLocalProfile(sanitizedData);
        setPlayerProfile(sanitizedData);
        return true;
      } else {
        // Save cloud profile
        await updatePlayerProfile(user.uid, sanitizedData);
        setPlayerProfile(sanitizedData);
        return true;
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error(err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    profile: playerProfile,
    isSaving,
    error,
    saveProfile
  };
}
