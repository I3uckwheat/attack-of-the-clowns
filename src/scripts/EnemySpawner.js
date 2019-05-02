import Enemy from "./Enemy";

class EnemySpawner {
  constructor(game, player, viewWidth, leftBoundary, rightBoundary, topBoundary, bottomBoundary) {
    this.game = game;
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
    this.spawnedEnemies = 0;
    this.spawnAmount = 1;
  }

  spawnQueue() {
    const enemiesToSpawn = this.queue;
    this.spawnedEnemies += this.queue.length;
    this.queue = [];

    return enemiesToSpawn;
  }

  addEnemiesToQueue(amount) {
    for(let i = 0; i < amount; i++) {
      let x;
      let y;
      let enemy;

      do {
        const minX = this.leftBoundary + this.game.xOffset;
        const maxX = this.rightBoundary + this.game.xOffset;

        x = Math.floor(Math.random() * (minX - maxX)) + maxX;
        y = Math.floor(Math.random() * (this.topBoundary - this.bottomBoundary)) + this.bottomBoundary;
        enemy = new Enemy(x, y)
      } while (this.game.hasCollisions(enemy.feet) || this.game.isColliding(this.player.feet, enemy.feet));

      this.queue.push(enemy);
    }
  }

  startSpawnTimeout() {
    return setTimeout(() => {
      if (this.shouldSpawn)  {
        this.spawnAmount += .02;
        this.addEnemiesToQueue(Math.floor(this.spawnAmount));
        this.startSpawnTimeout();
      }
    }, this.nextSpawn);
  }

  startSpawning() {
    this.shouldSpawn = true;
    this.startSpawnTimeout();
  }

  stopSpawning() {
    this.shouldSpawn = false;
  }
}

export default EnemySpawner;