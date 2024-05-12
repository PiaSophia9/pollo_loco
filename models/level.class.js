class Level {
  bigChicken;
  smallChicken;
  endboss;
  clouds;
  backgroundobjects;
  level_end_x = 2200;

  constructor(bigChicken, smallChicken, endboss, clouds, backgroundobjects) {
    this.bigChicken = bigChicken;
    this.smallChicken = smallChicken;
    this.endboss = endboss;
    this.clouds = clouds;
    this.backgroundobjects = backgroundobjects;
  }

  //runLevel() {
  //  setInterval(() => {
  //    this.showLooseScreen();
  //  }, 50);
  //}
  //
  // gameOverScreenShown = false;
  //
  // showLooseScreen() {
  //   if (this.world.character.energy <= 0 && !this.//gameOverScreenShown) {
  //     setTimeout(() => {
  //       console.log("show Game Over screen");
  //      this.gameOverScreenShown = true;
  //     }, 500);
  //  }
  // }
}
