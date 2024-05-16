class Cloud extends MovableObject {
  y = 50;
  width = 720;
  height = 250;

  IMAGE = "./img/5_background/layers/4_clouds/1.png";

  /**
   * Constructor for initializing the Cloud object.
   *
   * @param {number} x - The x-coordinate of the Cloud object.
   * @return {void} No return value.
   */
  constructor(x) {
    super();
    this.loadImage(this.IMAGE);
    this.x = x + Math.random() * 720;
    this.animate();
  }

  /**
   * Animates the cloud's movements by repeatedly calling the moveLeft method using setInterval.
   *
   * @returns {void} No return value.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
