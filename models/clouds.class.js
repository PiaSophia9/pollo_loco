class Cloud extends MovableObject {
  y = 50;
  width = 720;
  height = 250;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 720;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
