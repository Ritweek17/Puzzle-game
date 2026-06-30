/**
 * ----------------------------------------------------
 * File : Settings.jsx
 *
 * Purpose :
 * Game Settings Page
 *
 * Structure :
 * 1. Account  — ProfileCard (auth + cloud status)
 * 2. Audio    — Sound Effects, Background Music
 * 3. Game     — Statistics, Reset Progress
 *
 * Design :
 * All sections share a unified premium design language —
 * glassmorphism cards, purple section headers, pill toggles,
 * soft hover animations — matching the Account card.
 *
 * Status :
 * Final v2 — UI polish: unified section design
 * ----------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Volume2,
  Music,
  RotateCcw,
  BarChart3,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

import { resetProgress } from "../../utils/progress";
import { getSettings, toggleSound, toggleMusic } from "../../utils/settings";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useAuth } from "../../context/AuthContext";
import { deleteCloudProgress } from "../../services/progressSync";

/* ============================================================
   Design tokens — shared with ProfileCard
============================================================ */

const CARD_CLASS = `
  rounded-3xl
  bg-white/80
  backdrop-blur-xl
  border border-white/70
  shadow-[0_6px_28px_rgba(124,92,255,0.09)]
  overflow-hidden
`;

/* ============================================================
   StatusPill
   Identical to ProfileCard's SyncPill — colour-coded toggle chip.
============================================================ */
function StatusPill({ on }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-0.5
        rounded-full text-xs font-semibold
        transition-colors duration-200
        ${on
          ? "bg-green-100 text-green-600"
          : "bg-gray-100 text-gray-400"
        }
      `}
    >
      <span
        className={`
          w-1.5 h-1.5 rounded-full flex-shrink-0
          ${on ? "bg-green-400" : "bg-gray-300"}
        `}
      />
      {on ? "ON" : "OFF"}
    </span>
  );
}

/* ============================================================
   SectionHeader
   Purple accent bar + bold label — matches ProfileCard header.
============================================================ */
function SectionHeader({ label }) {
  return (
    <div className="flex items-center gap-2 px-1 mb-3">
      <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#7C5CFF] to-[#5B3DF5]" />
      <span className="text-sm font-bold text-[#2E2E3A]">{label}</span>
    </div>
  );
}

/* ============================================================
   RowDivider
============================================================ */
function RowDivider() {
  return <div className="border-t border-gray-100" />;
}

/* ============================================================
   ToggleRow
   A pressable row with a label + StatusPill on the right.
   Used for Sound Effects and Background Music.
============================================================ */
function ToggleRow({ icon, label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="
        w-full flex items-center justify-between
        px-4 py-3.5
        text-left
        transition-colors duration-150
        hover:bg-purple-50/60
        rounded-xl
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-[#7C5CFF]">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <StatusPill on={active} />
    </motion.button>
  );
}

/* ============================================================
   NavRow
   A pressable row that navigates somewhere.
   White background with a right-chevron.
   Used for Statistics.
============================================================ */
function NavRow({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="
        w-full flex items-center justify-between
        px-4 py-3.5
        text-left
        transition-colors duration-150
        hover:bg-purple-50/60
        rounded-xl
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-[#7C5CFF]">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
    </motion.button>
  );
}

/* ============================================================
   DangerRow
   A pressable row with a red accent for destructive actions.
   Used for Reset Progress.
============================================================ */
function DangerRow({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="
        w-full flex items-center justify-between
        px-4 py-3.5
        text-left
        transition-colors duration-150
        hover:bg-red-50
        rounded-xl
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-red-400">{icon}</span>
        <span className="text-sm font-medium text-red-500">{label}</span>
      </div>
      <ChevronRight size={16} className="text-red-300 flex-shrink-0" />
    </motion.button>
  );
}

/* ============================================================
   ResetModal
   Confirmation dialog before resetting progress.
   Animated — slides in from below.
============================================================ */
function ResetModal({ onConfirm, onCancel, isGoogleUser }) {
  return (

    /* Backdrop */
    <motion.div
      key="reset-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
      className="
        fixed inset-0 z-50
        bg-black/40 backdrop-blur-sm
        flex items-end sm:items-center justify-center
        p-4
      "
    >

      {/* Sheet / Card */}
      <motion.div
        key="reset-sheet"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-sm
          rounded-3xl
          bg-white/95 backdrop-blur-xl
          border border-white/70
          shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          overflow-hidden
        "
      >

        {/* Red accent bar */}
        <div className="h-1 bg-gradient-to-r from-red-400 to-red-500" />

        <div className="px-6 pt-6 pb-7 text-center space-y-4">

          {/* Icon */}
          <div className="flex justify-center">
            <div className="
              w-14 h-14 rounded-2xl
              bg-red-50
              flex items-center justify-center
            ">
              <AlertTriangle size={28} className="text-red-400" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-gray-800">
              Reset Progress?
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              This will permanently erase your game progress.
              {isGoogleUser && (
                <>
                  <br /><br />
                  <span className="text-red-400 font-semibold">
                    For Google users, your cloud progress will also be removed and you will be signed out.
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">

            {/* Primary danger */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              className="
                w-full py-3 rounded-2xl
                bg-gradient-to-r from-red-500 to-red-400
                text-white text-sm font-bold
                shadow-lg shadow-red-200/60
                hover:shadow-xl
                hover:scale-[1.01]
                transition-all duration-200
              "
            >
              Reset Progress
            </motion.button>

            {/* Cancel */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="
                w-full py-3 rounded-2xl
                bg-gray-100
                text-gray-600 text-sm font-semibold
                hover:bg-gray-200
                hover:scale-[1.01]
                transition-all duration-200
              "
            >
              Cancel
            </motion.button>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Settings — main component
============================================================ */
function Settings() {

  const navigate = useNavigate();
  const { user, logout, loginAsGuest } = useAuth();

  const [settings, setSettings]       = useState(getSettings());
  const [showResetModal, setShowReset] = useState(false);

  const isGoogleUser = user && !user.isGuest;

  /* ── Handlers ── */

  function handleSound() {
    toggleSound();
    setSettings(getSettings());
  }

  function handleMusic() {
    toggleMusic();
    setSettings(getSettings());
  }

  async function handleResetConfirm() {
    if (isGoogleUser) {
      await deleteCloudProgress(user.uid);
      resetProgress();
      await logout();
      loginAsGuest();
    } else {
      resetProgress();
    }
    setShowReset(false);
    navigate("/");
  }

  /* ── Render ── */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC]">

      <div className="max-w-xl mx-auto px-5 py-6">

        {/* ── Page Header ── */}

        <div className="flex items-center justify-between mb-8">

          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              p-3 rounded-2xl
              bg-white/80 backdrop-blur-md
              border border-white/70
              shadow-[0_4px_16px_rgba(124,92,255,0.10)]
              transition-shadow duration-200
            "
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </motion.button>

          <h1 className="text-2xl font-bold text-[#2E2E3A]">⚙️ Settings</h1>

          {/* Spacer to keep title centred */}
          <div className="w-11" />

        </div>

        {/* ── 1. Account Section ── */}

        <div className="mb-7">
          <ProfileCard />
        </div>

        {/* ── 2. Audio Section ── */}

        <div className="mb-7">

          <SectionHeader label="🔊 Audio" />

          <div className={CARD_CLASS}>

            {/* Purple accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]" />

            <div className="px-2 py-2">

              <ToggleRow
                icon={<Volume2 size={17} />}
                label="Sound Effects"
                active={settings.sound}
                onClick={handleSound}
              />

              <div className="px-4">
                <RowDivider />
              </div>

              <ToggleRow
                icon={<Music size={17} />}
                label="Background Music"
                active={settings.music}
                onClick={handleMusic}
              />

            </div>
          </div>
        </div>

        {/* ── 3. Game Section ── */}

        <div className="mb-7">

          <SectionHeader label="🎮 Game" />

          <div className={CARD_CLASS}>

            {/* Purple accent bar */}
            <div className="h-1 bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]" />

            <div className="px-2 py-2">

              <NavRow
                icon={<BarChart3 size={17} />}
                label="Statistics"
                onClick={() => navigate("/statistics")}
              />

              <div className="px-4">
                <RowDivider />
              </div>

              <DangerRow
                icon={<RotateCcw size={17} />}
                label="Reset Progress"
                onClick={() => setShowReset(true)}
              />

            </div>
          </div>
        </div>

      </div>

      {/* ── Reset Confirmation Modal ── */}

      <AnimatePresence>
        {showResetModal && (
          <ResetModal
            onConfirm={handleResetConfirm}
            onCancel={() => setShowReset(false)}
            isGoogleUser={isGoogleUser}
          />
        )}
      </AnimatePresence>

    </div>
  );

}

export default Settings;