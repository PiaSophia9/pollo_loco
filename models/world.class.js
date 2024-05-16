class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottle();
  statusBarEndboss = new StatusBarEndboss();
  keyboard;
  camera_x = 0;
  characterJumpedOnChicken = false;
  muteAudio = false;
  throwableObjects = [];
  collectableBottles = [new Bottle(140, 200), new Bottle(490, 250), new Bottle(932, 166), new Bottle(1256, 235), new Bottle(1578, 197), new Bottle(1928, 250), new Bottle(2308, 180)]; // Todo: rename "bottles"
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
    new Coin(1600, 150),
    new Coin(1700, 100),
    new Coin(1800, 150),
    new Coin(1900, 200),
    new Coin(2000, 250),
    new Coin(2100, 250),
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
      this.endbossApproaches();
    }, 5);
    setInterval(() => {
      this.checkCollisionEndboss();
    }, 300);
    setInterval(() => {
      this.checkThrowObjects();
    }, 1000 / 10);
    setInterval(() => {
      this.showLooseScreen();
      this.showWinScreen();
    }, 1000 / 2.5);
  }

  gameOverScreenShown = false;

  showLooseScreen() {
    if (this.character.energy <= 0 && !this.gameOverScreenShown) {
      setTimeout(() => {
        console.log("show Game Over screen");
        document.getElementById("canvas").classList.add("d_none");
        document.getElementById("responsiveButtonContainer").classList.add("d_none");
        document.getElementById("looseScreen").classList.remove("d_none");
        this.gameOverScreenShown = true;
        clearAllIntervals();
      }, 500);
    }
  }

  winScreenShown = false;

  showWinScreen() {
    if (this.level.endboss[0].energy <= 0 && !this.winScreenShown) {
      setTimeout(() => {
        document.getElementById("canvas").classList.add("d_none");
        document.getElementById("responsiveButtonContainer").classList.add("d_none");
        document.getElementById("winScreen").classList.remove("d_none");
        this.winScreenShown = true;
        clearAllIntervals();
      }, 500);
    }
  }

  checkCollisions() {
    this.level.bigChicken.forEach((enemy) => {
      this.killChicken(enemy, "bigChicken");
    });

    this.level.smallChicken.forEach((enemy) => {
      this.killChicken(enemy, "smallChicken");
    });

    this.level.endboss.forEach((enemy) => {
      this.reduceEnergy(enemy, "40");
    });

    // Todo: collectable object should be in level and level1
    this.collectableBottles.forEach((collectable) => {
      this.increaseBottles(collectable, "20");
    });

    this.collectableCoins.forEach((collectable) => {
      this.increaseCoins(collectable, "7");
    });

    //this.collectableCoins.forEach((collectable) => {
    //  this.increaseCoins(collectable, "5");
    //});
  }

  checkCollisionEndboss() {
    this.throwableObjects.forEach((throwableObject) => {
      this.killEndboss(throwableObject);
    });
  }

  endbossApproaches() {
    if (this.character.x > 1500) {
      // if (this.level.endboss[0].x - this.character.x > 300)
      // console.log("character over 1490");
      // this.level.endboss[0].playAnimation(this.level.endboss[0].IMAGES_WALK);
      this.level.endboss[0].characterIsClose = true; // Todo: check if needed
      // this.level.endboss[0].lastApproach = new Date().getTime();
      // console.log(this.level.endboss.characterIsClose);
    }
    // else {
    //   this.level.endboss[0].characterIsClose = false;
    // }
  }

  killEndboss(throwableObject) {
    this.level.endboss.forEach((endboss) => {
      if (endboss.isColliding(throwableObject)) {
        // console.log("energy before hit: ", endboss.energy);
        endboss.hit(35);
        this.statusBarEndboss.setPercentage(endboss.energy);
        this.level.endboss.lastHit = new Date().getTime();
        // console.log("energy after hit: ", endboss.energy);

        // if energy < 1 endbossDies
        // dying-animation
        // let endboss disapear
        //} else if (endboss.isColliding(this.character)) {
        // console.log("endboss and character collide");
      }
    });
  }

  increaseBottles(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      increase = parseInt(increase);
      if (this.character.bottles < 100) {
        if (this.muteAudio == false) {
          collectable.bottle_sound.play();
        }
        this.character.bottles += increase;
      }
      this.statusBarBottles.setPercentage(this.character.bottles);
      this.indexCollectables = this.collectableBottles.indexOf(collectable);
      if (this.indexCollectables !== -1) {
        this.collectableBottles.splice(this.indexCollectables, 1);
      }
    }
  }

  increaseCoins(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      // if (collectable.constructor.name.startsWith("Coin")) {
      if (this.muteAudio == false) {
        collectable.coin_sound.play();
      }
      // }
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
    if (!this.character.isColliding(enemy)) {
      // enemy.isCollidingWithCharacter = false;
    }
    if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
      this.character.hit(damage);
      this.statusBarHealth.setPercentage(this.character.energy);
      // if (enemy.constructor.name.startsWith("Endboss")) {
      //   enemy.isCollidingWithCharacter = true; // do not work yet
      //   // this.character.isCollidingWithEndboss = true; // do not work yet
      //   // this.character.jump();
      //   // this.character.otherDirection = true;
      //   // if (this.character.isAboveGround) {
      //   //   this.character.x -= 20;
      //   //  }
      //   // this.character.firstMomentOfCollision = new Date().getTime();
      //   // this.character.jumpLeft();
      //   // this.character.x -= this.character.speed;
      //   //       this.camera_x = -this.character.x + 60 + 150;
      // }
    }
    if (this.character.isColliding(enemy) && enemy.constructor.name.startsWith("Endboss")) {
      this.character.isCollidingWithEndboss = true;
      enemy.isCollidingWithCharacter = true;
      this.character.hit(damage);
      this.character.firstMomentOfCollision = new Date().getTime();
    }
    // functions to make endboss follow
    // if (this.character.x - this.character.offset.left > enemy.x + // 200) {
    //   // CouldDo alternative: Character moved left or x -100
    //   enemy.otherDirection = true;
    // } else {
    //   enemy.otherDirection = false;
    // }
  }

  killChicken(enemy, chickenType) {
    if ((this.character.isColliding(enemy) && this.character.isAboveGround() && this.isMovingDownwards()) || enemy.energy == 0) {
      this.enemyDies(enemy);
      this.deadEnemyDisapears(enemy, chickenType);
    } else if (this.character.isColliding(enemy) && !enemy.energy == 0) {
      this.reduceEnergy(enemy, "10");
    }
    this.throwableObjects.forEach((throwableObject) => {
      if (throwableObject.isColliding(enemy)) {
        this.enemyDies(enemy);
        this.deadEnemyDisapears(enemy, chickenType);
      }
    });
  }

  // killchickenWithBottle() {} Todo killChicken auslagern

  enemyDies(enemy) {
    if (this.muteAudio == false) {
      enemy.dying_audio.play();
    }
    enemy.energy = 0;
    enemy.showImage(enemy.IMAGE_DYING); // Todo: showImage, statt playanimation
  }

  deadEnemyDisapears(enemy, chickenType) {
    setTimeout(() => {
      let index = this.level[chickenType].indexOf(enemy);
      if (index != -1) {
        this.level[chickenType].splice(index, 1);
      }
    }, 500);
  }

  isMovingDownwards() {
    return this.character.speedY < 0;
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      if (this.character.otherDirection == false) {
        let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right - 10, this.character.y + this.character.height / 3, "right");
        this.throwableObjects.push(bottle);
        if (this.character.bottles > 0) {
          this.character.bottles -= 20;
          this.statusBarBottles.setPercentage(this.character.bottles);
        }
      } else {
        let bottle = new ThrowableObject(this.character.x - this.character.offset.left + 10, this.character.y + this.character.height / 3, "left");
        this.throwableObjects.push(bottle);
        if (this.character.bottles > 0) {
          this.character.bottles -= 20;
          this.statusBarBottles.setPercentage(this.character.bottles);
        }
      }
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
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableBottles); // todo: Put into level
    this.addObjectsToMap(this.collectableCoins); // todo: Put into level
    this.addObjectsToMap(this.level.endboss);

    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
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
    // mo.drawBlueFrame(this.ctx);
    // mo.drawRedFrame(this.ctx);

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
