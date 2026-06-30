/**
 * ----------------------------------------------------
 * File : PlayModal.jsx
 *
 * Purpose :
 * Animated bottom sheet shown when the user clicks Play.
 *
 * Responsibilities :
 * - Guest login  → close sheet → navigate to /levels
 * - Google login → Firebase OAuth → navigate to /levels
 * - Show friendly error if Google login fails
 * - "Not Now" → close sheet, stay on Home
 *
 * Props :
 * - isOpen   : boolean — controls visibility
 * - onClose  : function — called to close the sheet
 *
 * Architecture :
 * All auth logic is contained here.
 * Home.jsx only passes isOpen / onClose.
 *
 * Design :
 * Glassmorphism, rounded corners, soft shadows,
 * Framer Motion slide-up + backdrop fade.
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserRound, X, Check, Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

/* --------------------------------------------------------
   Animation variants
-------------------------------------------------------- */

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 32,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

/* --------------------------------------------------------
   Benefits list
-------------------------------------------------------- */

const BENEFITS = [
  "Cloud Save",
  "Progress Sync",
  "Global Leaderboard",
  "Future Achievements",
];

/* --------------------------------------------------------
   Component
-------------------------------------------------------- */

function PlayModal({ isOpen, onClose }) {

  const navigate = useNavigate();

  const { login, loginAsGuest } = useAuth();

  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState(null);

  /* ------------------------------------------------
     Guest login — no Firebase, no loading state
  ------------------------------------------------ */

  function handleGuestLogin() {

    loginAsGuest();

    onClose();

    navigate("/levels");

  }

  /* ------------------------------------------------
     Google login
  ------------------------------------------------ */

  async function handleGoogleLogin() {

    setError(null);

    setGoogleLoading(true);

    try {

      await login();

      // Firebase auth listener will update user in context.
      // Navigate after successful login.
      onClose();

      navigate("/levels");

    } catch (err) {

      console.error("Google login error:", err);

      // Show a friendly message; do not navigate.
      setError("Google Sign‑In failed. Please try again.");

    } finally {

      setGoogleLoading(false);

    }

  }

  /* ------------------------------------------------
     Close handler — also clears any error
  ------------------------------------------------ */

  function handleClose() {

    setError(null);

    onClose();

  }

  /* ------------------------------------------------
     Render
  ------------------------------------------------ */

  return (

    <AnimatePresence>

      {isOpen && (

        <>

          {/* ── Backdrop ── */}

          <motion.div

            key="backdrop"

            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
            "

            variants={backdropVariants}

            initial="hidden"

            animate="visible"

            exit="exit"

            onClick={handleClose}

          />

          {/* ── Bottom Sheet ── */}

          <motion.div

            key="sheet"

            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              mx-auto
              max-w-lg
              rounded-t-[32px]
              bg-white/80
              backdrop-blur-2xl
              border
              border-white/60
              shadow-[0_-20px_60px_rgba(124,92,255,0.20)]
              px-6
              pt-5
              pb-10
            "

            variants={sheetVariants}

            initial="hidden"

            animate="visible"

            exit="exit"

          >

            {/* ── Drag Handle ── */}

            <div className="flex justify-center mb-4">

              <div className="w-10 h-1 rounded-full bg-gray-300" />

            </div>

            {/* ── Close Button ── */}

            <button

              onClick={handleClose}

              className="
                absolute
                top-5
                right-5
                p-2
                rounded-full
                text-gray-400
                hover:text-gray-600
                hover:bg-gray-100
                transition-all
              "

              aria-label="Close"

            >

              <X size={20} />

            </button>

            {/* ── Title ── */}

            <div className="text-center mb-6">

              <h2 className="text-2xl font-bold text-gray-800">

                🐱 Continue Playing

              </h2>

              <p className="mt-1 text-sm text-gray-500">

                Choose how you'd like to play.

              </p>

            </div>

            {/* ── Auth Buttons ── */}

            <div className="flex flex-col gap-3 mb-6">

              {/* Continue as Guest */}

              <button

                onClick={handleGuestLogin}

                className="
                  w-full
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  bg-gray-50
                  border
                  border-gray-200
                  hover:bg-gray-100
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  transition-all
                  duration-200
                  text-left
                "

              >

                <div

                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-[#79E0D3]
                    to-[#54D6C7]
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                    shadow-md
                  "

                >

                  <UserRound size={20} className="text-white" />

                </div>

                <div>

                  <p className="font-semibold text-gray-800">

                    Continue as Guest

                  </p>

                  <p className="text-xs text-gray-500 mt-0.5">

                    Play instantly without signing in.

                  </p>

                </div>

              </button>

              {/* Continue with Google */}

              <button

                onClick={handleGoogleLogin}

                disabled={googleLoading}

                className="
                  w-full
                  flex
                  items-start
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  bg-gradient-to-r
                  from-[#7C5CFF]
                  to-[#5B3DF5]
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  disabled:hover:scale-100
                  transition-all
                  duration-200
                  text-left
                  shadow-lg
                  shadow-purple-200
                "

              >

                <div

                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-white/20
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "

                >

                  {googleLoading ? (

                    <Loader2

                      size={20}

                      className="text-white animate-spin"

                    />

                  ) : (

                    <LogIn size={20} className="text-white" />

                  )}

                </div>

                <div>

                  <p className="font-semibold text-white">

                    {googleLoading ? "Signing in…" : "Continue with Google"}

                  </p>

                  <p className="text-xs text-white/70 mt-0.5">

                    Sync progress across devices and compete on the leaderboard.

                  </p>

                </div>

              </button>

            </div>

            {/* ── Error Message ── */}

            {error && (

              <motion.p

                initial={{ opacity: 0, y: -4 }}

                animate={{ opacity: 1, y: 0 }}

                className="
                  mb-4
                  text-center
                  text-sm
                  text-red-500
                  bg-red-50
                  rounded-xl
                  px-4
                  py-2
                "

              >

                {error}

              </motion.p>

            )}

            {/* ── Benefits Section ── */}

            <div

              className="
                rounded-2xl
                bg-gradient-to-br
                from-[#F8F5FF]
                to-[#EEF9FF]
                border
                border-purple-100
                px-5
                py-4
                mb-5
              "

            >

              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">

                With Google Account

              </p>

              <ul className="flex flex-col gap-2">

                {BENEFITS.map((benefit) => (

                  <li

                    key={benefit}

                    className="flex items-center gap-2 text-sm text-gray-700"

                  >

                    <span

                      className="
                        w-5
                        h-5
                        rounded-full
                        bg-gradient-to-br
                        from-[#7C5CFF]
                        to-[#5B3DF5]
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "

                    >

                      <Check size={11} className="text-white" strokeWidth={3} />

                    </span>

                    {benefit}

                  </li>

                ))}

              </ul>

            </div>

            {/* ── Not Now ── */}

            <div className="text-center">

              <button

                onClick={handleClose}

                className="
                  text-sm
                  text-gray-400
                  hover:text-gray-600
                  transition-colors
                  py-1
                  px-4
                "

              >

                Not Now

              </button>

            </div>

          </motion.div>

        </>

      )}

    </AnimatePresence>

  );

}

export default PlayModal;
