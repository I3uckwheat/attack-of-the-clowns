import Enemy from "./Enemy";

class EnemyController {
  constructor(gameField, world) {
    this.gameField = gameField;
    this.world = world;

    this.enemies = [];
  }

  update() {
    this.enemies.forEach(enemy => {
      enemy.move('left');
    });
  }

  draw() {
    this.enemies.forEach(enemy => {
      enemy.draw();
    });
  }

  spawnEnemy() {
    const enemy = new Enemy(this.gameField, {x: 900, y: 200});
    this.enemies.push(enemy);
    this.world.registerDynamic(enemy);
  }
}

export default EnemyController;
