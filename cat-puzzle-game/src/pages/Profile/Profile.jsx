import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Settings, Award, Palette, Cat, Calendar, Users, ChevronRight, Edit3, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { fetchLeaderboard } from "../../services/leaderboardService";
import { getProgress } from "../../utils/progress";
import { resolveIdentity, DEFAULT_AVATAR_URL } from "../../utils/identity";

import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, playerProfile, logout, syncStatus } = useAuth();
  
  const [rank, setRank] = useState(null);
  const [stats, setStats] = useState({ totalStars: 0, completedLevels: 0, currentLevel: 1 });
  const [loading, setLoading] = useState(true);

  const isGuest = !user || user.isGuest;

  useEffect(() => {
    const progress = getProgress();
    const completedLevels = Object.keys(progress.completedLevels || {}).length;
    const totalStars = Object.values(progress.stars || {}).reduce((acc, val) => acc + val, 0);
    setStats({ totalStars, completedLevels, currentLevel: progress.currentLevel || 1 });

    if (isGuest) {
      setLoading(false);
      return;
    }

    async function loadRank() {
      try {
        const players = await fetchLeaderboard();
        const playerIndex = players.findIndex(p => p.uid === user.uid);
        if (playerIndex !== -1) {
          setRank(playerIndex + 1);
        }
      } catch (err) {
        console.error("Failed to load rank:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRank();
  }, [user, isGuest]);

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  // Profile data resolution
  const { displayName, avatarUrl } = resolveIdentity(playerProfile, user);
  
  const joinedDate = playerProfile?.joinedDate 
    ? new Date(playerProfile.joinedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : user?.metadata?.creationTime 
      ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
      : "Unknown";

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] pb-24 font-nunito text-gray-800">
      <BackgroundDecoration />
      <div className="relative z-10 max-w-md mx-auto pt-6 px-5">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2.5 rounded-full bg-white/60 hover:bg-white text-gray-600 shadow-sm border border-white/50 transition-all active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-extrabold text-[#2E2E3A] tracking-tight flex items-center gap-2">
              🐱 Player Hub
            </h1>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="p-2.5 rounded-full bg-white/60 hover:bg-white text-gray-600 shadow-sm border border-white/50 transition-all active:scale-95"
          >
            <Settings size={20} />
          </button>
        </div>

        {loading ? (
          <div className="animate-pulse flex flex-col gap-4">
            <div className="h-64 bg-white/50 rounded-3xl"></div>
            <div className="h-32 bg-white/50 rounded-3xl"></div>
          </div>
        ) : (
          <motion.div initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.1 } } }} className="space-y-6">
            
            {/* Header Card */}
            <motion.div variants={fadeInUp} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/60 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-purple-100/50 to-transparent"></div>
              
              <div className="relative flex flex-col items-center mt-2">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-28 h-28 rounded-[2rem] border-4 border-white shadow-xl object-cover bg-white mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR_URL;
                  }}
                />
                <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">{displayName}</h2>
                
                <div className="mt-2 flex items-center justify-center gap-2">
                  {isGuest ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 border border-gray-200">
                      <span className="w-2 h-2 rounded-full bg-gray-400"></span> Guest Mode
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 rounded-full text-xs font-bold text-green-600 border border-green-100">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> Cloud Save Active
                    </span>
                  )}
                </div>

                {!isGuest && (
                  <p className="text-sm font-semibold text-gray-400 mt-3">
                    Joined {joinedDate}
                  </p>
                )}

                {isGuest ? (
                  <button
                    onClick={() => navigate("/settings")}
                    className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5] text-white text-[15px] font-bold shadow-lg shadow-purple-200 hover:-translate-y-0.5 active:scale-95 transition-all"
                  >
                    Continue with Google
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="mt-6 w-full py-3 rounded-2xl bg-purple-50 text-[#7C5CFF] text-[14px] font-bold border border-purple-100 flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors"
                  >
                    <Edit3 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </motion.div>

            {/* Player Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
              <StatCard icon="⭐" label="Total Stars" value={stats.totalStars} color="bg-yellow-50 text-yellow-600 border-yellow-100" />
              <StatCard icon="🧩" label="Completed Levels" value={stats.completedLevels} color="bg-blue-50 text-blue-600 border-blue-100" />
              <StatCard icon="🎯" label="Current Level" value={stats.currentLevel} color="bg-purple-50 text-purple-600 border-purple-100" />
              <StatCard icon="🏆" label="Global Rank" value={rank ? `#${rank}` : "Unranked"} color="bg-orange-50 text-orange-600 border-orange-100" />
              <StatCard 
                icon="☁" 
                label="Cloud Status" 
                value={syncStatus === "synced" ? "Synced" : syncStatus === "syncing" ? "Syncing..." : "Offline"} 
                color="bg-green-50 text-green-600 border-green-100 col-span-2 flex-row items-center gap-4 py-3" 
                isHorizontal={true}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeInUp} className="bg-white/70 backdrop-blur-md rounded-3xl p-2 shadow-lg border border-white/60">
              <ActionRow icon={<Edit3 size={20} />} title="Edit Profile" onClick={() => navigate("/edit-profile")} color="text-purple-500 bg-purple-50" />
              <ActionRow icon={<Trophy size={20} />} title="Leaderboard" onClick={() => navigate("/leaderboard")} color="text-yellow-500 bg-yellow-50" />
              <ActionRow icon={<Settings size={20} />} title="Settings" onClick={() => navigate("/settings")} color="text-gray-500 bg-gray-50" />
            </motion.div>

            {/* Coming Soon Section */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-bold text-gray-700 mb-3 px-2 flex items-center justify-between">
                Coming Soon
                <span className="text-[10px] uppercase tracking-wider bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">Preview</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <ComingSoonCard icon={<Award size={24} />} title="Achievements" />
                <ComingSoonCard icon={<Palette size={24} />} title="Themes" />
                <ComingSoonCard icon={<Cat size={24} />} title="Cat Collection" />
                <ComingSoonCard icon={<Calendar size={24} />} title="Daily Quests" />
                <ComingSoonCard icon={<Users size={24} />} title="Multiplayer" className="col-span-2" />
              </div>
            </motion.div>

            {/* Account Section */}
            <motion.div variants={fadeInUp} className="bg-white/70 backdrop-blur-md rounded-3xl p-5 shadow-lg border border-white/60">
              <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider mb-4 px-1">Account</h3>
              
              {isGuest ? (
                <>
                  <div className="mb-6 px-1">
                    <p className="text-sm text-gray-500 font-medium">You are playing on a local profile. Link a Google Account to enable Cloud Save and Leaderboard.</p>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await login();
                      } catch (err) {
                        console.error("Login failed", err);
                      }
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5] text-white text-[14px] font-bold shadow-lg shadow-purple-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    ☁ Link Google Account
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-4 px-1 mb-6">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-sm font-bold text-gray-500">Google Email</span>
                      <span className="text-sm font-bold text-gray-800">{user.email || "Hidden"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-sm font-bold text-gray-500">Joined</span>
                      <span className="text-sm font-bold text-gray-800">{joinedDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-500">Connected Account</span>
                      <span className="text-sm font-bold text-gray-800">Google</span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-2xl bg-red-50 text-red-500 text-[14px] font-bold border border-red-100 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              )}
            </motion.div>

          </motion.div>
        )}
      </div>
    </div>
  );
}

// Helpers

function StatCard({ icon, label, value, color, isHorizontal }) {
  if (isHorizontal) {
    return (
      <div className={`bg-white/80 backdrop-blur-md rounded-[1.5rem] px-5 py-4 shadow-sm border border-white flex items-center justify-between col-span-2`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${color.split(' ').slice(0, 3).join(' ')}`}>
            {icon}
          </div>
          <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
        <div className="text-xl font-extrabold text-gray-800 leading-tight">{value}</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-4 shadow-sm border border-white flex flex-col justify-between">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-extrabold text-gray-800 leading-tight">{value}</div>
      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function ActionRow({ icon, title, onClick, color }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50/80 cursor-pointer transition-colors active:scale-[0.98]"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <span className="font-bold text-gray-800">{title}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}

function ComingSoonCard({ icon, title, className = "" }) {
  return (
    <div className={`bg-gray-50/50 backdrop-blur-sm rounded-[1.5rem] p-4 border border-gray-100/50 relative overflow-hidden group cursor-not-allowed ${className}`}>
      <div className="absolute top-2 right-2">
        <span className="text-[9px] font-extrabold uppercase bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">Lock</span>
      </div>
      <div className="text-gray-300 mb-2 group-hover:scale-110 transition-transform origin-left">
        {icon}
      </div>
      <div className="font-bold text-gray-400 text-sm">{title}</div>
    </div>
  );
}
