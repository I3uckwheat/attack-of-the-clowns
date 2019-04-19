const gameField = document.querySelector('#game');

const world = {
  width: 1600,
  height: 900
}

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

// Globals for movement keys
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

  // set up world
  gameField.style.height = world.height + 'px';
  gameField.style.width = world.width + 'px';


  gameField.appendChild(player.element);
  
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
    if (player.x + player.width < world.width) {
      player.x += 9;
    }
  }  
  if (right === 1) {
    player.element.classList.add('walking')
    player.element.classList.remove('facing-left')

    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.x -= 9;
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
}

function step() {
  update();
  draw();
  requestAnimationFrame(step);
}

initalize();
requestAnimationFrame(step);
