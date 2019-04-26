import Character from "./Character";

class Enemy extends Character {
  constructor(position) {
    super('clown');

    this.x = position.x;
    this.y = position.y;
    this.footHeight = 38;
    this.speed = 2;

    this.preparingToAttack = false;
    this.preparingToAttackTimeout = null;
  }

  attack(player) {
    if (!this.preparingToAttack) {
      this.preparingToAttack = true;
      
      // Time before attack
      const randomAttackTime = Math.floor(Math.random() * Math.floor(900)) + 200;

      this.preparingToAttackTimeout = setTimeout(() => {
        this.preparingToAttack = false;
        super.attack(player);
      }, randomAttackTime);
    }
  }

  resetAttack() {
    clearTimeout(this.preparingToAttackTimeout);
    this.preparingToAttackTimeout = null;
    this.preparingToAttack = null;
  }

  takeHit(damage) {
    // enemy can't attack while being hurt
    this.resetAttack();
    super.takeHit(damage);
  }
}

export default Enemy;
