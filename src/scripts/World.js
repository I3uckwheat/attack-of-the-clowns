class World {
  constructor(gameField) {
    this.width = 1300;
    this.height = 700;

    // the second number is the amount of walkable height from the bottom of the playArea
    this.vTravelHeight = this.height - 500; 

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.playFieldObjects = [];
  }

  update(speed) {
    this.playFieldObjects.forEach(object => {
      object.x += speed * 50;
    });
  }

  draw() {
    this.playFieldObjects.forEach(object => {
      object.element.classList.add(object.cssClass);
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
      object.element.style.height = object.height + 'px';
      object.element.style.width = object.width + 'px';
    });
  }

  // Register an object to be tracked by the world
  register(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.element.cssClass);
    this.gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }

  anyCollisionsWith(entity) {
    return this.playFieldObjects.some(playFieldObject => {
      return this.isCollidingWithFeet(playFieldObject, entity);
    });
  }

  isCollidingWithFeet(rect1, rect2) {
    const feetPosition = {
      x: rect2.x,
      y: rect2.y + rect2.height - rect2.feet.height,
      height: rect2.feet.height,
      width: rect2.width,
    }

    return this.isColliding(rect1, feetPosition)
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x > rect2.x &&                
      rect1.x < rect2.x + rect2.width &&  
      rect1.y + rect1.height > rect2.y &&                
      rect1.y < rect2.y + rect2.height    
    );
  }
}

export default World;