class World {
  constructor(gameField) {
    this.width = 960;
    this.height = 640;

    this.playFieldObjects = [];

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.playFieldObjects = [];
  }

  update(speed) {
    // TODO - handle wrapping 
    // maybe make the `x` variable passed in a degree measurement for the circle?
    this.playFieldObjects.forEach(object => {

      let objectLocation = parseInt(object.element.style.left)
      object.x += speed * 50;

      // Only adjust y axis if inside view 
      if(objectLocation > -235 && objectLocation < 970){
        if (objectLocation >= 360){
          object.y += speed * 5;

        } else {
          object.y -= speed * 5;

        }
        object.element.style.zIndex = object.y;

      }

    });
  }

  draw() {
    this.playFieldObjects.forEach(object => {
      object.element.classList.add(object.cssClass);
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
      object.element.style.height = object.height + 'px';
      object.element.style.width = object.width + 'px';
      object.element.style.zIndex = object.y;
    });
  }

  // Register an object to be tracked by the world
  register(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.element.cssClass);
    gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }
}

const gameField = document.querySelector('#game');

const player = {
  x: 100,
  y: 400,
  width: 200,
  height: 200,
  velocity: 0,
  mass: .4,
  maxJump: 2,
  element: document.createElement('div'),
  stats: {
    jumpCount: 0,
    jumpOffset: 0
  }
};

const world = new World(gameField);

const background = {
  layers: {
    ring: {
      element: document.getElementById('ring'),
      position: 0,
      speed: .2,
      reset: 10.4,
    },
    pole: {
      element: document.getElementById('pole'),
      position: 0,
      speed: -.2,
      reset: 230,
    },
    ceiling: {
      element: document.getElementById('ceiling'),
      position: 0,
      speed: -.02,
      reset: -19.25,
    },
    crowd: {
      element: document.getElementById('crowd'),
      position: 0,
      speed: .4,
      reset: 2880,
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
    this.layers.ring.element.style.transform = `rotate(${this.layers.ring.position}deg)`;
    this.layers.pole.element.style.backgroundPosition = `${this.layers.pole.position}px 0`;
    this.layers.ceiling.element.style.transform = `rotate(${this.layers.ceiling.position}deg)`;
    this.layers.crowd.element.style.backgroundPosition = `${this.layers.crowd.position}px 0`;
  }
}

let left = 0;
let right = 0;
let up = 0;
let down = 0;
let jump = 0;


function initalize() {
  // sets up player
  player.element.classList.add('player');
  player.element.style.height = player.height + 'px';
  player.element.style.width = player.width + 'px';
  player.element.style.zIndex = player.y;

  gameField.appendChild(player.element);
  
  world.register({
    cssClass: 'box',
    x: 600,
    y: 450,
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
      jump = 1;
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
      jump = 0;
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
  }
  if (up === 1) {
    if (player.y > 350) {
      player.element.style.zIndex = player.y;
      player.y -= 9;
    }
  }
  if (down === 1) {
    if (player.y + player.height < world.height) {
      player.element.style.zIndex = player.y;
      player.y += 9;
    }
  }

  if (jump === 1) {
    jump = 0;
    player.stats.jumpCount++;

    // only jump if maxJump hasn't been reached
    if (player.stats.jumpCount <= player.maxJump){
       player.velocity -= 10; 
    }
  }

   player.stats.jumpOffset += player.velocity;

  // reset jumpCount, so you can jump again
  if(player.stats.jumpOffset > 0) {
    player.velocity = 0;
    // player.stats.jumpOffset = 0;
    player.stats.jumpCount = 0;
  } else {
    player.velocity += player.mass;
  }
}

function draw() {
  player.element.style.left = player.x + 'px';
  player.element.style.top = player.y + player.stats.jumpOffset + 'px';

  background.draw();

  world.draw();
}

initalize();
setInterval(() => {
  update();
  draw();
}, 10);
