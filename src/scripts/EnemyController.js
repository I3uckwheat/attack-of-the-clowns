import Enemy from "./Enemy";

class EnemyController {
  constructor(gameField, world) {
    this.gameField = gameField;
    this.world = world;

    this.enemies = [];
  }

  update(player) {
    this.enemies.forEach(enemy => {
      const xDistance = player.x - enemy.x;
      const yDistance = player.y - enemy.y;

      if (xDistance < -3 && xDistance < 0) enemy.move('left');
      if (xDistance > 3 && xDistance > 0) enemy.move('right');
      if (yDistance < -3 && yDistance < 0) enemy.move('up');
      if (yDistance > 3 && yDistance > 0) enemy.move('down');
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
