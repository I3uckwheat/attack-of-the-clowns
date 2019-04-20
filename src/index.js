import World from "./World";
import Controls from "./Controls";
import Player from "./Player";

import background from "./Background";

const gameField = document.querySelector('#game');
 
// Globals
let player;
let world;
let controls;

function initialize() {
  player = new Player(gameField);

  world = new World(gameField);
  world.register({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 67,
    height: 50,
  });

  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.element.classList.remove('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.element.classList.remove('walking'));
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

initialize();
requestAnimationFrame(tick);
