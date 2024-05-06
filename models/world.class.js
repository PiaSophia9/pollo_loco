class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottle();
  keyboard;
  camera_x = 0;
  throwableObjects = [];
  collectableBottles = [new Bottle(140, 200), new Bottle(490, 250), new Bottle(932, 166), new Bottle(1256, 235), new Bottle(1578, 197), new Bottle(1928, 250)]; // Todo: rename "bottles"
  collectableCoins = [
    new Coin(300, 100),
    new Coin(330, 150),
    new Coin(360, 100),
    new Coin(600, 250),
    new Coin(700, 250),
    new Coin(800, 250),
    new Coin(900, 250),
    new Coin(1000, 250),
    new Coin(1100, 200),
    new Coin(1200, 150),
    new Coin(1300, 100),
    new Coin(1400, 150),
    new Coin(1500, 200),
  ];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    this.level.bigChicken.forEach((enemy) => {
      this.reduceEnergy(enemy, "10");
    });

    this.level.smallChicken.forEach((enemy) => {
      this.reduceEnergy(enemy, "5");
    });

    this.level.endboss.forEach((enemy) => {
      this.reduceEnergy(enemy, "26");
    });

    // Todo: collectable object should be in level and level1
    this.collectableBottles.forEach((collectable) => {
      this.increaseBottles(collectable, "21");
    });

    this.collectableCoins.forEach((collectable) => {
      this.increaseCoins(collectable, "5");
    });
  }

  increaseBottles(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      increase = parseInt(increase);
      this.character.bottles += increase;
      this.statusBarBottles.setPercentage(this.character.bottles);
      console.log(this.character.bottles);
      this.indexCollectables = this.collectableBottles.indexOf(collectable);
      if (this.indexCollectables !== -1) {
        this.collectableBottles.splice(this.indexCollectables, 1);
      }
    }
  }

  increaseCoins(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      increase = parseInt(increase);
      this.character.coins += increase;
      this.statusBarCoins.setPercentage(this.character.coins);
      console.log(this.character.coins);
      this.indexCollectables = this.collectableCoins.indexOf(collectable);
      if (this.indexCollectables !== -1) {
        this.collectableCoins.splice(this.indexCollectables, 1);
      }
    }
  }

  reduceEnergy(enemy, damage) {
    if (this.character.isColliding(enemy)) {
      this.character.hit(damage);
      this.statusBarHealth.setPercentage(this.character.energy);
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(new ThrowableObject());
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundobjects);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bigChicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableBottles);
    this.addObjectsToMap(this.collectableCoins);

    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.ctx.translate(this.camera_x, 0); // forwards

    this.ctx.translate(-this.camera_x, 0);

    // Draw wird so oft aufgerufen, wie es die Grafikkarte hergibt.
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawBlueFrame(this.ctx);
    mo.drawRedFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
