let canvas;
let world;
let keyboard = new Keyboard();
let background_music = new Audio("./audio/background_music.mp3");
let chicken_sound = new Audio("./audio/chicken_sound_2.mp3");
background_music.volume = 0.1;
chicken_sound.volume = 0.3;

function init() {
  canvas = document.getElementById("canvas");
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
  background_music.play();
  chicken_sound.play();
  document.getElementById("startStreen").classList.add("d_none");
  document.getElementById("canvas").classList.remove("d_none");
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
