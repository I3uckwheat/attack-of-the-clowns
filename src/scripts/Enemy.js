import Character from "./Character";

class Enemy extends Character {
  constructor(x, y) {
    super('clown');

    this.x = x;
    this.y = y;
    this.footHeight = 38;
    this.speed = 2;
    this.directionBias;

    this.preparingToAttack = false;
    this.preparingToAttackTimeout = null;

    this.strength = Math.floor(Math.random() * 20) + 28;
  }

  attack(player) {
    if (!this.preparingToAttack) {
      this.preparingToAttack = true;

      // Time before attack
      const randomAttackTime = Math.floor(Math.random() * Math.floor(900)) + 200;

      this.preparingToAttackTimeout = setTimeout(() => {
        this.preparingToAttack = false;
        super.attack([player]);
      }, randomAttackTime);
    }
  }

  resetAttack() {
    clearTimeout(this.preparingToAttackTimeout);
    this.preparingToAttackTimeout = null;
    this.preparingToAttack = null;
  }

  takeHit(damage) {
    // enemy can't attack or move while being hurt
    this.resetAttack();

    if (this.speed > 0) {
      const oldSpeed = this.speed;
      this.speed = 0;
      setTimeout(() => {
        this.speed = oldSpeed;
      }, 800)
    }
    return super.takeHit(damage);
  }
}

export default Enemy;