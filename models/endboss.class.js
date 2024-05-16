class Endboss extends MovableObject {
  width = 300;
  height = 400;
  x = 2500;
  y = 45;
  energy = 100;
  speed = 2;
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

  /**
   * Constructor for initializing the Endboss object.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
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

  /**
   * Animates the endboss based on various conditions such as energy levels, collisions, and proximity to the character.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  animate() {
    setInterval(() => {
      if (this.isCollidingWithCharacter == false) {
        if (this.energy < 1) {
          this.endbossDies();
        } else if (this.isHurt()) {
          this.endbossHurtAnimation();
        } else if (this.characterIsClose) {
          this.playAnimation(this.IMAGES_WALK);
        }
      }
    }, 1000 / 5);
    this.endbossAttacks();
    this.endbossMoves();
  }

  /**
   * Executes the endboss attack sequence at a predefined interval,
   * triggering animations and sounds when colliding with the character.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  endbossAttacks() {
    setInterval(() => {
      if (this.isCollidingWithCharacter == true) {
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.muteAudio == false) {
          this.hurt_sound.play();
        }
        setTimeout(() => {
          this.isCollidingWithCharacter = false;
        }, 200);
      }
    }, 1000 / 20);
  }

  /**
   * Moves the endboss based on the character's proximity.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  endbossMoves() {
    setInterval(() => {
      if (this.characterIsClose) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * A description of the entire function.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  endbossDies() {
    this.playAnimation(this.IMAGES_DEAD);
    if (this.muteAudio == false) {
      this.hurt_sound.play();
    }
  }

  /**
   * Executes the endboss hurt animation by playing the hurt images and sound if audio is not muted.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  endbossHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    if (this.muteAudio == false) {
      this.hurt_sound.play();
    }
  }
}
