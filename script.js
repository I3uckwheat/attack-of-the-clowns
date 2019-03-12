const gameField = document.querySelector('#game');
const player = {
  x: 0,
  y: 200,
  width: 70,
  height: 100,
  velocity: 0,
  maxJump: 2,
  element: document.createElement('div'),
  stats : {
    jumpCount: 0,
    jumpOffset: 0
  }
};

const world = {
  gravity: .4,
  ground: {
    x: 0,
    y: 640,
    height: 5,
    width: 960,
    element: document.createElement('div'),
  },
  pole: {
    element: document.createElement('div'),
    width: 30,
  },
  box: {
    element: document.createElement('div'),
    width: 160,
    height: 140
  }
}

let left = 0;
let right = 0;
let up = 0;
let down = 0;
let jump = 0;


function initalize() {
  // Sets up gamefield 
  gameField.style.height = world.ground.y + 'px';
  gameField.style.width= world.ground.width + 'px';

  // sets up player
  player.element.classList.add('player');
  player.element.style.height = player.height + 'px';
  player.element.style.width = player.width + 'px';
  gameField.appendChild(player.element);

  // Sets up ground
  world.ground.element.classList.add('ground');
  world.ground.element.style.top = world.ground.y + 'px';
  world.ground.element.style.height = world.ground.height + 'px';
  world.ground.element.style.width = world.ground.width + 'px';
  gameField.appendChild(world.ground.element);

  // Sets up pole
  world.pole.element.classList.add('pole');
  world.pole.element.style.width = world.pole.width + 'px';
  world.pole.element.style.height = world.ground.y + 'px';
  world.pole.element.style.left = (world.ground.width)/2 + 'px';
  gameField.appendChild(world.pole.element);

  // Set up box
  world.box.element.classList.add('box');
  world.box.element.style.width = world.box.width + 'px';
  world.box.element.style.height = world.box.height + 'px';
  world.box.element.style.top = world.ground.y - world.box.height + 'px';
  world.box.element.style.left = 700 + 'px';
  gameField.appendChild(world.box.element);

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
    if (player.x + player.width < world.ground.width) {
      player.x += 9;
    }
  }  
  if (right === 1) {
    // stop on left edge of world 
    if (player.x > 0) {
      player.x -= 9;
    }
  }
  if (up === 1) {
    if (player.y > 350) {
      player.y -= 9;
    }
  }
  if (down === 1) {
    if (player.y + player.height < world.ground.y)
      player.y += 9;
  }

  if (jump === 1) {
    jump = 0;
    player.stats.jumpCount++;

    // only jump if maxJump hasn't been reached
    if (player.stats.jumpCount <= player.maxJump){
      player.velocity -= 10; 
    }
  }

  if (player.stats.jumpOffset > 0) {
    player.stats.jumpOffset -= player.velocity;	
  }

  player.stats.jumpOffset += player.velocity;

  // reset jumpCount, so you can jump again
  // TODO - terminal velocity
  if(player.stats.jumpOffset > 0) {
    player.velocity = 0;
    player.stats.jumpOffset = 0;
    player.stats.jumpCount = 0;
  } else {
    player.velocity += world.gravity;
  }
}

function draw() {
  player.element.style.left = player.x + 'px';
  player.element.style.top = player.y + player.stats.jumpOffset + 'px';
}

initalize();
setInterval(() => {
  update();
  draw();
}, 10);
