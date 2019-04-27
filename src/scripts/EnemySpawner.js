import Enemy from "./Enemy";
import Game from "./Game";

class EnemySpawner {
  constructor(world, player, viewWidth, leftBoundary, rightBoundary, topBoundary, bottomBoundary) {
    this.world = world;
    this.player = player;
    this.viewWidth = viewWidth;
    this.leftBoundary = leftBoundary + 50;
    this.rightBoundary = rightBoundary - 50;
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;

    this.queue = [];
    this.nextSpawn = 3000;
    this.enemyAddTimeout;

    this.startSpawnTimeout();
  }

  spawnQueue() {
    const enemyQueue = this.queue;
    this.queue = [];
    return enemyQueue;
  }

  addEnemyToQueue() {
    let x = Math.floor(Math.random() * (this.leftBoundary - this.rightBoundary)) + this.rightBoundary;
    let y = Math.floor(Math.random() * (this.topBoundary - this.bottomBoundary)) + this.bottomBoundary;
    let enemy = new Enemy(x, y)
    while (this.world.hasCollisions(enemy)) {
      x = Math.floor(Math.random() * (this.leftBoundary - this.rightBoundary)) + this.rightBoundary;
      y = Math.floor(Math.random() * (this.topBoundary - this.bottomBoundary)) + this.bottomBoundary;
      enemy = new Enemy(x, y)
    }

    this.queue.push(enemy);
  }

  startSpawnTimeout() {
    return setTimeout(() => {
      this.addEnemyToQueue();
      this.startSpawnTimeout();
    }, this.nextSpawn);
  }
}

export default EnemySpawner;