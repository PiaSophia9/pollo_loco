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
  characterJumpedOnChicken = false;
  throwableObjects = [];
  // enemyStatus;
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
      // Todo: Die Healthbar oder das Abziehen der Energie braucht ein längeres Inetrvall
    }, 5);
    setInterval(() => {
      this.checkThrowObjects();
    }, 1000 / 10);
  }

  checkCollisions() {
    this.level.bigChicken.forEach((enemy) => {
      this.killChicken(enemy, "bigChicken");
      // if (!this.characterJumpedOnChicken == true) {
      // this.reduceEnergy(enemy, "10");
      // }
      // this.characterJumpedOnChicken = false;
    });

    this.level.smallChicken.forEach((enemy) => {
      this.killChicken(enemy, "smallChicken");
      // if (!this.characterJumpedOnChicken == true) {
      // this.reduceEnergy(enemy, "5");
      // }
      // this.characterJumpedOnChicken = false;
    });

    // this.level.smallChicken.forEach((enemy) => {
    //   this.reduceEnergy(enemy, "5");
    // });

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
      this.indexCollectables = this.collectableCoins.indexOf(collectable);
      if (this.indexCollectables !== -1) {
        this.collectableCoins.splice(this.indexCollectables, 1);
      }
    }
  }

  reduceEnergy(enemy, damage) {
    if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
      this.character.hit(damage);
      this.statusBarHealth.setPercentage(this.character.energy);
    }
  }

  // killChicken(enemy, chickenType) {
  //   if ((this.character.isColliding(enemy) && this.character.isAboveGround() && this.isMovingDownwards()) || enemy.energy == 0) {
  //     // this.enemyStatus = "dead";
  //     // this.characterJumpedOnChicken = true;
  //     // this.character.isKilling = true;
  //     enemy.energy = 0;
  //     enemy.showImage(enemy.IMAGE_DYING); // Todo: showImage, statt playanimation
  //     setTimeout(() => {
  //       let index = this.level[chickenType].indexOf(enemy);
  //       if (index != -1) {
  //         this.level[chickenType].splice(index, 1);
  //         // this.enemyStatus = "";
  //       }
  //     }, 1000);
  //     // } else if (this.character.isColliding(enemy) && !this.enemyStatus == "dead") {
  //   } else if (this.character.isColliding(enemy)) {
  //     this.reduceEnergy(enemy, "10");
  //   }
  // }

  killChicken(enemy, chickenType) {
    if ((this.character.isColliding(enemy) && this.character.isAboveGround() && this.isMovingDownwards()) || enemy.energy == 0) {
      // this.enemyStatus = "dead";
      // this.characterJumpedOnChicken = true;
      // this.character.isKilling = true;
      enemy.energy = 0;
      enemy.showImage(enemy.IMAGE_DYING); // Todo: showImage, statt playanimation
      setTimeout(() => {
        let index = this.level[chickenType].indexOf(enemy);
        if (index != -1) {
          this.level[chickenType].splice(index, 1); // this.enemyStatus = "";
        }
      }, 500); // } else if (this.character.isColliding(enemy) && !this.enemyStatus == "dead") {
    } else if (this.character.isColliding(enemy) && !enemy.energy == 0) {
      this.reduceEnergy(enemy, "10");
      // enemy.playAnimation(enemy.IMAGES_WALKING);
    } else if (!enemy.energy == 0) {
      // enemy.playAnimation(enemy.IMAGES_WALKING);
    }
  }

  isMovingDownwards() {
    return this.character.speedY < 0; // Wenn die Geschwindigkeit in y-Richtung negativ ist, bewegt sich der Charakter von oben nach unten.
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right - 10, this.character.y + this.character.height / 3);
      this.throwableObjects.push(bottle);
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
    this.addObjectsToMap(this.collectableBottles); // todo: Put into level
    this.addObjectsToMap(this.collectableCoins); // todo: Put into level

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
