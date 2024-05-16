class StatusBarBottle extends StatusBar {
  IMAGES = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Constructor for initializing the StatusBarBottle object.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 85;
    this.setPercentage(0);
  }
}
