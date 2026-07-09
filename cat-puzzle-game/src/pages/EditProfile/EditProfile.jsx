import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../hooks/useProfile";
import { resolveIdentity, AVATAR_MAP } from "../../utils/identity";
import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const AVATAR_SRCS = [
  "/assets/orange.png", "/assets/white.png", "/assets/black.png", 
  "/assets/robot.png", "/assets/ghost.png", "/assets/king.png", 
  "/assets/ninja.png", "/assets/cute.png"
];

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, isSaving, error, saveProfile } = useProfile();

  // Guest validation: redirect to settings if guest or no user
  if (!user || user.isGuest) {
    return <Navigate to="/settings" replace />;
  }

  // Local state for edits
  const [editData, setEditData] = useState({
    username: "",
    avatar: "",
    selectedAvatar: "",
    gender: "",
    ageGroup: ""
  });
  
  const [successMsg, setSuccessMsg] = useState("");

  // Populate local state from profile once loaded
  useEffect(() => {
    if (profile) {
      setEditData({
        username: profile.username || "",
        avatar: profile.avatar || "",
        selectedAvatar: profile.selectedAvatar || "",
        gender: profile.gender || "",
        ageGroup: profile.ageGroup || ""
      });
    } else {
      setEditData({
        username: user.displayName || "",
        avatar: user.photoURL || "",
        selectedAvatar: user.photoURL ? "google" : "orange",
        gender: "",
        ageGroup: ""
      });
    }
  }, [profile, user]);

  const handleAvatarSelect = (avatarId, avatarUrl) => {
    setEditData((prev) => ({ ...prev, avatar: avatarUrl, selectedAvatar: avatarId }));
  };

  const handleSave = async () => {
    setSuccessMsg("");
    
    const finalAvatar = editData.avatar || user.photoURL;
    
    // Determine the final selectedAvatar ID using AVATAR_MAP
    let finalSelectedAvatar = editData.selectedAvatar;
    if (!finalSelectedAvatar) {
      finalSelectedAvatar = Object.keys(AVATAR_MAP).find(key => AVATAR_MAP[key] === finalAvatar) || (finalAvatar === user.photoURL ? "google" : "orange");
    }

    const isGoogleAvatar = finalSelectedAvatar === "google";

    // Pass existing profileCompleted and joinedDate so they aren't lost
    const finalData = {
      ...editData,
      avatar: finalAvatar,
      selectedAvatar: finalSelectedAvatar,
      avatarType: isGoogleAvatar ? "google" : "custom",
      profileCompleted: profile?.profileCompleted ?? true,
      joinedDate: profile?.joinedDate || new Date().toISOString()
    };
    
    const success = await saveProfile(finalData);
    if (success) {
      setSuccessMsg("Profile saved successfully!");
      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-[#F3EEFF] to-[#E8F5FF] text-gray-800 font-nunito p-4 sm:p-6 pb-24 overflow-x-hidden selection:bg-purple-200">
      <div className="max-w-md mx-auto w-full">
        {/* Top Bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white text-gray-600 shadow-sm border border-white/50 transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-extrabold text-gray-800 drop-shadow-sm tracking-tight">
            🐱 Edit Profile
          </h1>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/80 shadow-[0_8px_30px_rgba(124,92,255,0.08)] mb-6"
        >
          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-8 border-b border-gray-200/50 pb-6">
            <img
              src={editData.avatar || resolveIdentity(profile, user).avatarUrl}
              alt="Avatar preview"
              className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white mb-4 bg-white"
            />
            <div className="flex flex-col text-center">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                Explorer
              </span>
              <span className="text-xl font-extrabold text-gray-800">
                {editData.username || resolveIdentity(profile, user).displayName}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-green-600 bg-green-50 rounded-full px-2 py-0.5 border border-green-100">
              <CheckCircle2 size={10} /> Cloud Save Active
            </span>
          </div>

          <div className="space-y-6">
            <ProfileForm profileData={editData} onChange={setEditData} />

            <div className="pt-2">
              <AvatarPicker
                selectedAvatar={editData.avatar}
                onSelect={handleAvatarSelect}
                googlePhotoUrl={user.photoURL}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 bg-red-50 px-4 py-3 rounded-2xl text-sm font-semibold border border-red-100"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            
            {/* Success Message */}
            <AnimatePresence>
              {successMsg && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-green-600 bg-green-50 px-4 py-3 rounded-2xl text-sm font-semibold border border-green-100"
                >
                  {successMsg}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="
                w-full mt-4
                flex items-center justify-center gap-2
                py-3.5
                rounded-2xl
                bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]
                text-white text-[15px] font-bold tracking-wide
                shadow-lg shadow-purple-200/50
                hover:shadow-xl hover:shadow-purple-300/40
                hover:-translate-y-0.5
                active:translate-y-0 active:scale-[0.98]
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:translate-y-0
                transition-all duration-200
              "
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
