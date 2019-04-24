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
  }

  update() {
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

  hasCollisions(entity1) {
    return this.playFieldObjects.some(entity2 => {
      return this.isColliding(entity1, entity2);
    });
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
  }

  // Register an object to be tracked by the world
  registerObject(object) {
    this.playFieldObjects.push(object);
    this.gameField.appendChild(object.element);
  }
  
  draw() {
    this.player.draw();
    this.background.draw();

    this.playFieldObjects.forEach(object => {
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
    });
  }
}

export default World;