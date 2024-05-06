class ChickenSmall extends MovableObject {
  width = 40;
  height = 40;
  small_chicken_sound = new Audio("./audio/small_chicken_sound.mp3");
  IMAGES_WALKING = ["./img/3_enemies_chicken/chicken_small/1_walk/1_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png", "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"];

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 200 + Math.random() * 500;
    this.y = 375 + Math.random() * 10;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      // this.small_chicken_sound.play();
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }
}
