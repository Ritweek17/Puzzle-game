/**
 * ----------------------------------------------------
 * File : LoginButton.jsx
 *
 * Purpose :
 * Authentication entry point shown on Home when no user is logged in.
 * Provides two options:
 *   1. Continue with Google  (Firebase OAuth)
 *   2. Continue as Guest     (local only, no Firebase)
 *
 * Uses :
 * useAuth() from AuthContext — calls login() and loginAsGuest()
 *
 * Status :
 * Version 2.0
 * ----------------------------------------------------
 */

import { LogIn, UserRound } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function LoginButton() {

  const { login, loginAsGuest } = useAuth();

  async function handleGoogleLogin() {

    try {

      await login();

    } catch (error) {

      console.error(error);

      alert("Google Login Failed. Please try again.");

    }

  }

  function handleGuestLogin() {

    loginAsGuest();

  }

  return (

    <div className="flex flex-col gap-3 w-full">

      {/* Google Login */}

      <button

        onClick={handleGoogleLogin}

        className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          rounded-2xl
          py-4
          font-semibold
          bg-white
          border
          border-gray-200
          shadow-lg
          hover:shadow-xl
          hover:scale-[1.02]
          transition-all
        "

      >

        <LogIn size={20} />

        Continue with Google

      </button>

      {/* Guest Login */}

      <button

        onClick={handleGuestLogin}

        className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          rounded-2xl
          py-3
          font-medium
          text-gray-500
          bg-gray-100
          border
          border-gray-200
          hover:bg-gray-200
          hover:scale-[1.02]
          transition-all
        "

      >

        <UserRound size={18} />

        Continue as Guest

      </button>

    </div>

  );

}

export default LoginButton;