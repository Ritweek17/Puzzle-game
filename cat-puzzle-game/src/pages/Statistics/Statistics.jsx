/**
 * ----------------------------------------------------
 * File : Statistics.jsx
 *
 * Purpose :
 * Player Statistics Screen
 *
 * Status :
 * Final v1
 * ----------------------------------------------------
 */

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Trophy,
  Star,
  Bomb,
  Lightbulb,
  RotateCcw,
  Gamepad2,
} from "lucide-react";

import { getStats } from "../../utils/stats";

function Statistics() {

  const navigate = useNavigate();

  const stats = getStats();

  const cards = [

    {
      icon: <Gamepad2 size={28} />,
      title: "Games Played",
      value: stats.gamesPlayed,
      color: "bg-blue-500",
    },

    {
      icon: <Trophy size={28} />,
      title: "Levels Completed",
      value: stats.levelsCompleted,
      color: "bg-green-500",
    },

    {
      icon: <Star size={28} />,
      title: "Total Stars",
      value: stats.totalStars,
      color: "bg-yellow-500",
    },

    {
      icon: <Bomb size={28} />,
      title: "Wrong Clicks",
      value: stats.wrongClicks,
      color: "bg-red-500",
    },

    {
      icon: <Lightbulb size={28} />,
      title: "Hints Used",
      value: stats.hintsUsed,
      color: "bg-purple-500",
    },

    {
      icon: <RotateCcw size={28} />,
      title: "Undos Used",
      value: stats.undosUsed,
      color: "bg-pink-500",
    },

  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#FFF8EE] via-[#F8F5FF] to-[#EAFDFC] p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-4 mb-8">

          <button

            onClick={() => navigate(-1)}

            className="p-3 rounded-xl bg-white shadow-lg"

          >

            <ArrowLeft />

          </button>

          <h1 className="text-4xl font-bold">

            📊 Statistics

          </h1>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map((card) => (

            <div

              key={card.title}

              className="bg-white rounded-3xl shadow-xl p-6"

            >

              <div

                className={`w-14 h-14 rounded-2xl ${card.color} text-white flex items-center justify-center mb-5`}

              >

                {card.icon}

              </div>

              <h2 className="text-gray-500">

                {card.title}

              </h2>

              <p className="text-4xl font-bold mt-2">

                {card.value}

              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Statistics;