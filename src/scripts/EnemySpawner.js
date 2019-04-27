import Enemy from "./Enemy";
import Game from "./Game";

class EnemySpawner {
  constructor(world, player, viewWidth, leftBoundary, rightBoundary, topBoundary, bottomBoundary) {
    this.world = world;
    this.player = player;
    this.viewWidth = viewWidth;
    this.leftBoundary = leftBoundary;
    this.rightBoundary = rightBoundary;
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;

    this.queue = [];
    this.nextSpawn = 3000;
    this.enemyAddTimeout;
    this.shouldSpawn = false;

    this.startSpawnTimeout();
  }

  spawnQueue() {
    const enemyQueue = this.queue;
    this.queue = [];
    return enemyQueue;
  }

  addEnemyToQueue() {
    let x;
    let y;
    let enemy;

    do {
      x = Math.floor(Math.random() * (this.leftBoundary - this.rightBoundary)) + this.rightBoundary;
      y = Math.floor(Math.random() * (this.topBoundary - this.bottomBoundary)) + this.bottomBoundary;
      enemy = new Enemy(x, y)
    } while (this.world.hasCollisions(enemy.feet) || this.world.isColliding(this.player.feet, enemy.feet));

    this.queue.push(enemy);
  }

  startSpawnTimeout() {
    return setTimeout(() => {
      if (this.shouldSpawn)  {
        this.addEnemyToQueue();
        this.startSpawnTimeout();
      }
    }, this.nextSpawn);
  }

  startSpawning() {
    this.shouldSpawn = true;
  }

  stopSpawning() {
    this.shouldSpawn = false;
  }
}

export default EnemySpawner;