let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio("./audio/background_music.mp3");
let chicken_sound = new Audio("./audio/chicken_sound_2.mp3");
background_music.volume = 0.1;
chicken_sound.volume = 0.3;
let muteAudio = false;

function init() {
  canvas = document.getElementById("canvas");
}

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
  }
  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

function startScreenToPlayScreen() {
  initLevel();
  //if (this.mute == false) {
  background_music.play();
  chicken_sound.play();
  //}
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("canvas").classList.remove("d_none");
  document.getElementById("responsiveButtonContainer").classList.remove("d_none");
  document.getElementById("canvasButtonContainer").classList.remove("d_none");
  initThouchEvents();
}

function looseScreenToStartScreen() {
  document.getElementById("looseScreen").classList.add("d_none");
  document.getElementById("startStreen").classList.remove("d_none");
  clearAllIntervals();
}

function winScreenToStartScreen() {
  document.getElementById("winScreen").classList.add("d_none");
  document.getElementById("startStreen").classList.remove("d_none");
  clearAllIntervals();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showUserManual() {
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("userManual").classList.remove("d_none");
}

function userManualToStartScreen() {
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("userManual").classList.add("d_none");
}

function showImprint() {
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("imprint").classList.remove("d_none");
}

function imprintToStartScreen() {
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("imprint").classList.add("d_none");
}

function backToStartScreen() {
  // stop the game
  document.getElementById("startStreen").classList.remove("d_none");
  document.getElementById("canvas").classList.add("d_none");
}

function showUserManuelContainer() {
  document.getElementById("userManualContainer").classList.remove("d_none");
  event.stopPropagation();
}

// function hideUserManuelContainer() {
//   if (!document.getElementById("userManualContainer").hasAttribute("d_none")) {
//     document.getElementById("userManualContainer").classList.add("d_none");
//   }
// }

function hideUserManuelContainer() {
  let userManualContainer = document.getElementById("userManualContainer");
  if (!userManualContainer.classList.contains("d_none")) {
    userManualContainer.classList.add("d_none");
  }
}

function toggleMute() {
  if (muteAudio == true) {
    unmute();
  } else {
    mute();
  }
}

function mute() {
  document.getElementById("pauseSound").classList.remove("d_none");
  document.getElementById("playSound").classList.add("d_none");
  pauseAllAudio();
}

function unmute() {
  document.getElementById("pauseSound").classList.add("d_none");
  document.getElementById("playSound").classList.remove("d_none");
  playAllAudio();
}

function pauseAllAudio() {
  muteAudio = true;
  background_music.pause();
  chicken_sound.pause();
  world.character.muteAudio = true;
  world.throwableObjects.muteAudio = true;
  world.level.endboss[0].muteAudio = true;
  world.muteAudio = true;
}

function playAllAudio() {
  muteAudio = false;
  background_music.play();
  chicken_sound.play();
  world.character.mute = false;
  world.throwableObjects.mute = false;
  world.level.endboss[0].mute = false;
  world.mute = false;
}

// Audio.muted()

// audioMuted = false;

function fullscreen() {
  let fullscreenContainer = document.getElementById("fullScreenContainer");
  openFullscreen(fullscreenContainer);
  let fullStartScreen = document.getElementById("start_screen");
  document.getElementById("startStreen").classList.add("full_screen");
  openFullscreen(fullStartScreen);
  let fullLooseScreen = document.getElementById("looseScreen");
  openFullscreen(fullLooseScreen);
  let fullWinScreen = document.getElementById("winScreen");
  openFullscreen(fullWinScreen);
  let fullUserManuelScreen = document.getElementById("userManual");
  openFullscreen(fullUserManuelScreen);
  let fullUserImprintScreen = document.getElementById("imprint");
  openFullscreen(fullUserImprintScreen);
}

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
