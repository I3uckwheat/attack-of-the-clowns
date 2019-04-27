import Character from "./Character";

class Player extends Character {
  constructor() {
    super('player');
    this.onDeathCallbacks = [];
    this.onHitCallbacks = [];
    this.damageCoolingDownIterations = 0;

    setInterval(() => {
      if(this.health < 100 && !this.dead && this.damageCoolingDownIterations <= 0) {
        this.health += 5;
        this.healthChanged();
      }

      if(this.damageCoolingDownIterations > 0) {
        this.damageCoolingDownIterations--;
      }
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
    this.damageCoolingDownIterations = 3;
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
