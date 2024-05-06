class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable object should always fall and never stop falling like in the else-statement
      return true;
    } else {
      return this.y < 217;
    }
  }

  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    // return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.offsetY + this.height >= obj.y && this.y + this.offsetY <= obj.y + obj.height && obj.onCollisionCourse;
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }

  hit(energyloss) {
    this.energy -= energyloss;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // sec
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    // % steht für den Rest
    // 6/6 = 1 Rest 0 - Angezeigt wird nur der Rest, also die 0.
    // 6/7 = 1 Rest 1 - Angezeigt wird nur der Rest, also die 1 und amit ist alles gut und wie es sein soll! Nach der 6 kommt die 0 und alles geht von vorne los.
    // i = 0 1 2 3 4 5 6 0 1 2 3
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }
  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
