/**
 * ----------------------------------------------------
 * File : settings.js
 *
 * Purpose :
 * Store Game Settings
 * ----------------------------------------------------
 */

const SETTINGS_KEY = "meowmaze_settings";

export function getSettings() {

  const data = localStorage.getItem(SETTINGS_KEY);

  if (!data) {

    return {

      sound: true,

      music: true,

    };

  }

  return JSON.parse(data);

}

export function saveSettings(settings) {

  localStorage.setItem(

    SETTINGS_KEY,

    JSON.stringify(settings)

  );

}

export function toggleSound() {

  const settings = getSettings();

  settings.sound = !settings.sound;

  saveSettings(settings);

}

export function toggleMusic() {

  const settings = getSettings();

  settings.music = !settings.music;

  saveSettings(settings);

}