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

    this.strength = 90;

    // This is so the AI can move away from being stuck on things if they aren't moving
    this.xBias = ['up', 'down'][Math.floor(Math.random() * 2)];
    this.yBias = ['left', 'right'][Math.floor(Math.random() * 2)];
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