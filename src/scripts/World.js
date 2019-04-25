import Enemy from "./Enemy";

class World {
  constructor(gameField, player, background) {
    this.background = background;

    // Sets up player
    this.player = player;
    gameField.appendChild(player.element);
    gameField.appendChild(player.footbox);
    gameField.appendChild(player.hitbox);

    this.width = 1300;
    this.height = 700;

    this.playAreaTop = this.height - 470;            // Top of walkable area
    this.playAreaBottom = this.playAreaTop + 335;    // Bottom of walkable area

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.playFieldObjects = [];
    this.enemies = [];

    this.registerObject(new Enemy({x: 400, y: 200}), "enemy")
    this.registerObject(new Enemy({x: 800, y: 300}), "enemy")
  }

  update() {
    const player = this.player;

    this.enemies.forEach((enemy, index) => {
      const currentPosition = {
        x: enemy.x,
        y: enemy.y
      }

      enemy.startAnimations('walking');

      const dx = enemy.x - player.x;
      if (dx > enemy.width) {
        enemy.x -= enemy.speed;
        enemy.endAnimations('facing-left');
      } else if (dx < -enemy.width) {
        enemy.startAnimations('facing-left');
        enemy.x += enemy.speed;
      }

      if(this.hasCollisions(enemy.feet, index) || this.isColliding(enemy.feet, player.feet))
      {
        enemy.x = currentPosition.x;
      }

      const dy = enemy.y - player.y;
      if (dy > 4) {
        enemy.y -= enemy.speed;
      } else if (dy < -4) {
        enemy.y += enemy.speed;
      }

      if(this.hasCollisions(enemy.feet, index) || this.isColliding(enemy.feet, player.feet))
      {
        enemy.y = currentPosition.y;
      }

      if (enemy.x === currentPosition.x && enemy.y === currentPosition.y) {
        enemy.endAnimations('walking');
      }
    });
  }

  movePlayer(direction) {
    const player = this.player;
    const currentPosition = {
      x: player.x,
      y: player.y
    }

    switch(direction) {
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
        player.x -= player.speed;
        break;
      case "right":
        player.startAnimations('walking');
        player.startAnimations('facing-left');
        player.x += player.speed;
        break;
    }

    if(this.hasCollisions(player.feet) ||
       player.y < this.playAreaTop || 
       player.y > this.playAreaBottom)
    {
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

  hasCollisions(entity1, enemySkipIndex) {
    const staticCollisions = this.playFieldObjects.some(entity2 => {
      return this.isColliding(entity1, entity2)
    });

    const enemyCollisions = this.enemies.some((entity2, index) => {
      if(enemySkipIndex === index) return false;
      if (entity2.feet) return this.isColliding(entity1, entity2.feet);
      return this.isColliding(entity1, entity2)
    });

    return enemyCollisions || staticCollisions;
  };

  isColliding(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x  &&
      rect1.x < rect2.x + rect2.width  &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }

  moveCamera(amount) {
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

    if(process.env.DEVELOPMENT || true) {
      this.gameField.appendChild(object.hitbox);
      if(object.footbox) this.gameField.appendChild(object.footbox);
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