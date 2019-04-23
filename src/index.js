import World from "./scripts/World";
import Controls from "./scripts/Controls";
import Player from "./scripts/Player";

import background from "./scripts/Background";

const gameField = document.querySelector('#game');
 
// Globals
let player;
let world;
let controls;

function initialize() {
  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  player = new Player();

  world = new World(gameField, player, background);
  world.registerStatic({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 67,
    height: 50,
  });

  requestAnimationFrame(tick);
}

function update() {
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
