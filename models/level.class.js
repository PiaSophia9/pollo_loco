class Level {
  bigChicken;
  smallChicken;
  endboss;
  clouds;
  backgroundobjects;
  level_end_x = 2200;

  /**
   * Constructor for initializing the Level object.
   *
   * @param {type} bigChicken - description of the bigChicken parameter
   * @param {type} smallChicken - description of the smallChicken parameter
   * @param {type} endboss - description of the endboss parameter
   * @param {type} clouds - description of the clouds parameter
   * @param {type} backgroundobjects - description of the backgroundobjects parameter
   * @return {type} No return value.
   */
  constructor(bigChicken, smallChicken, endboss, clouds, backgroundobjects) {
    this.bigChicken = bigChicken;
    this.smallChicken = smallChicken;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundobjects = backgroundobjects;
  }
}
