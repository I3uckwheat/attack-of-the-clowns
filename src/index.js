import World from "./World";
import Controls from "./Controls";

const gameField = document.querySelector('#game');

const world = new World(gameField);
const controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', space: 'attack'});

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

const player = {
  x: 100,
  y: 400,
  width: 110,
  height: 200,
  feet: {height: 25, width: 90},
  element: document.createElement('div'),
};

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
    y: 450,
    width: 67,
    height: 50,
  });
}

function update() {
  // update player
  if (controls.isPressed('right')) {
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
  if (controls.isPressed('left')) {
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
  if (controls.isPressed('up')) {
    player.element.classList.add('walking')

    if (player.y > world.vTravelHeight) {
      player.y -= 9;
    }

    while (world.anyCollisionsWith(player)) {
      player.y += 1;
    }
  }
  if (controls.isPressed('down')) {
    player.element.classList.add('walking')

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
