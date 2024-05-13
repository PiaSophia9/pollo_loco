class Chicken extends MovableObject {
  width = 60;
  height = 60;
  energy = 1;
  y = 362;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  chicken_sound = new Audio("./audio/chicken_sound.mp3");

  IMAGES_WALKING = ["img/3_enemies_chicken/chicken_normal/1_walk/1_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png", "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png"];

  IMAGE_DYING = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    // this.y = 357 + Math.random() * 10;
    this.x = x + 200 + Math.random() * 500;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DYING);
    // this.loadImage(this.IMAGE_DYING);
    this.speed = 0.1 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
      // if (this.y + this.height - this.offset.bottom > mo.y + mo.offset.top) {
      //   this.showImage(this.IMAGE_DYING);
      // }
      // if (this.energy == 0) {
      //   this.playAnimation(this.IMAGE_DYING);
      //   setTimeout(() => {
      //     this.splice(this.indexOf(enemy), 1);
      //   }, 200);
      // }
    }, 1000 / 60);

    setInterval(() => {
      // this.chicken_sound.play();
      if (!this.energy == 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  // showImage(image) {}
}
