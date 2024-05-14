class Coin extends CollectableObject {
  IMAGE = "./img/8_coin/coin_2.png";
  width = 70;
  height = 70;
  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };
  coin_sound = new Audio("./audio/coin.mp3");

  constructor(x, y) {
    super();
    this.y = y;
    this.x = x;
    this.loadImage(this.IMAGE);
    this.coin_sound.volume = 0.1;
  }
}
