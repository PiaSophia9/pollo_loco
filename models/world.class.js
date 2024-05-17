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
  gameOverScreenShown = false;
  winScreenShown = false;
  throwableObjects = [];
  collectableBottles = [new Bottle(140, 200), new Bottle(490, 250), new Bottle(932, 166), new Bottle(1256, 235), new Bottle(1578, 197), new Bottle(1928, 250), new Bottle(2308, 180)];
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

  /**
   * Constructor for initializing the object with canvas and keyboard.
   *
   * @param {object} canvas - The canvas element to draw on.
   * @param {object} keyboard - The keyboard object for input handling.
   * @return {void} No return value.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world property of the character to the current instance.
   *
   * @param {} - No parameters.
   * @return {void} No return value.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Executes multiple game actions at regular intervals using setInterval.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.endbossApproaches();
    }, 10000 / 200);
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

  /**
   * Shows the loose screen if the character's energy is 0 or below, and the game over screen has not been shown yet.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  showLooseScreen() {
    if (this.character.energy <= 0 && !this.gameOverScreenShown) {
      setTimeout(() => {
        this.hidePlayScreen(), document.getElementById("looseScreen").classList.remove("d_none");
        this.gameOverScreenShown = true;
        clearAllIntervals();
      }, 500);
    }
  }

  /**
   * Shows the win screen if the end boss energy is zero and the win screen is not already shown.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  showWinScreen() {
    if (this.level.endboss[0].energy <= 0 && !this.winScreenShown) {
      setTimeout(() => {
        this.hidePlayScreen();
        document.getElementById("winScreen").classList.remove("d_none");
        this.winScreenShown = true;
        clearAllIntervals();
      }, 500);
    }
  }

  /**
   * Hides the play screen by muting audio and hiding specific elements on the page.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  hidePlayScreen() {
    mute();
    document.getElementById("responsiveButtonContainer").classList.add("d_none");
    document.getElementById("canvasButtonContainer").classList.add("d_none");
    document.getElementById("canvas").classList.add("d_none");
    document.getElementById("responsiveButtonContainer").classList.add("d_none");
  }

  /**
   * Checks collisions with different types of enemies and handles the consequences accordingly.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  checkCollisions() {
    this.level.bigChicken.forEach((enemy) => {
      this.hurtChicken(enemy, "bigChicken");
    });
    this.level.smallChicken.forEach((enemy) => {
      this.hurtChicken(enemy, "smallChicken");
    });
    this.level.endboss.forEach((enemy) => {
      this.reduceEnergy(enemy, "40");
    });
    checkCollisionCollectables();
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  checkCollisionCollectables() {
    this.collectableBottles.forEach((collectable) => {
      this.increaseBottles(collectable, "20");
    });
    this.collectableCoins.forEach((collectable) => {
      this.increaseCoins(collectable, "7");
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {} - No return value.
   */
  checkCollisionEndboss() {
    this.throwableObjects.forEach((throwableObject) => {
      this.killEndboss(throwableObject);
    });
  }

  /**
   * Moves the endboss closer to the character when the character's x position exceeds 1500.
   *
   * @param {} No parameters.
   * @return {} No return value.
   */
  endbossApproaches() {
    if (this.character.x > 1500) {
      this.level.endboss[0].characterIsClose = true;
    }
  }

  /**
   * Kills the endboss when colliding with a throwable object by reducing its energy and updating the status bar.
   *
   * @param {Object} throwableObject - The throwable object that collides with the endboss.
   * @return {void} No return value.
   */
  killEndboss(throwableObject) {
    this.level.endboss.forEach((endboss) => {
      if (endboss.isColliding(throwableObject)) {
        endboss.hit(35);
        this.statusBarEndboss.setPercentage(endboss.energy);
        this.level.endboss.lastHit = new Date().getTime();
      }
    });
  }

  /**
   * A function that increases the number of bottles collected by the character.
   *
   * @param {Object} collectable - The collectable object to check collision with.
   * @param {string} increase - The amount to increase the bottles by.
   * @return {void} No return value.
   */
  increaseBottles(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      this.playBottleSound(collectable);
      this.updateBottlesCounter(increase);
      this.statusBarBottles.setPercentage(this.character.bottles);
      this.removeBottle(collectable);
    }
  }

  /**
   * Plays the sound of a bottle collectable if audio is not muted.
   *
   * @param {Object} collectable - The collectable object that triggers the sound.
   * @return {void} No return value.
   */
  playBottleSound(collectable) {
    if (this.muteAudio == false) {
      collectable.bottle_sound.play();
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} increase - description of parameter
   * @return {type} description of return value
   */
  updateBottlesCounter(increase) {
    increase = parseInt(increase);
    if (this.character.bottles < 100) {
      this.character.bottles += increase;
    }
  }

  /**
   * Removes a specific bottle collectable from the collectableBottles array.
   *
   * @param {Object} collectable - The collectable object to be removed.
   * @return {void} No return value.
   */
  removeBottle(collectable) {
    this.indexCollectables = this.collectableBottles.indexOf(collectable);
    if (this.indexCollectables !== -1) {
      this.collectableBottles.splice(this.indexCollectables, 1);
    }
  }

  /**
   * A function that checks collision with a collectable object, plays a coin sound, updates the coin counter, sets the coins percentage in the status bar, and removes the coin collectable.
   *
   * @param {Object} collectable - The collectable object to check collision with.
   * @param {string} increase - The amount to increase the coins by.
   * @return {void} No return value.
   */
  increaseCoins(collectable, increase) {
    if (this.character.isColliding(collectable)) {
      this.playCoinSound(collectable);
      this.updateCoinCounter(increase);
      this.statusBarCoins.setPercentage(this.character.coins);
      this.removeCoin(collectable);
    }
  }

  /**
   * Plays the sound of a coin collectable if audio is not muted.
   *
   * @param {Object} collectable - The collectable object that triggers the sound.
   * @return {void} No return value.
   */
  playCoinSound(collectable) {
    if (this.muteAudio == false) {
      collectable.coin_sound.play();
    }
  }

  /**
   * Updates the coin counter by increasing the coin count.
   *
   * @param {number} increase - The amount to increase the coin count by.
   * @return {void} No return value.
   */
  updateCoinCounter(increase) {
    increase = parseInt(increase);
    this.character.coins += increase;
  }

  /**
   * Removes a specific coin collectable from the collectableCoins array.
   *
   * @param {Object} collectable - The collectable object to be removed.
   * @return {void} No return value.
   */
  removeCoin(collectable) {
    this.indexCollectables = this.collectableCoins.indexOf(collectable);
    if (this.indexCollectables !== -1) {
      this.collectableCoins.splice(this.indexCollectables, 1);
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {Object} enemy - The enemy object to interact with.
   * @param {string} damage - The amount of damage to inflict.
   * @return {void} No return value.
   */
  reduceEnergy(enemy, damage) {
    if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
      this.character.hit(damage);
      this.statusBarHealth.setPercentage(this.character.energy);
    }
    if (this.character.isColliding(enemy) && enemy.constructor.name.startsWith("Endboss")) {
      this.character.isCollidingWithEndboss = true;
      enemy.isCollidingWithCharacter = true;
      this.character.hit(damage);
      this.character.firstMomentOfCollision = new Date().getTime();
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} enemy - description of parameter
   * @param {type} chickenType - description of parameter
   * @return {type} No return value
   */
  hurtChicken(enemy, chickenType) {
    this.handleCharacterCollision(enemy, chickenType);
    this.throwableObjects.forEach((throwableObject) => {
      this.handleThrowableObjectCollision(throwableObject, enemy, chickenType);
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {type} enemy - description of parameter
   * @param {type} chickenType - description of parameter
   * @return {type} No return value
   */
  handleCharacterCollision(enemy, chickenType) {
    if ((this.character.isColliding(enemy) && this.character.isAboveGround() && this.isMovingDownwards()) || enemy.energy == 0) {
      this.enemyDies(enemy);
      this.deadEnemyDisapears(enemy, chickenType);
    } else if (this.character.isColliding(enemy) && !enemy.energy == 0) {
      this.reduceEnergy(enemy, "20");
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} throwableObject - description of parameter
   * @param {type} enemy - description of parameter
   * @param {type} chickenType - description of parameter
   * @return {type} No return value
   */
  handleThrowableObjectCollision(throwableObject, enemy, chickenType) {
    if (throwableObject.isColliding(enemy)) {
      this.enemyDies(enemy);
      this.deadEnemyDisapears(enemy, chickenType);
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} enemy - description of parameter
   * @return {type} No return value
   */
  enemyDies(enemy) {
    if (this.muteAudio == false) {
      enemy.dying_audio.play();
    }
    enemy.energy = 0;
    enemy.showImage(enemy.IMAGE_DYING);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} enemy - description of parameter
   * @param {type} chickenType - description of parameter
   * @return {type} No return value
   */
  deadEnemyDisapears(enemy, chickenType) {
    setTimeout(() => {
      let index = this.level[chickenType].indexOf(enemy);
      if (index != -1) {
        this.level[chickenType].splice(index, 1);
      }
    }, 500);
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {boolean} - Returns true if the character is moving downwards, false otherwise.
   */
  isMovingDownwards() {
    return this.character.speedY < 0;
  }

  /**
   * A description of the entire function.
   *
   * @param {string} direction - The direction in which the throwable object is created.
   * @return {ThrowableObject} The newly created throwable object.
   */
  createThrowableObject(direction) {
    let x, y;
    if (direction === "right") {
      x = this.character.x + this.character.width - this.character.offset.right - 10;
    } else {
      x = this.character.x - this.character.offset.left + 10;
    }
    y = this.character.y + this.character.height / 3;
    return new ThrowableObject(x, y, direction);
  }

  /**
   * A description of the entire function.
   *
   * @param {string} direction - The direction in which the throwable object is created.
   * @return {void} No return value.
   */
  throwBottle(direction) {
    let bottle = this.createThrowableObject(direction);
    this.throwableObjects.push(bottle);
  }

  /**
   * Reduces the number of bottles by 20 if the character has more than 0 bottles.
   *
   * @param {} - No parameters.
   * @return {void} No return value.
   */
  reduceBottles() {
    if (this.character.bottles > 0) {
      this.character.bottles -= 20;
      this.statusBarBottles.setPercentage(this.character.bottles);
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {} - No parameters.
   * @return {void} No return value.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      if (this.character.otherDirection == false) {
        this.throwBottle("right");
      } else {
        this.throwBottle("left");
      }
      this.reduceBottles();
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundobjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  drawCharactersAndItems() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bigChicken);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableBottles);
    this.addObjectsToMap(this.collectableCoins);
    this.addObjectsToMap(this.level.endboss);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  drawLoop() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  draw() {
    this.drawBackground();
    this.drawCharactersAndItems();
    this.drawStatusBars();
    this.drawLoop();
  }

  /**
   * A description of the entire function.
   *
   * @param {type} objects - description of parameter
   * @return {type} No return value
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a movable object to the map with optional image flipping.
   *
   * @param {MovableObject} mo - The movable object to add to the map.
   * @return {void} No return value
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * A description of the entire function.
   *
   * @param {type} mo - description of parameter
   * @return {type} No return value
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * A description of the entire function.
   *
   * @param {type} mo - description of parameter
   * @return {type} No return value
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
