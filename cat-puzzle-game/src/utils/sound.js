/**
 * ----------------------------------------------------
 * File : sound.js
 *
 * Purpose :
 * Play Sound Effects
 *
 * Status :
 * Final v2
 * ----------------------------------------------------
 */

import clickSound from "../assets/sounds/Click.mp3";
import correctSound from "../assets/sounds/Correct.mp3";
import wrongSound from "../assets/sounds/Wrong.mp3";
import hintSound from "../assets/sounds/Hint.mp3";
import undoSound from "../assets/sounds/Undo.mp3";
import levelCompleteSound from "../assets/sounds/LevelComplete.mp3";
import gameOverSound from "../assets/sounds/GameOver.mp3";
import levelUnlockSound from "../assets/sounds/LevelUnlock.mp3";
import threeStarSound from "../assets/sounds/threestar.mp3";

import { getSettings } from "./settings";

/**
 * -----------------------------------
 * All Sounds
 * -----------------------------------
 */

const sounds = {

  click: new Audio(clickSound),

  correct: new Audio(correctSound),

  wrong: new Audio(wrongSound),

  hint: new Audio(hintSound),

  undo: new Audio(undoSound),

  levelComplete: new Audio(levelCompleteSound),

  gameOver: new Audio(gameOverSound),

  levelUnlock: new Audio(levelUnlockSound),

  threeStar: new Audio(threeStarSound),

};

/**
 * -----------------------------------
 * Preload
 * -----------------------------------
 */

Object.values(sounds).forEach((sound) => {

  sound.preload = "auto";

  sound.volume = 1;

});

/**
 * -----------------------------------
 * Play Sound
 * -----------------------------------
 */

export function playSound(name) {

  const settings = getSettings();

  // Sound Disabled
  if (!settings.sound) return;

  const sound = sounds[name];

  if (!sound) return;

  sound.pause();

  sound.currentTime = 0;

  sound.play().catch(() => {});

}

/**
 * -----------------------------------
 * Stop All Sounds
 * -----------------------------------
 */

export function stopAllSounds() {

  Object.values(sounds).forEach((sound) => {

    sound.pause();

    sound.currentTime = 0;

  });

}