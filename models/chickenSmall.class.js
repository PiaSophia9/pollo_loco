class ChickenSmall extends MovableObject {
  width = 40;
  height = 40;
  energy = 1;
  y = 380;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  IMAGES_WALKING = ["./img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];
  IMAGE_DYING = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  dying_audio = new Audio("./audio/jump_on_chicken.mp3");

  /**
   * Constructor for initializing the ChickenSmall object.
   *
   * @param {number} x - The x-coordinate of the ChickenSmall object.
   * @return {void} No return value.
   */
  constructor(x) {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = x + 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DYING);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
    this.dying_audio.volume = 0.3;
  }

  /**
   * Animates the chickens's movements and actions.
   * Uses setInterval to repeatedly call moveLeft and playAnimation methods.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (!this.energy == 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
