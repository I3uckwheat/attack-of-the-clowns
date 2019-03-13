class World {
  constructor(gameField, backgroundElement, ceilingElement) {
    this.width = 960;
    this.height = 640;

    this.ceiling = ceilingElement;

    this.background = backgroundElement;

    this.playFieldObjects = [];
    
    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.initBackground();
    this.initCeiling();
  }

  initBackground() {
    this.background.element = document.createElement('div');
    this.background.element.classList.add(this.background.cssClass);
    this.background.element.style.width = this.background.height + 'px';
    this.background.element.style.height = this.background.width + 'px';
    this.background.element.style.top = this.background.y + 'px';
    this.background.element.style.left = this.background.x + 'px';
    this.gameField.appendChild(this.background.element);
  }

  initCeiling() {
    this.ceiling.element = document.createElement('div');
    this.ceiling.element.classList.add(this.ceiling.cssClass);
    this.ceiling.element.style.width = this.ceiling.height + 'px';
    this.ceiling.element.style.height = this.ceiling.width + 'px';
    this.ceiling.element.style.top = this.ceiling.y + 'px';
    this.ceiling.element.style.left = this.ceiling.x + 'px';
    this.gameField.appendChild(this.ceiling.element);
  }

  update(speed) {
    // TODO - handle wrapping 
    // maybe make the `x` variable passed in a degree measurement for the circle?
    this.background.orientation += speed;
    this.ceiling.orientation -= speed;

    this.playFieldObjects.forEach(object => {
      object.x += speed * 13;
    });
  }

  draw() {
    this.background.element.style.transform = `rotate(${this.background.orientation}deg)`;
    this.ceiling.element.style.transform = `rotate(${this.ceiling.orientation}deg)`;

    this.playFieldObjects.forEach(object => {
      object.element.classList.add(object.cssClass);
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
      object.element.style.height = object.height + 'px';
      object.element.style.width = object.width + 'px';
    });
  }

  // Register an object to be tracked by the world
  registerDynamic(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.element.cssClass);
    gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }
  
  // Objects that do not move
  registerStatic(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.cssClass);
    object.element.style.left = object.x + 'px';
    object.element.style.top = object.y + 'px';
    object.element.style.height = object.height + 'px';
    object.element.style.width = object.width + 'px';

    gameField.appendChild(object.element);
  }
}

const gameField = document.querySelector('#game');

const background = {
  cssClass: 'ring',
  x: -2065,
  y: 100,
  width: 5000,
  height: 5000,
  orientation: 0,
}

const ceiling = {
  cssClass: 'tent',
  x: -785,
  y: -2000,
  width: 2500,
  height: 2500,
  orientation: 0,
}

const player = {
  x: 100,
  y: 400,
  width: 70,
  height: 100,
  velocity: 0,
  mass: .4,
  maxJump: 2,
  element: document.createElement('div'),
  stats: {
    jumpCount: 0,
    jumpOffset: 0
  }
};

const world = new World(gameField, background, ceiling);

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
  gameField.appendChild(player.element);
  
  // sets up world
  world.registerStatic({
   cssClass: 'pole',
   x: 450, 
   y: 0,
   width: 30,
   height: 640
  });

  world.registerDynamic({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 208,
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
    }
    if (event.code === 'KeyA') {
      right = 0;
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
    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.x += 9;
    } else {
      world.update(-.4);
    }
  }  
  if (right === 1) {
    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.x -= 9;
    } else {
      world.update(.4);
    }
  }
  if (up === 1) {
    if (player.y > 350) {
      player.y -= 9;
    }
  }
  if (down === 1) {
    if (player.y + player.height < world.height) {
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
  // TODO - terminal velocity
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

  world.draw();
}

initalize();
setInterval(() => {
  update();
  draw();
}, 10);
