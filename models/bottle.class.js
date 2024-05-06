class Bottle extends CollectableObject {
  IMAGE = "./img/6_salsa_bottle/salsa_bottle.png";
  x = 2100;
  y = 145;

  constructor() {
    super();
    this.loadImage(this.IMAGE);
  }
}
