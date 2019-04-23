import Enemy from "./Enemy";

class EnemyController {
  constructor(gameField, world) {
    this.gameField = gameField;
    this.world = world;

    this.enemies = [];
  }

  update(player) {
    this.enemies.forEach(enemy => {
      const xDistance = (player.x + (player.width / 2)) - (enemy.x + (enemy.width / 2));
      const yDistance = (player.y + (player.height / 2)) - (enemy.y + (enemy.height / 2));

      if (xDistance < -player.width) enemy.move('left');
      if (xDistance > player.width) enemy.move('right');
      if (yDistance < 0 && yDistance < -3) enemy.move('up');
      if (yDistance > 0 && yDistance > 3) enemy.move('down');
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
