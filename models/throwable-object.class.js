class ThrowableObject extends MovableObject {
  offset = {
    top: 3,
    bottom: 3,
    left: 13,
    right: 13,
  };
  muteAudio = false;
  throw_sound = new Audio("./audio/shoot.mp3");

  /**
   * Constructor for initializing the ThrowableObject with an image and position.
   *
   * @param {number} x - The x-coordinate of the ThrowableObject.
   * @param {number} y - The y-coordinate of the ThrowableObject.
   * @param {string} characterDirection - The direction of the character.
   * @return {void} No return value.
   */
  constructor(x, y, characterDirection) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw(this.x, this.y, characterDirection);
  }

  /**
   * Handles the throwing action of the throwable object.
   *
   * @param {number} x - The x-coordinate of the throwable object.
   * @param {number} y - The y-coordinate of the throwable object.
   * @param {string} characterDirection - The direction of the character.
   * @return {void} No return value.
   */
  throw(x, y, characterDirection) {
    if (muteAudio == false) {
      this.throw_sound.play();
    }
    x = x;
    y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    this.applyGravity();
    this.moveThrowableObject(characterDirection);
  }

  /**
   * Handles the movement of the throwable object based on the character's direction.
   *
   * @param {string} characterDirection - The direction of the character influencing the movement.
   * @return {void} No return value.
   */
  moveThrowableObject(characterDirection) {
    setInterval(() => {
      if (characterDirection == "right") {
        this.x += 10;
      }
      if (characterDirection == "left") {
        this.x -= 10;
      }
    }, 25);
  }
}
