import World from "./scripts/World";
import Controls from "./scripts/Controls";
import Player from "./scripts/Player";
import Entity from "./scripts/Entity";

import background from "./scripts/Background";

const gameField = document.querySelector('#game');
 
// Globals
let player;
let world;
let controls;

// Make your menu, and then when you want to the game, change this variable to `1` an the game will run  
let gameState = 0;

function initialize() {
  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  player = new Player();

  world = new World(gameField, player, background);
  world.registerObject(new Entity(600, 450, 67, 50, 'box'));
  world.registerObject(new Entity(200, 350, 67, 50, 'box'));

  requestAnimationFrame(tick);
}

function update() {
  if (gameState === 1) {
    if (controls.isPressed('up')) {
      world.movePlayer('up');
    }
    if (controls.isPressed('down')) {
      world.movePlayer('down');
    }
    if (controls.isPressed('left')) {
      world.movePlayer('left');
    }
    if (controls.isPressed('right')) {
      world.movePlayer('right');
    }

    world.update();
  }
}

function draw() {
  player.draw();
  world.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initialize();
