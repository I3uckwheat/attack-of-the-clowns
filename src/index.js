import Game from "./scripts/Game";
import Controls from "./scripts/Controls";
import Player from "./scripts/Player";
import ScoreTracker from "./scripts/ScoreTracker";

import background from "./scripts/Background";

const gameField = document.querySelector('#game');
const healthBar = document.querySelector('#player-health div');
const healthBarText = document.querySelector('#health-points');
const strengthBar = document.querySelector('#player-strength div');
const strengthBarText = document.querySelector('#strength-points');
const score = document.querySelector('#score');
const restartButton = document.querySelector('#play-again');
const hi_scores = document.querySelector('#hi-scores-list');

restartButton.addEventListener('click', event => {
  event.preventDefault();
  location.reload();
});

// changes gamestate and removed overlay
const startButton = document.querySelector('#startbutton')

startButton.addEventListener('click', () => {
  gameState = 1
  document.getElementById("start-overlay").style.display = "none";
  game.start();
});
 
// Globals
let player;
let game;
let controls;
let scoreTracker;

// game will run  
let gameState = 0;

function initialize() {
  player = new Player();

  scoreTracker = new ScoreTracker();
  
  for (let i = 0; i < scoreTracker.savedScores.length; i++ ) {
      let item = document.createElement("li");
      item.innerHTML = scoreTracker.savedScores[i].score;
      hi_scores.appendChild(item);
  }

  scoreTracker.onScoreUpdate(newScore => {score.innerText = newScore});

  // This can be used to change game state and such too. Also trigger game over screen
  player.onDeath(() => {
    game.stop();

    //scoreTracker.saveScore();
    document.getElementById("end-overlay").style.display = "grid";
    document.getElementById("current-score").innerText = "SCORE: " + scoreTracker.currentScore;
  })

  player.onHealthChange(health => {
    healthBar.style.width = health + '%';
    healthBarText.innerText = health;
  });

  controls = new Controls({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  game = new Game(gameField, player, background, scoreTracker);


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

    strengthBar.style.width = player.strength + '%';
    strengthBarText.innerText = player.strength;

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
