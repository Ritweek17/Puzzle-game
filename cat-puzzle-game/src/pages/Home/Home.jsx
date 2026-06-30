/**
 * ----------------------------------------------------
 * File : Home.jsx
 *
 * Purpose :
 * Home screen — the entry point of the game.
 *
 * Layout (restored to Version 1 structure) :
 * - Logo
 * - Play
 * - How To Play
 * - Leaderboard (disabled, coming soon)
 * - Settings
 *
 * Version 2 addition :
 * Clicking Play now opens PlayModal instead of navigating
 * directly. The modal handles all authentication choices.
 * Home only manages the open/close boolean.
 *
 * NO auth logic lives here.
 * NO LoginButton or UserCard on this page.
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Play, BookOpen, Settings, Trophy, User } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/Button/Button";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";
import { usePlayAction } from "../../hooks/usePlayAction";

import logo from "../../assets/logo/logo.png";

function Home() {

  const navigate = useNavigate();
  const { handlePlayRequest, renderPlayModal } = usePlayAction();

  return (

    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] flex items-start justify-center pt-10 px-5">

      {/* Background */}

      <BackgroundDecoration />

      {/* Main Card */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.8 }}

        whileHover={{

          y: -4,

          transition: {

            duration: 0.3,

          },

        }}

        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-[32px]
          bg-white/65
          backdrop-blur-xl
          border
          border-white/60
          p-10
          text-center
          shadow-[0_35px_70px_rgba(124,92,255,0.18)]
          transition-all
          duration-500
        "

      >

        {/* Logo */}

        <div className="mb-8">

          <motion.img

            src={logo}

            alt="MeowMaze Logo"

            className="w-64 md:w-72 mx-auto select-none"

            initial={{

              opacity: 0,

              scale: 0.9,

            }}

            animate={{

              opacity: 1,

              scale: 1,

              y: [0, -8, 0],

            }}

            transition={{

              opacity: {

                duration: 0.8,

              },

              scale: {

                duration: 0.8,

              },

              y: {

                duration: 3,

                repeat: Infinity,

                repeatType: "reverse",

                ease: "easeInOut",

              },

            }}

          />

        </div>

        {/* Buttons */}

        <div className="space-y-5">

          {/* Play — opens PlayModal */}

          <Button

            text="Play"

            icon={<Play size={22} />}

            onClick={handlePlayRequest}

            className="bg-gradient-to-r from-[#7C5CFF] to-[#5B3DF5]"

          />

          <Button

            text="How To Play"

            icon={<BookOpen size={22} />}

            onClick={() => navigate("/how-to-play")}

            className="bg-gradient-to-r from-[#79E0D3] to-[#54D6C7]"

          />

          <Button

            text="Leaderboard"

            icon={<Trophy size={22} />}

            onClick={() => navigate("/leaderboard")}

            className="bg-gradient-to-r from-[#FFC857] to-[#FFB52E]"

          />

          <Button

            text="Player Hub"

            icon={<User size={22} />}

            onClick={() => navigate("/profile")}

            className="bg-gradient-to-r from-[#FF9F68] to-[#FF7A45]"

          />

        </div>

        {/* Footer */}

        <div className="mt-10 space-y-2">

          <p className="text-sm text-gray-500">

            Version 2.0 Alpha

          </p>

          <p className="text-xs text-gray-400">

            © 2026 MeowMaze. All rights reserved.

          </p>

        </div>

      </motion.div>

      {/* Play Modal — rendered via hook */}

      {renderPlayModal()}

    </div>

  );

}

export default Home;