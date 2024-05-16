class Endboss extends MovableObject {
  width = 300;
  height = 400;
  x = 2500;
  y = 45;
  energy = 100;
  speed = 2;
  //lastHit;
  isCollidingWithCharacter = false;
  characterIsClose = false;
  lastApproach;
  firstMomentOfCollision;
  muteAudio = false;
  offset = {
    top: 0,
    bottom: 30,
    left: 10,
    right: 30,
  };
  chicken_sound = new Audio("./audio/chicken_sound.mp3");
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = ["img/4_enemie_boss_chicken/5_dead/G24.png", "img/4_enemie_boss_chicken/5_dead/G25.png", "img/4_enemie_boss_chicken/5_dead/G26.png"];

  IMAGES_HURT = ["img/4_enemie_boss_chicken/4_hurt/G21.png", "img/4_enemie_boss_chicken/4_hurt/G22.png", "img/4_enemie_boss_chicken/4_hurt/G23.png"];

  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_WALK = ["./img/4_enemie_boss_chicken/1_walk/G1.png", "./img/4_enemie_boss_chicken/1_walk/G2.png", "./img/4_enemie_boss_chicken/1_walk/G3.png", "./img/4_enemie_boss_chicken/1_walk/G4.png"];

  hurt_sound = new Audio("./audio/endboss.mp3");

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALK);
    this.animate();
    this.hurt_sound.volume = 0.5;
  }

  animate() {
    setInterval(() => {
      if (this.isCollidingWithCharacter == false) {
        if (this.energy < 1) {
          this.playAnimation(this.IMAGES_DEAD);
          if (this.muteAudio == false) {
            this.hurt_sound.play();
          }
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
          if (this.muteAudio == false) {
            this.hurt_sound.play();
          }
          // } else if (this.wasApproached()) {
        } else if (this.characterIsClose) {
          this.playAnimation(this.IMAGES_WALK);
        }
      }
      // else if (this.isCollidingWithCharacter == true) {

      // }
    }, 200);
    setInterval(() => {
      if (this.isCollidingWithCharacter == true) {
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.muteAudio == false) {
          this.hurt_sound.play();
        }
        setTimeout(() => {
          this.isCollidingWithCharacter = false; // Nach einer Verzögerung von 500ms auf false setzen
        }, 200);
      }
    }, 50);
    setInterval(() => {
      // if (this.characterIsClose)) {
      if (this.characterIsClose) {
        // if (this.wasApproached()) {
        // if (this.otherDirection == false) {
        this.moveLeft();
        // } else {
        //   this.moveRight();
        // }
      }
    }, 1000 / 60);
    // setInterval(() => {
    //   //if (this.isCollidingWithCharacter == true && this.energy > 0) {
    //   //  this.playAnimation(this.IMAGES_ATTACK);
    //   //}
    // }, 300);
  }
}
