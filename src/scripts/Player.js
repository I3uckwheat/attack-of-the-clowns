import Character from "./Character";

class Player extends Character {
  constructor() {
    super('player');
    this.onDeathCallbacks = [];
    this.onHitCallbacks = [];
    this.healDelayIterations = 0;

    this.attackCooldown = 100;

    setInterval(() => {
      if(this.health < 100 && !this.dead && this.healDelayIterations < 0) {
        (this.health + 5 <= 100) ? this.health += 5 : this.health = 100;
        this.healthChanged();
        (this.strength - 1 >= 0) ? this.strength-- : this.strength = 0;
      }
      this.healDelayIterations--;
    }, 1000)
  }

  die() {
    super.die();
    this.onDeathCallbacks.forEach(cb => cb());
  }

  onDeath(callback) {
    this.onDeathCallbacks.push(callback);
  }

  takeHit(damage) {
    super.takeHit(damage);
    this.healDelayIterations = 3;
    this.healthChanged();
  }

  healthChanged() {
    this.onHitCallbacks.forEach(cb => cb(this.health))
  }

  onHealthChange(callback) {
    this.onHitCallbacks.push(callback);
  }
}

export default Player;
