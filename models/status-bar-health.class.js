class StatusBarHealth extends StatusBar {
  percentage = 100;

  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Constructor for initializing the StatusBarHealth object.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 0;
    this.setPercentage(100);
  }
}
