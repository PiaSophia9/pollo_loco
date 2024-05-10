class ThrowableObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw(this.x, this.y);
  }

  throw(x, y) {
    x = x;
    y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    // this.speedX = 20;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
