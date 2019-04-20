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
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));
}

function update() {
  // update player
  if (controls.isPressed('right')) {
    // player.element.classList.add('walking', 'facing-left');
    player.startAnimations('walking', 'facing-left');
    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.move('right');
    } else {
      world.update(-.1);
      background.left();
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('right');
    }
  }  
  if (controls.isPressed('left')) {
    player.startAnimations('walking');
    player.endAnimations('facing-left');

    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.move('left');
    } else {
      world.update(.1);
      background.right();
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('left');
    }
  }
  if (controls.isPressed('up')) {
    player.startAnimations('walking');

    if (player.y > world.vTravelHeight) {
      player.move('up');
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('up');
    }
  }
  if (controls.isPressed('down')) {
    player.startAnimations('walking');

    if (player.y + player.height < world.height) {
      player.move('down');
    }
    while (world.anyCollisionsWith(player)) {
      player.unCollide('down');
    }
  }
}

function draw() {
  player.draw();
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
