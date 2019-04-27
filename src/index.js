import Game from "./scripts/Game";
import Controls from "./scripts/Controls";
import Player from "./scripts/Player";
import Entity from "./scripts/Entity";
import ScoreTracker from "./scripts/ScoreTracker";

import background from "./scripts/Background";

const gameField = document.querySelector('#game');
const healthBar = document.querySelector('#player-health div');
const healthBarText = document.querySelector('#health-points');
const score = document.querySelector('#score');
 
// Globals
let player;
let game;
let controls;
let scoreTracker;

// game will run  
let gameState = 0;

function initialize() {
  player = new Player();
  player.onDeath(() => {
    // This can be used to change game state and such too. Also trigger game over screen
    scoreTracker.saveScore();
    scoreTracker.endTracking();
    console.log('game over');
  })

  player.onTakeHit(health => {
    healthBar.style.width = health + '%';
    healthBarText.innerText = health;
  });

  scoreTracker = new ScoreTracker();
  scoreTracker.onScoreUpdate(newScore => {score.innerText = newScore});

  // changes gamestate and removed overlay
  const startButton = document.querySelector('#startbutton')

  startButton.addEventListener('click', () => {
    gameState = 1
    document.getElementById("overlay").style.display = "none";
    scoreTracker.startTracking();
  });

  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  game = new Game(gameField, player, background, scoreTracker);
  game.registerObject(new Entity(600, 450, 67, 50, 'box'));
  game.registerObject(new Entity(200, 350, 67, 50, 'box'));

  requestAnimationFrame(tick);
}

function update() {
  if (gameState === 1) {
    if (controls.isPressed('attack')) {
      game.playerAttack();
    }
    if (controls.isPressed('up')) {
      game.movePlayer('up');
    }
    if (controls.isPressed('down')) {
      game.movePlayer('down');
    }
    if (controls.isPressed('left')) {
      game.movePlayer('left');
    }
    if (controls.isPressed('right')) {
      game.movePlayer('right');
    }
    
    game.update();
  }
}

function draw() {
  player.draw();
  game.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initialize();
