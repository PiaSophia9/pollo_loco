class Bottle extends CollectableObject {
  IMAGE = "./img/6_salsa_bottle/salsa_bottle.png";
  offset = {
    top: 3,
    bottom: 3,
    left: 13,
    right: 13,
  };
  bottle_sound = new Audio("./audio/bottle.mp3");

  /**
   * Constructor for initializing the Bottle object.
   *
   * @param {number} x - The x-coordinate of the Bottle object.
   * @param {number} y - The y-coordinate of the Bottle object.
   * @return {void} No return value.
   */
  constructor(x, y) {
    super();
    this.y = y;
    this.x = x;
    this.loadImage(this.IMAGE);
    this.bottle_sound.volume = 0.1;
  }
}
