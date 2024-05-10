class Cloud extends MovableObject {
  y = 50;
  width = 720;
  height = 250;

  IMAGE = "./img/5_background/layers/4_clouds/1.png";

  constructor(x) {
    super();
    this.loadImage(this.IMAGE);
    x = x + Math.random() * 720;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
