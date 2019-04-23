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

    // the second number is the amount of walkable height from the bottom of the playArea
    this.vTravelHeight = this.height - 470; 

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.playFieldObjects = [];
    this.dynamicPlayFieldObjects = [];
  }

  update() {}

  movePlayer(direction) {
    const player = this.player;
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

  moveCamera(amount) {
    this.playFieldObjects.forEach(object => {
      object.x += amount;
    });
  }

  draw() {
    this.player.draw();
    this.background.draw();

    this.playFieldObjects.forEach(object => {
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
    });
  }

  // Register an object to be tracked by the world
  registerStatic(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.cssClass);
    this.gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }

  anyCollisionsWith(entity) {
    return this.playFieldObjects.some(playFieldObject => {
      if(playFieldObject.feet) {
        return this.isColliding(playFieldObject.feet, entity);
      }
      return this.isColliding(playFieldObject, entity);
    });
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x + rect1.width > rect2.x  &&
      rect1.x < rect2.x + rect2.width  &&
      rect1.y + rect1.height > rect2.y &&
      rect1.y < rect2.y + rect2.height
    );
  }
}

export default World;