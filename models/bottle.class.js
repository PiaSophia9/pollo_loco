class Bottle extends CollectableObject {
  IMAGE = "./img/6_salsa_bottle/salsa_bottle.png";
  // x = 140;
  // y = 200;
  // x = 490;
  // y = 250;
  // x = 932;
  // y = 166;
  // x = 1256;
  // y = 235;
  // x = 1578;
  // y = 197;
  // x = 1928;
  // y = 250;
  offset = {
    top: 3,
    bottom: 3,
    left: 13,
    right: 13,
  };

  constructor(x, y) {
    super();
    this.y = y;
    this.x = x;
    this.loadImage(this.IMAGE);
  }
}
