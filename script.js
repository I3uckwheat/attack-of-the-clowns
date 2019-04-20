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
    gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }

  anyCollisionsWith(entity) {
    return this.playFieldObjects.some(playFieldObject => {
      return this.willCollide(playFieldObject, entity);
    });
  }

  willCollide(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y
  }
}

const gameField = document.querySelector('#game');

const player = {
  x: 100,
  y: 400,
  width: 145,
  height: 200,
  element: document.createElement('div'),
};

const world = new World(gameField);

const background = {
  layers: {
    ring: {
      element: document.getElementById('ring'),
      position: 0,
      speed: 5,
      reset: 520,
    },
  }, 
  right: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position + layer.speed) % layer.reset;   
    });
  },
  left: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position - layer.speed) % layer.reset;   
    });
  },
  draw: function() {
    this.layers.ring.element.style.backgroundPositionX = this.layers.ring.position + 'px';
  }
}

let left = 0;
let right = 0;
let up = 0;
let down = 0;

function initalize() {
  // sets up player
  player.element.classList.add('player');

  gameField.appendChild(player.element);
  
  world.register({
    cssClass: 'box',
    x: 600,
    y: 550,
    width: 218,
    height: 108
  });
  
  // sets up movement
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      left = 1;
    }
    if (event.code === 'KeyA') {
      right = 1;
    }
    if (event.code === 'KeyW') {
      up = 1;
    }
    if (event.code === 'KeyS') {
      down = 1;
    }
    if (event.code === 'Space') {
    }
  });

  document.addEventListener('keyup', event => {
    if (event.code === 'KeyD') {
      left = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'KeyA') {
      right = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'KeyW') {
      up = 0;
    }
    if (event.code === 'KeyS') {
      down = 0;
    }
    if (event.code === 'Space') {
    }
  });
}

function update() {
  // update player
  if (left === 1) {
    player.element.classList.add('walking', 'facing-left')
    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.x += 9;
    } else {
      world.update(-.1);
      background.left();
    }

    while (world.anyCollisionsWith(player)) {
      player.x -=1;
    }
  }  
  if (right === 1) {
    player.element.classList.add('walking')
    player.element.classList.remove('facing-left')

    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.x -= 9;
    } else {
      world.update(.1);
      background.right();
    }

    while (world.anyCollisionsWith(player)) {
      player.x +=1;
    }
  }
  if (up === 1) {
    if (player.y > world.vTravelHeight) {
      player.y -= 9;
    }

    while (world.anyCollisionsWith(player)) {
      player.y += 1;
    }
  }
  if (down === 1) {
    if (player.y + player.height < world.height) {
      player.y += 9;
    }
    while (world.anyCollisionsWith(player)) {
      player.y -= 1;
    }
  }
}

function draw() {
  player.element.style.left = player.x + 'px';
  player.element.style.top = player.y + 'px';

  background.draw();
  world.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initalize();
requestAnimationFrame(tick);
