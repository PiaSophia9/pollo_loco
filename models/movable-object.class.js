class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  lastHit = 0;
  // offset = {};

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
    // return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
    // return this.x + this.width >= obj.x && this.x <= obj.x + obj.width && this.y + this.offsetY + this.height >= obj.y && this.y + this.offsetY <= obj.y + obj.height && obj.onCollisionCourse;
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  characterKills(mo) {
    return this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  // isCollidingBottomTop(mo) {
  //   return this.y + this.height - this.offset.bottom > mo.y - mo.offset.top && this.x + this.offset.left > mo.x + mo.offset.left && this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
  // }

  hit(energyloss) {
    if (this.timeSinceLastHit() > 0.5) {
      this.lastHit = new Date().getTime();
      this.energy -= energyloss;
      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  timeSinceLastHit() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // sec
    return timepassed;
  }

  isHurt() {
    return this.timeSinceLastHit() < 1;
  }

  wasApproached() {
    let timepassed = new Date().getTime() - this.lastApproach; // difference in ms
    timepassed = timepassed / 1000; // sec
    return timepassed < 0.75;
  }

  characterWasCollidingEndboss() {
    let timepassed = new Date().getTime() - this.firstMomentOfCollision; // difference in ms
    timepassed = timepassed / 1000; // sec
    return timepassed < 0.2;
  }

  checkTimeSinceNoAction() {
    let timepassed = new Date().getTime() - this.firstMomentOfNoAction; // difference in ms
    timepassed = timepassed / 1000; // sec
    return timepassed < 5;
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

  showImage(image) {
    this.img = this.imageCache[image];
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

  // jumpLeft() {
  //   this.speedY = 30;
  //   this.x -= this.speed;
  // }

  //jumpLeft() {
  //   this.speedY = 30;
  //  // this.speedX = 20;
  //  this.applyGravity();
  //  setInterval(() => {
  //    this.x -= 10;
  //  }, 60);
  //}

  jumpLeft() {
    this.speedY = 10;
    let startTime = new Date().getTime(); // Zeitpunkt des Funktionsaufrufs
    let duration = 600; // Zeit in Millisekunden, für die die Bewegung ausgeführt werden soll

    // Funktion für die Bewegung nach links
    let moveLeft = () => {
      if (new Date().getTime() - startTime < duration) {
        this.x -= 5;
        setTimeout(moveLeft, 15); // Wiederholte Ausführung der Funktion
      }
    };

    // Starte die Bewegung nach links
    moveLeft();
  }
}
