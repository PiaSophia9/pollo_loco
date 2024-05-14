let level1;

function initLevel() {
  level1 = new Level(
    [
      new Chicken(0),
      new Chicken(0),
      new Chicken(0),
      new Chicken(720),
      new Chicken(720),
      new Chicken(720),
      new Chicken(1440),
      // new Chicken(1440),
      // new Chicken(1440),
      // new Chicken(2160),
      // new Chicken(2160),
      // new Chicken(2160),
      // new Chicken(2880),
      // new Chicken(2880),
      // new Chicken(2880),
      // new Chicken(),
      // new Chicken(),
    ],
    [
      new ChickenSmall(0),
      new ChickenSmall(0),
      new ChickenSmall(720),
      new ChickenSmall(720),
      new ChickenSmall(1440),
      // new ChickenSmall(1440),
      // new ChickenSmall(2160),
      // new ChickenSmall(2160),
      // new ChickenSmall(2880),
      // new ChickenSmall(2880),
      // new ChickenSmall(3600),
      // new ChickenSmall(3600),
    ],
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
  world = new World(canvas, keyboard); // todo: in die initLevel-function
}
