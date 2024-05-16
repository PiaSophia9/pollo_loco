let level1;

/**
 * Initializes the level by creating instances of different game elements such as chickens, endboss, clouds, and background objects.
 *
 */
function initLevel() {
  level1 = new Level(
    [new Chicken(0), new Chicken(0), new Chicken(0), new Chicken(720), new Chicken(720), new Chicken(720), new Chicken(1440)],
    [new ChickenSmall(0), new ChickenSmall(0), new ChickenSmall(720), new ChickenSmall(720), new ChickenSmall(1440)],
    [new Endboss()],
    [new Cloud(0), new Cloud(720), new Cloud(1440), new Cloud(2160), new Cloud(2880), new Cloud(3600)],
    [
      new BackgroundObject("./img/5_background/layers/air.png", -719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),

      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/air.png", 719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),

      new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719 * 3),
    ]
  );
  world = new World(canvas, keyboard);
}
