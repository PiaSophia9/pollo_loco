class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  lastHit = 0;
  startTimeBounceBack;

  /**
   * Applies gravity to the movable object by decrementing the y position based on speedY and acceleration.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} - Returns true if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 217;
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} mo - description of parameter
   * @return {type} description of return value
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * A description of the entire function.
   *
   * @param {number} energyloss - The amount of energy loss on hit.
   * @return {void} No return value.
   */
  hit(energyloss) {
    if (this.timeSinceLastHit() > 0.5) {
      this.lastHit = new Date().getTime();
      this.energy -= energyloss;
      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} Returns true if the object is hurt, false otherwise.
   */
  isHurt() {
    return this.timeSinceLastHit() < 1;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {number} - Returns the time passed since the last hit in seconds.
   */
  timeSinceLastHit() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} description of return value
   */
  wasApproached() {
    let timepassed = new Date().getTime() - this.lastApproach;
    timepassed = timepassed / 1000;
    return timepassed < 0.75;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} - Returns true if the time passed since the first moment of collision is less than 0.2 seconds.
   */
  characterWasCollidingEndboss() {
    let timepassed = new Date().getTime() - this.firstMomentOfCollision;
    timepassed = timepassed / 1000;
    return timepassed < 0.2;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} - Returns true if the time passed since the first moment of no action is less than 5 seconds.
   */
  checkTimeSinceNoAction() {
    let timepassed = new Date().getTime() - this.firstMomentOfNoAction;
    timepassed = timepassed / 1000;
    return timepassed < 5;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} description of return value
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * A description of the entire function.
   *
   * @param {array} images - An array of image paths to play the animation.
   * @return {void} No return value.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} image - description of parameter
   * @return {type} No return value
   */
  showImage(image) {
    this.img = this.imageCache[image];
  }

  /**
   * Moves the object to the right based on its speed.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Moves the object back when hit, making it bounce.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  bounceBack() {
    this.speedY = 10;
    this.startTimeBounceBack = new Date().getTime();
    let moveLeftDuringBounce = () => {
      if (new Date().getTime() - this.startTimeBounceBack < 600) {
        this.x -= 5;
        setTimeout(moveLeftDuringBounce, 15);
      }
    };
    moveLeftDuringBounce();
  }
}
