import { useState } from "react";
import { motion } from "framer-motion";

// Import all avatars
import orange from "../../assets/avatars/orange.png";
import white from "../../assets/avatars/white.png";
import black from "../../assets/avatars/black.png";
import robot from "../../assets/avatars/robot.png";
import ghost from "../../assets/avatars/ghost.png";
import king from "../../assets/avatars/king.png";
import ninja from "../../assets/avatars/ninja.png";
import cute from "../../assets/avatars/cute.png";

const AVATARS = [
  { id: "orange", src: orange, name: "Orange Cat" },
  { id: "white", src: white, name: "White Cat" },
  { id: "black", src: black, name: "Black Cat" },
  { id: "cute", src: cute, name: "Cute Kitten" },
  { id: "king", src: king, name: "King Cat" },
  { id: "ninja", src: ninja, name: "Ninja Cat" },
  { id: "robot", src: robot, name: "Robot Cat" },
  { id: "ghost", src: ghost, name: "Ghost Cat" },
];

function AvatarPicker({ selectedAvatar, onSelect, googlePhotoUrl }) {
  // If googlePhotoUrl is provided, it can be added as an option
  const options = [...AVATARS];
  if (googlePhotoUrl) {
    options.unshift({ id: "google", src: googlePhotoUrl, name: "Google Photo" });
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Choose Avatar
      </label>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {options.map((avatar) => (
          <motion.div
            key={avatar.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(avatar.id, avatar.src)}
            className={`
              cursor-pointer relative rounded-full overflow-hidden
              aspect-square flex items-center justify-center
              transition-all duration-200
              ${(selectedAvatar === avatar.id || selectedAvatar === avatar.src) 
                ? "ring-4 ring-[#7C5CFF] ring-offset-2 scale-105" 
                : "hover:ring-2 hover:ring-gray-300 ring-offset-1 opacity-90 hover:opacity-100"
              }
            `}
          >
            <img 
              src={avatar.src} 
              alt={avatar.name} 
              className="w-full h-full object-cover bg-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = orange;
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AvatarPicker;
