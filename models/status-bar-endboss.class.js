class StatusBarEndboss extends StatusBar {
  percentage = 100;
  x = 545;

  IMAGES = [
    "./img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Constructor for initializing the StatusBarEndboss object.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 6;
    this.setPercentage(100);
  }
}
