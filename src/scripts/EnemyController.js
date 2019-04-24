import Enemy from "./Enemy";

class EnemyController {
  constructor(gameField, world) {
    this.gameField = gameField;
    this.world = world;

    this.enemies = [];
  }

  update(player) {
    this.enemies.forEach(enemy => {
    });
  }

  draw() {
    this.enemies.forEach(enemy => {
      enemy.draw();
    });
  }

  spawnEnemy() {
    const enemy = new Enemy(this.gameField, {x: 700, y: 300});
    this.enemies.push(enemy);
    this.world.registerDynamic(enemy);
  }
}

export default EnemyController;
