import { useNavigate } from "react-router-dom";
import { Play, BookOpen, Settings, Trophy } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../../components/Button/Button";
import BackgroundDecoration from "../../components/BackgroundDecoration/BackgroundDecoration";

import logo from "../../assets/logo/logo.png";

function Home() {
  const navigate = useNavigate();

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
          transition: { duration: 0.3 },
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
        <div className="mb-6">
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

          <Button
            text="Play"
            icon={<Play size={22} />}
            onClick={() => navigate("/levels")}
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
            disabled
            className="bg-gradient-to-r from-[#FFC857] to-[#FFB52E] opacity-70"
          />

          <Button
            text="Settings"
            icon={<Settings size={22} />}
            onClick={() => navigate("/settings")}
            className="bg-gradient-to-r from-[#FF9F68] to-[#FF7A45]"
          />

        </div>

        {/* Footer */}
        <div className="mt-10 space-y-2">

          <p className="text-sm text-gray-500">
            Version 0.1
          </p>

          <p className="text-xs text-gray-400">
            © 2026 MeowMaze. All rights reserved.
          </p>

        </div>

      </motion.div>

    </div>
  );
}

export default Home;