/**
 * ----------------------------------------------------
 * File : Settings.jsx
 *
 * Purpose :
 * Game Settings
 *
 * Status :
 * Final v2
 * ----------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

import {
  ArrowLeft,
  Volume2,
  Music,
  RotateCcw,
} from "lucide-react";

import { resetProgress } from "../../utils/progress";

import {
  getSettings,
  toggleSound,
  toggleMusic,
} from "../../utils/settings";

function Settings() {

  const navigate = useNavigate();

  const [settings, setSettings] =
    useState(getSettings());

  /**
   * -----------------------------
   * Toggle Sound
   * -----------------------------
   */

  function handleSound() {

    toggleSound();

    setSettings(getSettings());

  }

  /**
   * -----------------------------
   * Toggle Music
   * -----------------------------
   */

  function handleMusic() {

    toggleMusic();

    setSettings(getSettings());

  }

  /**
   * -----------------------------
   * Reset Progress
   * -----------------------------
   */

  function handleReset() {

    const confirmReset = window.confirm(

      "Are you sure you want to reset all progress?"

    );

    if (!confirmReset) return;

    resetProgress();

    navigate("/");

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <div className="max-w-xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <button

            onClick={() => navigate(-1)}

            className="p-3 rounded-xl bg-white shadow-lg hover:scale-105 transition"

          >

            <ArrowLeft />

          </button>

          <h1 className="text-3xl font-bold">

            ⚙️ Settings

          </h1>

          <div className="w-10" />

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-5">

          {/* Sound */}

          <button

            onClick={handleSound}

            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition"

          >

            <div className="flex items-center gap-3">

              <Volume2 />

              <span className="font-semibold">

                Sound Effects

              </span>

            </div>

            <span

              className={`font-bold ${
                settings.sound
                  ? "text-green-600"
                  : "text-red-600"
              }`}

            >

              {settings.sound ? "ON" : "OFF"}

            </span>

          </button>

          {/* Music */}

          <button

            onClick={handleMusic}

            className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition"

          >

            <div className="flex items-center gap-3">

              <Music />

              <span className="font-semibold">

                Background Music

              </span>

            </div>

            <span

              className={`font-bold ${
                settings.music
                  ? "text-green-600"
                  : "text-red-600"
              }`}

            >

              {settings.music ? "ON" : "OFF"}

            </span>

          </button>
<button

  onClick={() => navigate("/statistics")}

  className="w-full flex items-center justify-between p-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition"

>

  <div className="flex items-center gap-3">

    <BarChart3 />

    <span className="font-semibold">

      Statistics

    </span>

  </div>

</button>

          {/* Reset */}

          <button

            onClick={handleReset}

            className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"

          >

            <div className="flex items-center gap-3">

              <RotateCcw />

              <span className="font-semibold">

                Reset Progress

              </span>

            </div>

          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;