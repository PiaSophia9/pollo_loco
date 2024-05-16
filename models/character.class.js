class Character extends MovableObject {
  y = 0;
  x = 0;
  width = 100;
  height = 200;
  speed = 10;
  longIdleTimeout;
  firstMomentOfNoAction;
  isCollidingWithEndboss = false;
  firstMomentOfCollision;
  muteAudio = false;
  bottles = 0;
  coins = 0;
  energy = 100;
  offset = {
    top: 90,
    bottom: 10,
    left: 20,
    right: 30,
  };
  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  IMAGES_LONG_IDLE = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];
  IMAGES_DYING = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = ["./img/2_character_pepe/4_hurt/H-41.png", "./img/2_character_pepe/4_hurt/H-42.png", "./img/2_character_pepe/4_hurt/H-43.png"];
  walking_sound = new Audio("./audio/walk.mp3");
  jump_sound = new Audio("./audio/jump.mp3");
  hurt_sound = new Audio("./audio/hurt.mp3");
  sleep_sound = new Audio("./audio/sleep.mp3");

  /**
   * Constructor for the Character class.
   *
   * @param {}
   * @return {}
   */
  constructor() {
    super().loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DYING);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.firstMomentOfNoAction = new Date().getTime();
    this.walking_sound.volume = 1;
    this.jump_sound.volume = 1;
    this.hurt_sound.volume = 1;
    this.sleep_sound.volume = 1;
  }

  /**
   * A function that triggers character movements and character animation.
   *
   */
  animate() {
    this.characterMovements();
    this.characterAnimation();
  }

  /**
   * Triggers character movements based on keyboard input and updates the camera position.
   *
   */
  characterMovements() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.characterMovesRight("right");
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.characterMovesLeft();
      }
      if ((this.world.keyboard.SPACE || this.world.keyboard.UP) && !this.isAboveGround()) {
        this.characterJumps();
      }
      this.world.camera_x = -this.x + 60;
    }, 1000 / 60);
  }

  /**
   * Moves the character to the right, sets otherDirection to false, and plays walking sound if audio is not muted.
   */
  characterMovesRight() {
    this.moveRight();
    this.otherDirection = false;
    if (muteAudio == false) {
      this.walking_sound.play();
    }
  }

  /**
   * Moves the character to the left, sets otherDirection to true, and plays walking sound if audio is not muted.
   *
   */
  characterMovesLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (muteAudio == false) {
      this.walking_sound.play();
    }
  }

  /**
   * Jumps the character and plays the jump sound if audio is not muted.
   *
   */
  characterJumps() {
    this.jump();
    if (muteAudio == false) {
      this.jump_sound.play();
    }
  }

  /**
   * Sets up an interval for character animations, including idle, combat, and movement.
   *
   */
  characterAnimation() {
    setInterval(() => {
      this.characterIdleAnimation();
      this.characterCombatAnimation();
      this.characterMoveAnimation();
    }, 1000 / 10);
  }

  /**
   * Animates the character based on the time since the last action.
   *
   * @return {void} - No return value
   */
  characterIdleAnimation() {
    if (this.checkTimeSinceNoAction()) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      if (muteAudio == false) {
        this.sleep_sound.play();
      }
    }
  }

  /**
   * Handles the character combat animations based on energy levels and collisions.
   *
   * @return {void} - No return value
   */
  characterCombatAnimation() {
    if (this.energy <= 0) {
      this.playAnimation(this.IMAGES_DYING);
    } else if (this.isHurt() && this.energy > 0) {
      if (muteAudio == false) {
        this.hurt_sound.play();
      }
      this.playAnimation(this.IMAGES_HURT);
      this.firstMomentOfNoAction = new Date().getTime();
    }
    if (this.isCollidingWithEndboss && this.characterWasCollidingEndboss()) {
      this.bounceBack();
    }
  }

  /**
   * Handles the character movement animations based on the character's position and keyboard input.
   *
   */
  characterMoveAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      this.firstMomentOfNoAction = new Date().getTime();
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.firstMomentOfNoAction = new Date().getTime();
    }
  }
}
