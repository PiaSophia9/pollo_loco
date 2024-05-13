class StatusBar extends DrawableObject {
  percentage = 100;
  otherDirection = false;
  width = 160;
  height = 50;
  x = 10;

  setPercentage(percentage) {
    this.percentage = percentage; // Zahl zwischne 0 und 5
    let path = this.IMAGES[this.resolveImageIndex()];
    // In die eckigen Klammern wird eine Zahl von 0 - 5 eingesetzt, die in resolveImageIndex erstelt wird.
    this.img = this.imageCache[path];
  }

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
