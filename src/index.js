import World from "./scripts/World";
import Controls from "./scripts/Controls";
import Player from "./scripts/Player";
import EnemyController from "./scripts/EnemyController";

import background from "./scripts/Background";

const gameField = document.querySelector('#game');
 
// Globals
let player;
let world;
let controls;
let enemyController;

function initialize() {
  player = new Player(gameField);

  world = new World(gameField);
  world.registerStatic({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 67,
    height: 50,
  });

  enemyController = new EnemyController(gameField, world);
  enemyController.spawnEnemy();

  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  requestAnimationFrame(tick);
}

function update() {
  enemyController.update(player);

  // update player
  if (controls.isPressed('right')) {
    player.startAnimations('walking', 'facing-left');

    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.move('right');
    } else {
      world.update(-.1);
      
      background.left();
    }

    while (world.anyCollisionsWith(player.feet)) {
      player.unCollide('right');
    }
  }  
  if (controls.isPressed('left')) {
    player.startAnimations('walking');
    player.endAnimations('facing-left');

    // stop on left edge of world 
    if (player.x > 150) {
      player.move('left');
    } else {
      world.update(.1);
      background.right();
    }

    while (world.anyCollisionsWith(player.feet)) {
      player.unCollide('left');
    }
  }
  if (controls.isPressed('up')) {
    player.startAnimations('walking');

    if (player.y > world.vTravelHeight) {
      player.move('up');
    }

    while (world.anyCollisionsWith(player.feet)) {
      player.unCollide('up');
    }
  }
  if (controls.isPressed('down')) {
    player.startAnimations('walking');

    // FIXME: Magic number to fix player from going below the border of the play area
    if (player.y + player.height <= world.height - 5) {
      player.move('down');
    }
    while (world.anyCollisionsWith(player.feet)) {
      player.unCollide('down');
    }
  }

  if(controls.isPressed('attack')) {
    player.attack();
  }
}

function draw() {
  player.draw();
  background.draw();
  world.draw();
  enemyController.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initialize();
