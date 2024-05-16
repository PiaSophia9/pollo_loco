class DrawableObject {
  x = 50;
  y = 383;
  width = 70;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads an image using the provided path.
   *
   * @param {string} path - The path of the image to load.
   * @return {void} No return value.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads images into the imageCache based on the provided array of paths.
   *
   * @param {array} array - An array of paths to load images from.
   * @return {void} No return value.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws an image on the canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   * @return {void} No return value.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
