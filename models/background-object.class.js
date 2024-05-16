class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Constructor for initializing the BackgroundObject.
   *
   * @param {string} imagePath - The path of the image to load.
   * @param {number} x - The x-coordinate of the BackgroundObject.
   * @return {void} No return value.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
