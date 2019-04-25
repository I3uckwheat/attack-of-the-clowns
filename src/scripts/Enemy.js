import Character from "./Character";

class Enemy extends Character {
  constructor(position) {
    super('clown');

    this.x = position.x;
    this.y = position.y;
    this.footHeight = 38;
    this.speed = 2;
  }

  attack(player) {
    super(player);
    if (!enemy.attackCoolingDown) {
      const randomAttackTime = Math.floor(Math.random() * Math.floor(10000));
      setTimeout(() => {
        enemy.attack(player);
      }, randomAttackTime);
    }
  }
}

export default Enemy;
