class StatusBar extends DrawableObject {
  percentage = 100;
  otherDirection = false;
  width = 160;
  height = 50;
  x = 10;

  /**
   * Sets the percentage value of the status bar, updates the image path based on the percentage, and caches the image.
   *
   * @param {number} percentage - The new percentage value for the status bar.
   * @return {undefined} No return value.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
