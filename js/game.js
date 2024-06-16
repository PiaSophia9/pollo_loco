let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio("./audio/background_music.mp3");
let chicken_sound = new Audio("./audio/chicken_sound_2.mp3");
background_music.volume = 0.1;
chicken_sound.volume = 0.3;
let muteAudio = false;

/**
 * A description of the entire function.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function init() {
  canvas = document.getElementById("canvas");
  console.log("die Seite befindet sich im Fullscreen-Modus:", isFullscreen);
}

/**
 * Initializes touch events for controlling the game's keyboard input.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function initThouchEvents() {
  document.getElementById("leftBtn").addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("leftBtn").addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("rightBtn").addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("rightBtn").addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("jumpBtn").addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById("jumpBtn").addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("throwBtn").addEventListener("touchstart", () => {
    event.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("throwBtn").addEventListener("touchend", () => {
    event.preventDefault();
    keyboard.D = false;
  });
}

window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (event.keyCode == 38) {
    keyboard.UP = false;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
    event.preventDefault();
  }
  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (event.keyCode == 38) {
    keyboard.UP = true;
  }
  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
    event.preventDefault();
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Transition from the start screen to the play screen by initializing level, touch events, playing background music and chicken sound, and updating the display elements accordingly.
 *
 */
function startScreenToPlayScreen() {
  initLevel();
  initThouchEvents();
  background_music.play();
  chicken_sound.play();
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("canvas").classList.remove("d_none");
  document.getElementById("responsiveButtonContainer").classList.remove("d_none");
  document.getElementById("canvasButtonContainer").classList.remove("d_none");
  document.getElementById("canvasContainer").classList.remove("d_none");
}

/**
 * Transition from the loose screen to the start screen by hiding the loose screen, showing the start screen, and clearing all intervals.
 *
 */
function looseScreenToStartScreen() {
  document.getElementById("looseScreen").classList.add("d_none");
  document.getElementById("canvasContainer").classList.add("d_none");
  document.getElementById("startStreen").classList.remove("d_none");
  clearAllIntervals();
}

/**
 * Transition from the win screen to the start screen by hiding the win screen, showing the start screen, and clearing all intervals.
 *
 */
function winScreenToStartScreen() {
  document.getElementById("winScreen").classList.add("d_none");
  document.getElementById("canvasContainer").classList.add("d_none");
  document.getElementById("startStreen").classList.remove("d_none");
  clearAllIntervals();
}

/**
 * Function to show the user manual by hiding the start screen and displaying the user manual.
 */
function showUserManual() {
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("userManual").classList.remove("d_none");
}

/**
 * Transition from the user manual screen to the start screen by showing the start screen and hiding the user manual.
 *
 */
function userManualToStartScreen() {
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("userManual").classList.add("d_none");
}

/**
 * Hides the start screen and shows the imprint screen.
 *
 */
function showImprint() {
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("imprint").classList.remove("d_none");
}

/**
 * Function to transition from the imprint screen to the start screen by showing the start screen and hiding the imprint screen.
 *
 */
function imprintToStartScreen() {
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("imprint").classList.add("d_none");
}

/**
 * Transition back to the start screen by hiding the current screen and showing the start screen.
 *
 */
function backToStartScreen() {
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("canvas").classList.add("d_none");
}

/**
 * Toggles the user manual visibility based on the current state.
 *
 * @param {} - No parameters.
 * @return {} - No return value.
 */
function toggleUserManual() {
  let userManualContainer = document.getElementById("userManualContainer");
  if (userManualContainer.classList.contains("d_none")) {
    showUserManuelContainer();
  } else {
    hideUserManuelContainer();
  }
  event.stopPropagation();
}

/**
 * A description of the entire function.
 *
 */
function showUserManuelContainer() {
  document.getElementById("userManualContainer").classList.remove("d_none");
}

/**
 * A description of the entire function.
 *
 */
function hideUserManuelContainer() {
  document.getElementById("userManualContainer").classList.add("d_none");
}

/**
 * Clears all intervals by iterating through and clearing them.
 *
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Toggles the mute state based on the current value of muteAudio variable.
 *
 */
function toggleMute() {
  if (muteAudio == true) {
    unmute();
  } else {
    mute();
  }
}

/**
 * A description of the entire function.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function mute() {
  document.getElementById("pauseSound").classList.remove("d_none");
  document.getElementById("playSound").classList.add("d_none");
  pauseAllAudio();
}

/**
 * A description of the entire function.
 *
 */
function unmute() {
  document.getElementById("pauseSound").classList.add("d_none");
  document.getElementById("playSound").classList.remove("d_none");
  playAllAudio();
}

/**
 * A description of the entire function.
 *
 */
function pauseAllAudio() {
  muteAudio = true;
  background_music.pause();
  chicken_sound.pause();
  world.character.muteAudio = true;
  world.throwableObjects.muteAudio = true;
  world.level.endboss[0].muteAudio = true;
  world.muteAudio = true;
}

/**
 * A description of the entire function.
 *
 */
function playAllAudio() {
  muteAudio = false;
  background_music.play();
  chicken_sound.play();
  world.character.mute = false;
  world.throwableObjects.mute = false;
  world.level.endboss[0].mute = false;
  world.mute = false;
}

/**
 * A description of the entire function.
 *
//  */
// function fullscreen() {
//   let fullscreenContainer = document.getElementById("fullScreenContainer");
//   openFullscreen(fullscreenContainer);
//   let fullStartScreen = document.getElementById("start_screen");
//   document.getElementById("startStreen").classList.add("full_screen");
//   openFullscreen(fullStartScreen);
//   let fullLooseScreen = document.getElementById("looseScreen");
//   openFullscreen(fullLooseScreen);
//   let fullWinScreen = document.getElementById("winScreen");
//   openFullscreen(fullWinScreen);
//   let fullUserManuelScreen = document.getElementById("userManual");
//   openFullscreen(fullUserManuelScreen);
//   let fullUserImprintScreen = document.getElementById("imprint");
//   openFullscreen(fullUserImprintScreen);
// }

// /**
//  * A description of the entire function.
//  *
//  * @param {type} elem - description of parameter
//  * @return {type} description of return value
//  */
// function openFullscreen(elem) {
//   if (elem.requestFullscreen) {
//     elem.requestFullscreen();
//   } else if (elem.webkitRequestFullscreen) {
//     elem.webkitRequestFullscreen();
//   } else if (elem.msRequestFullscreen) {
//     elem.msRequestFullscreen();
//   }
// }

// /**
//  * A description of the entire function.
//  *
//  */
// function closeFullscreen() {
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   } else if (document.msExitFullscreen) {
//     document.msExitFullscreen();
//   }
// }

// Da soben spricht die ganze Seite an
// let canvasContainer = document.getElementById("canvasContainer");
// let startStreenContainer = document.getElementById("startStreen");
// let looseScreenContainer = document.getElementById("looseScreen");
// let winScreenContainer = document.getElementById("winScreen");
// let userManualContainer = document.getElementById("userManual");
// let imprintContainer = document.getElementById("imprint");
let isFullscreen = false;

function fullscreen() {
  let elem = document.getElementById("fullScreenContainer");
  toggleFullscreen(elem);
  console.log("die Seite befindet sich im Fullscreen-Modus:", isFullscreen);
}

function toggleFullscreen(elem) {
  if (isFullscreen) {
    isFullscreen = false;
    closeFullscreen();
    resetCanvasSize();
  } else {
    isFullscreen = true;
    openFullscreen(elem);
    setCanvasToFullscreen();
  }
  // isFullscreen = !isFullscreen;
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * A description of the entire function.
 *
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function setCanvasToFullscreen() {
  const canvas = document.getElementById("canvas");
  document.getElementById("canvas").classList.add("fullWidth");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function resetCanvasSize() {
  const canvas = document.getElementById("canvas");
  canvas.width = 720; // Originale Breite
  canvas.height = 480; // Originale Höhe
}
