import EnemySpawner from "./EnemySpawner";
import level from "./level";

class World {
  constructor(gameField, player, background, scoreTracker) {
    this.width = 1360;
    this.height = 707;
    this.xOffset = 0;
    this.playAreaTop = 230; // Top of walkable area
    this.playAreaBottom = this.playAreaTop + 348; // Bottom of walkable area

    this.gameStopped = true;

    this.background = background;
    this.scoreTracker = scoreTracker;

    this.playFieldObjects = [];
    this.enemies = [];

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width = this.width + 'px';

    level.forEach(entity => {
      this.registerObject(entity);
    })

    // Sets up player
    this.player = player;
    gameField.appendChild(player.element);
    if (process.env.DEVELOPMENT) {
      gameField.appendChild(player.footbox);
      gameField.appendChild(player.hitbox);
    }

    // left and right are in level.js, on the walls
    this.enemySpawner = new EnemySpawner(this, this.player, this.width, -900, 1900, this.playAreaTop, this.playAreaBottom);

    while(this.hasCollisions(player.feet)) {
        const minX = 0;
        const maxX = this.width;

        this.player.x = Math.floor(Math.random() * (minX - maxX)) + maxX;
        this.player.y = Math.floor(Math.random() * (0 - this.height)) + this.height;
    }
  }

  start() {
    this.enemySpawner.startSpawning();
    this.scoreTracker.startTracking();
    this.gameStopped = false;
  }

  stop() {
    this.enemySpawner.stopSpawning();
    this.scoreTracker.endTracking();
    this.gameStopped = true;
  }

  update() {
    const player = this.player;

    // Update enemies
    this.enemies.forEach((enemy, index) => {
      if (enemy.dead) return;

      const currentPosition = {
        x: enemy.x,
        y: enemy.y
      }

      enemy.startAnimations('walking');

      const dx = enemy.x - player.x;

      if (dx < 0) {
        enemy.startAnimations('facing-left');
        enemy.direction = 'right';
      } else {
        enemy.endAnimations('facing-left');
        enemy.direction = 'left';
      }

      if (dx > enemy.width) {
        enemy.x -= enemy.speed;
      } else if (dx < -enemy.width) {
        enemy.x += enemy.speed;
      }

      if (this.hasCollisions(enemy.feet, index) || this.isColliding(enemy.feet, player.feet)) {
        enemy.x = currentPosition.x;
      }

      const dy = enemy.y - player.y;
      if (dy > 4) {
        enemy.y -= enemy.speed;
      } else if (dy < -4) {
        enemy.y += enemy.speed;
      }

      if (this.hasCollisions(enemy.feet, index) || this.isColliding(enemy.feet, player.feet)) {
        enemy.y = currentPosition.y;
      }

      if (enemy.x === currentPosition.x && enemy.y === currentPosition.y) {
        enemy.endAnimations('walking');
      }

      if (Math.abs(dx) < 60 && Math.abs(dy) < 40) {
        enemy.attack(player)
      }
    });

    if (this.gameStopped) return;

    this.enemySpawner.spawnQueue().forEach(enemy => {
      this.registerObject(enemy, 'enemy');
    })
  }

  movePlayer(direction) {
    const player = this.player;
    if (player.dead) return;

    if (player.attacking) return;
    const currentPosition = {
      x: player.x,
      y: player.y
    }

    switch (direction) {
      case "up":
        player.startAnimations('walking');
        player.y -= player.speed;
        break;
      case "down":
        player.startAnimations('walking');
        player.y += player.speed;
        break;
      case "left":
        player.startAnimations('walking');
        player.endAnimations('facing-left');
        player.direction = 'left';
        player.x -= player.speed;
        break;
      case "right":
        player.startAnimations('walking');
        player.startAnimations('facing-left');
        player.direction = 'right';
        player.x += player.speed;
        break;
    }

    if (this.hasCollisions(player.feet) ||
      player.y < this.playAreaTop ||
      player.y > this.playAreaBottom) {
      player.x = currentPosition.x;
      player.y = currentPosition.y;
    }

    // Edge bounds
    if (player.x < 150) {
      player.x = 150;
      this.background.right()
      this.moveCamera(5);
    } else if (player.x > this.width - 150) {
      player.x = this.width - 150;
      this.background.left()
      this.moveCamera(-5);
    }
  }

  playerAttack() {
    if (!this.player.attacking && !this.player.attackCoolingDown) {
      const result = this.player.attack(this.enemies);
      if (result.kills > 0) {
        this.cleanUpDead();
        this.scoreTracker.killedEnemy(result.kills);
      }
    }

  }

  cleanUpDead() {
    this.enemies = this.enemies.filter(enemy => {
      // Add dead enemy to static objects to prevent showing up as a kill on every hit
      if (enemy.dead) this.registerObject(enemy, 'static');

      // Filter out the dead enemies from the enemies array
      return !enemy.dead
    });
  }

  hasCollisions(entity1, enemySkipIndex) {
    const staticCollisions = this.playFieldObjects.some(entity2 => {
      if (entity2.dead) return false;
      return this.isColliding(entity1, entity2)
    });

    const enemyCollisions = this.enemies.some((entity2, index) => {

      // Prevent enemy from colliding with self
      if (enemySkipIndex === index) return false;

      if (entity2.feet) return this.isColliding(entity1, entity2.feet);
      return this.isColliding(entity1, entity2)
    });

    return enemyCollisions || staticCollisions;
  };

  isColliding(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x &&
      rect1.x < rect2.x + rect2.width &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }

  moveCamera(amount) {
    this.xOffset += amount;
    this.playFieldObjects.forEach(object => {
      object.x += amount;
    });

    this.enemies.forEach(object => {
      object.x += amount;
    });
  }

  // Register an object to be tracked by the world
  registerObject(object, type = "static") {
    if (type === "static") {
      this.playFieldObjects.push(object);
    } else if (type === "enemy") {
      this.enemies.push(object);
    } else {
      throw new Error('Must pass a valid type');
    }

    this.gameField.appendChild(object.element);

    if (process.env.DEVELOPMENT) {
      this.gameField.appendChild(object.hitbox);
      if (object.footbox) this.gameField.appendChild(object.footbox);
    }
  }

  draw() {
    this.player.draw();
    this.background.draw();

    this.playFieldObjects.forEach(object => {
      object.draw();
    });
    this.enemies.forEach(object => {
      object.draw();
    });
  }
}

export default World;