class Chicken extends MovableObject {
  width = 60;
  height = 60;
  chicken_sound = new Audio("./audio/chicken_sound.mp3");
  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.y = 357 + Math.random() * 10;
    this.x = 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.1 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      // this.chicken_sound.play();
      this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }
}