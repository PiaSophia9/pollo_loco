class ThrowableObject extends MovableObject {
  offset = {
    top: 3,
    bottom: 3,
    left: 13,
    right: 13,
  };
  muteAudio = false;
  throw_sound = new Audio("./audio/shoot.mp3");

  constructor(x, y, characterDirection) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.x = x; // TodDo: Not needed
    this.y = y;
    this.throw(this.x, this.y, characterDirection);
  }

  throw(x, y, characterDirection) {
    if (muteAudio == false) {
      this.throw_sound.play();
    }
    x = x;
    y = y;
    this.height = 60;
    this.width = 50;
    this.speedY = 30;
    // this.speedX = 20;
    this.applyGravity();
    setInterval(() => {
      if (characterDirection == "right") {
        this.x += 10;
      }
      if (characterDirection == "left") {
        this.x -= 10;
      }
    }, 25);
  }
}
