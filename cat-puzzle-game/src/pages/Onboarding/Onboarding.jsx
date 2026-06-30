import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useProfile } from "../../hooks/useProfile";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import Button from "../../components/Button/Button";
import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";
import { User } from "lucide-react";

import catMascot from "../../assets/mascot/happy.png";

// Hardcoded for validation check
const AVATAR_SRCS = [
  "/assets/orange.png", "/assets/white.png", "/assets/black.png", 
  "/assets/robot.png", "/assets/ghost.png", "/assets/king.png", 
  "/assets/ninja.png", "/assets/cute.png"
];

function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveProfile, isSaving, error } = useProfile();
  
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    username: "",
    avatar: ""
  });
  const [localError, setLocalError] = useState("");

  const googlePhoto = user?.photoURL || null;

  const handleNext = () => {
    setLocalError("");
    
    // Step 1 Validation
    if (step === 1) {
      if (!profileData.username.trim()) {
        setLocalError("Please enter a username.");
        return;
      }
      if (profileData.username.length < 3) {
        setLocalError("Username must be at least 3 characters.");
        return;
      }
    }
    
    setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleFinish = async () => {
    setLocalError("");
    
    if (!profileData.avatar && !googlePhoto) {
      setLocalError("Please select an avatar.");
      return;
    }

    const finalAvatar = profileData.avatar || googlePhoto;
    const isGoogleAvatar = finalAvatar === googlePhoto && !AVATAR_SRCS.includes(finalAvatar);

    const finalData = {
      ...profileData,
      avatar: finalAvatar,
      avatarType: isGoogleAvatar ? "google" : "custom",
      joinedDate: new Date().toISOString(),
      profileCompleted: true,
    };
    
    const success = await saveProfile(finalData);
    if (success) {
      navigate("/");
    }
  };

  const currentProgress = (step / 2) * 100;

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] flex flex-col items-center justify-center p-6">
      <BackgroundDecoration />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.img 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            src={catMascot} 
            alt="Mascot" 
            className="w-24 mx-auto mb-4 drop-shadow-md"
          />
          <h2 className="text-3xl font-extrabold text-[#2E2E3A]">Welcome to MeowMaze!</h2>
          <p className="text-gray-600 mt-2">Let's create your explorer profile.</p>
        </div>

        {/* Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl rounded-[32px] p-8">
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
            <motion.div 
              className="bg-[#7C5CFF] h-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {(error || localError) && (
            <div className="mb-6 p-3 bg-red-100 text-red-600 rounded-xl text-sm text-center font-medium">
              {error || localError}
            </div>
          )}

          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">Step 1: Choose Username</h3>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User size={18} />
                      </div>
                      <input
                        autoFocus
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                        placeholder="Explorer123"
                        maxLength={20}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7C5CFF] outline-none"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">Step 2: Choose Avatar</h3>
                    <AvatarPicker 
                      googlePhotoUrl={googlePhoto}
                      selectedAvatar={profileData.avatar || googlePhoto}
                      onSelect={(avatar) => setProfileData({ ...profileData, avatar })}
                    />
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button 
                onClick={handleBack}
                disabled={isSaving}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back
              </button>
            )}
            
            {step < 2 ? (
              <Button 
                text="Next"
                onClick={handleNext}
                className="flex-[2] bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]"
              />
            ) : (
              <Button 
                text={isSaving ? "Saving..." : "Finish!"}
                onClick={handleFinish}
                disabled={isSaving}
                className="flex-[2] bg-gradient-to-r from-[#79E0D3] to-[#54D6C7]"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Onboarding;
