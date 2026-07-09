/**
 * ----------------------------------------------------
 * File : UserCard.jsx
 *
 * Purpose :
 * Displays the currently logged-in user (Google or Guest).
 * Provides a Logout button.
 *
 * Handles two user shapes :
 *   Firebase user  — has photoURL, displayName, email
 *   Guest user     — has displayName: "Guest", isGuest: true
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { resolveIdentity, DEFAULT_AVATAR_URL } from "../../utils/identity";

function UserCard() {

  const { user, playerProfile, logout } = useAuth();

  if (!user) return null;

  async function handleLogout() {

    try {

      await logout();

    } catch (error) {

      console.error("Logout failed:", error);

    }

  }

  const { displayName, avatarUrl } = resolveIdentity(playerProfile, user);

  return (

    <div
      className="
        flex
        items-center
        gap-3
        bg-white/80
        backdrop-blur-lg
        rounded-2xl
        shadow-lg
        px-4
        py-3
      "
    >

      {/* Avatar */}

      <img

        src={avatarUrl}

        alt={displayName}

        className="w-12 h-12 rounded-full object-cover flex-shrink-0 bg-white shadow-sm ring-2 ring-purple-100"

        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_AVATAR_URL;
        }}

      />

      {/* User Info */}

      <div className="flex-1 text-left min-w-0">

        <p className="text-sm font-bold text-gray-800 truncate">

          {displayName}

        </p>

        <p className="text-sm text-gray-500 truncate">

          {user.isGuest ? "Playing as Guest" : user.email}

        </p>

      </div>

      {/* Logout Button */}

      <button

        onClick={handleLogout}

        title="Logout"

        className="
          flex-shrink-0
          p-2
          rounded-xl
          text-gray-400
          hover:text-red-400
          hover:bg-red-50
          transition-all
        "

      >

        <LogOut size={18} />

      </button>

    </div>

  );

}

export default UserCard;