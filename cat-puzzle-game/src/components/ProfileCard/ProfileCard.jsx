/**
 * ----------------------------------------------------
 * File : ProfileCard.jsx
 *
 * Purpose :
 * Premium Account card for the Settings page.
 *
 * States :
 * 1. No user (null)     — nothing rendered
 * 2. Guest user         — Guest Mode with Cloud Sync OFF + Google CTA
 * 3. Firebase user      — Full profile, Cloud Sync ON, Sign Out
 *
 * Props : none — reads from useAuth()
 *
 * Future-ready rows :
 * The card uses a row-list pattern so future items
 * (XP, Achievements, Themes, Premium) can be added
 * without redesigning the component.
 *
 * Design :
 * Glassmorphism, rounded cards, pastel gradients,
 * soft shadows — MeowMaze design language.
 *
 * Status :
 * Version 2.0 — UI polish pass
 * ----------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LogOut,
  Cloud,
  CloudOff,
  Loader2,
  CheckCircle2,
  UserCircle,
  Pencil
} from "lucide-react";
import { resolveIdentity } from "../../utils/identity";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

/* ── Mascot images ─────────────────────────────────── */
import normalCat from "../../assets/mascot/normal.png";
import winkCat   from "../../assets/mascot/wink.png";

/* ============================================================
   Google "G" SVG Icon
   Official Google brand colours, no external dependency.
============================================================ */
function GoogleIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ============================================================
   Helpers
============================================================ */

/** Formats a Date into a human-readable relative string. */
function formatLastSynced(date) {
  if (!date) return null;

  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSec < 10)        return "just now";
  if (diffSec < 60)        return `${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60)        return `${diffMin} min ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24)         return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1)       return "Yesterday";

  return date.toLocaleDateString();
}

/* ============================================================
   SyncPill
   Rounded status chip for Cloud Sync rows.
   Colours update automatically based on status string.
============================================================ */
function SyncPill({ status }) {

  const map = {
    ON:      { bg: "bg-green-100",  text: "text-green-600",  dot: "bg-green-400"  },
    Syncing: { bg: "bg-yellow-100", text: "text-yellow-600", dot: "bg-yellow-400 animate-pulse" },
    Offline: { bg: "bg-red-100",    text: "text-red-500",    dot: "bg-red-400"    },
    OFF:     { bg: "bg-gray-100",   text: "text-gray-400",   dot: "bg-gray-300"   },
    "—":     { bg: "bg-gray-100",   text: "text-gray-400",   dot: "bg-gray-300"   },
  };

  const cfg = map[status] || map["—"];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-0.5
        rounded-full text-xs font-semibold
        ${cfg.bg} ${cfg.text}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
}

/* ============================================================
   Sub-components
============================================================ */

/**
 * A single info row inside the card.
 * Used for Cloud Sync, Last Sync, and future rows.
 * value can be a string OR a React node (e.g. <SyncPill>).
 */
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3">

      <div className="flex items-center gap-2.5 text-gray-500">
        {icon}
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>

      {/* value is either a React node (pill) or plain text */}
      {typeof value === "string"
        ? <span className="text-sm font-semibold text-gray-500">{value}</span>
        : value
      }

    </div>
  );
}

/** Thin hairline divider between rows. */
function RowDivider() {
  return <div className="border-t border-gray-100" />;
}

/* ============================================================
   GuestCard
   Shown when user.isGuest === true
============================================================ */

function GuestCard({ user, playerProfile, onGoogleLogin, googleLoading, error }) {
  const { displayName, avatarUrl } = resolveIdentity(playerProfile, user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.01, boxShadow: "0 12px 40px rgba(124,92,255,0.13)" }}
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        border border-white/70
        shadow-[0_6px_28px_rgba(124,92,255,0.09)]
        overflow-hidden
        transition-shadow duration-200
      "
    >
      <div className="h-1 bg-gradient-to-r from-gray-200 via-purple-200 to-gray-200" />

      <div className="px-5 pt-5 pb-6 space-y-0">
        <div className="flex items-center gap-4 pb-5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="
                w-[72px] h-[72px]
                rounded-2xl object-cover
                flex-shrink-0 shadow-md bg-white
                ring-2 ring-purple-100 ring-offset-2
              "
            />
          ) : (
            <div
              className="
                w-[72px] h-[72px]
                rounded-2xl
                bg-gradient-to-br from-[#F3EEFF] to-[#E8F5FF]
                flex items-center justify-center
                flex-shrink-0 shadow-sm
                overflow-hidden
                ring-2 ring-purple-100 ring-offset-2
              "
            >
              <img
                src={normalCat}
                alt="Guest cat"
                className="w-12 h-12 object-contain"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-extrabold text-gray-800 truncate leading-tight">
              {displayName}
            </h3>
            <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">
              Local Guest Profile
            </p>
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              <CloudOff size={10} />
              Cloud Sync OFF
            </span>
          </div>
        </div>

        <RowDivider />

        <p className="text-[12px] text-gray-400 leading-relaxed pt-4 pb-2">
          Sign in to sync your progress across devices and compete on the global leaderboard.
        </p>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="
                text-xs text-red-500
                bg-red-50 rounded-xl
                px-3 py-2 text-center mt-1
              "
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          onClick={onGoogleLogin}
          disabled={googleLoading}
          className="
            w-full mt-4
            flex items-center justify-center gap-2.5
            py-3.5
            rounded-2xl
            bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]
            text-white text-sm font-bold
            shadow-lg shadow-purple-200/60
            hover:shadow-xl hover:shadow-purple-300/40
            hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-60
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            transition-all duration-200
          "
        >
          {googleLoading
            ? <Loader2 size={17} className="animate-spin" />
            : <GoogleIcon size={17} />
          }
          {googleLoading ? "Linking Account…" : "Link Google Account"}
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   LoggedInCard
   Shown when a real Firebase user is authenticated.
============================================================ */

function LoggedInCard({ user, playerProfile, syncStatus, lastSynced, onLogout, logoutLoading }) {
  const navigate = useNavigate();
  const { displayName, avatarUrl } = resolveIdentity(playerProfile, user);

  /* Map internal syncStatus → pill label */
  const pillLabel =
    syncStatus === "synced"  ? "ON"      :
    syncStatus === "syncing" ? "Syncing" :
    syncStatus === "offline" ? "Offline" : "—";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.01, boxShadow: "0 12px 40px rgba(124,92,255,0.15)" }}
      className="
        rounded-3xl
        bg-white/80
        backdrop-blur-xl
        border border-white/70
        shadow-[0_6px_28px_rgba(124,92,255,0.11)]
        overflow-hidden
        transition-shadow duration-200
      "
    >

      {/* Purple accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]" />

      <div className="px-5 pt-5 pb-6 space-y-0">

        {/* ── Identity row ── */}
        <div className="flex items-center gap-4 pb-5">

          {/* Avatar — Custom or Google photo or cat wink fallback */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="
                w-[72px] h-[72px]
                rounded-2xl object-cover
                flex-shrink-0 shadow-md bg-white
                ring-2 ring-purple-200 ring-offset-2
              "
            />
          ) : (
            <div
              className="
                w-[72px] h-[72px]
                rounded-2xl
                bg-gradient-to-br from-[#F3EEFF] to-[#E8F5FF]
                flex items-center justify-center
                flex-shrink-0 shadow-sm
                overflow-hidden
                ring-2 ring-purple-200 ring-offset-2
              "
            >
              <img
                src={winkCat}
                alt="User avatar"
                className="w-12 h-12 object-contain"
              />
            </div>
          )}

          {/* Name + status pill */}
          <div className="flex-1 min-w-0">

            <h3 className="text-lg font-extrabold text-gray-800 truncate leading-tight">
              {displayName}
            </h3>

            <p className="text-[12px] text-gray-400 truncate mt-1">
              Signed in with Google
            </p>

            {/* Inline status micro-pill under name */}
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-green-600 bg-green-50 rounded-full px-2 py-0.5">
              <CheckCircle2 size={10} />
              Cloud Save Active
            </span>

          </div>
        </div>

        <RowDivider />

        {/* ── Action Buttons ── */}
        <div className="flex gap-3 py-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="
              flex-1 py-3 bg-purple-50 text-purple-600 rounded-2xl
              text-[13px] font-bold border border-purple-100
              flex items-center justify-center gap-1.5
              hover:bg-purple-100 transition-colors
            "
          >
            <Pencil size={15} /> Edit Profile
          </button>
        </div>



        {/* ── Sign Out button ── */}
        <div className="pt-4">
          <button
            onClick={onLogout}
            disabled={logoutLoading}
            className="
              w-full
              flex items-center justify-center gap-2
              py-3
              rounded-2xl
              text-red-500 text-sm font-bold
              border border-red-100
              bg-red-50/80
              hover:bg-red-100
              hover:scale-[1.01]
              active:scale-[0.99]
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:scale-100
              transition-all duration-200
            "
          >
            {logoutLoading
              ? <Loader2 size={16} className="animate-spin" />
              : <LogOut  size={16} />
            }
            {logoutLoading ? "Signing out…" : "🚪 Sign Out"}
          </button>
        </div>

      </div>
    </motion.div>
  );
}

/* ============================================================
   ProfileCard — public export
   Reads auth state from context, delegates rendering.
============================================================ */

export default function ProfileCard() {

  const { user, playerProfile, login, logout, syncStatus, lastSynced } = useAuth();

  const [googleLoading, setGoogleLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [loginError,    setLoginError]    = useState(null);

  /* Nothing to show if no user is present */
  if (!user) return null;

  /* ── Handlers ── */

  async function handleGoogleLogin() {
    setLoginError(null);
    setGoogleLoading(true);
    try {
      await login();
    } catch (err) {
      console.error("[ProfileCard] Google login error:", err);
      setLoginError("Google Sign-In failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error("[ProfileCard] Logout error:", err);
    } finally {
      setLogoutLoading(false);
    }
  }

  /* ── Render ── */

  return (
    <div className="space-y-3">

      {/* ── Section header — purple accent style ── */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#7C5CFF] to-[#5B3DF5]" />
        <span className="text-sm font-bold text-[#2E2E3A]">Account</span>
      </div>

      <AnimatePresence mode="wait">

        {user.isGuest ? (
          <GuestCard
            key="guest"
            user={user}
            playerProfile={playerProfile}
            onGoogleLogin={handleGoogleLogin}
            googleLoading={googleLoading}
            error={loginError}
          />
        ) : (
          <LoggedInCard
            key="loggedin"
            user={user}
            playerProfile={playerProfile}
            syncStatus={syncStatus}
            lastSynced={lastSynced}
            onLogout={handleLogout}
            logoutLoading={logoutLoading}
          />
        )}

      </AnimatePresence>

    </div>
  );
}
