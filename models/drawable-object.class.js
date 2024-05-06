class DrawableObject {
  x = 120;
  y = 383;
  width = 70;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image(); // " this.img = document.getElementById('image') <img id= 'image' src> " is the same.
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawBlueFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawRedFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss || this instanceof Bottle || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "1";
      ctx.strokeStyle = "red";
      // ctx.rect(this.x, this.y, this.width, this.height);
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }
}
