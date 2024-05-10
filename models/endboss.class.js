class Endboss extends MovableObject {
  width = 300;
  height = 300;
  x = 2100;
  y = 145;
  energy = 100;
  speed = 2;
  lastHit;
  isCollidingWithCharacter = false;
  characterIsClose = false;
  lastApproach;
  offset = {
    top: 90,
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

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALK);
    this.animate();
  }

  animate() {
    setInterval(() => {
      // console.log("chacater is close in class: ", this.characterIsClose);
      if (this.isCollidingWithCharacter == false) {
        if (this.energy < 1) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.wasApproached()) {
          this.playAnimation(this.IMAGES_WALK);
        } else {
          this.playAnimation(this.IMAGES_ALERT);
        }
      }
    }, 300);
    setInterval(() => {
      // if (this.characterIsClose)) {
      if (this.wasApproached()) {
        if (this.otherDirection == false) {
          this.moveLeft();
        } else {
          this.moveRight();
        }
      }
    }, 1000 / 60);
  }
}
