/**
 * ----------------------------------------------------
 * File : stats.js
 *
 * Purpose :
 * Player Statistics
 * ----------------------------------------------------
 */

const STATS_KEY = "meowmaze_stats";

export function getStats() {

  const data = localStorage.getItem(STATS_KEY);

  if (!data) {

    return {

      gamesPlayed: 0,

      levelsCompleted: 0,

      totalStars: 0,

      wrongClicks: 0,

      hintsUsed: 0,

      undosUsed: 0,

      playTime: 0,

    };

  }

  return JSON.parse(data);

}

export function saveStats(stats) {

  localStorage.setItem(

    STATS_KEY,

    JSON.stringify(stats)

  );

}

export function updateStats(values) {

  const stats = getStats();

  Object.keys(values).forEach((key) => {

    stats[key] += values[key];

  });

  saveStats(stats);

}

export function resetStats() {

  localStorage.removeItem(STATS_KEY);

}