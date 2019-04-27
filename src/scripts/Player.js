import Character from "./Character";

class Player extends Character {
  constructor() {
    super('player');
    this.onDeathCallbacks = [];
  }

  die() {
    super.die();
    this.onDeathCallbacks.forEach(cb => cb());
  }

  onDeath(callback) {
    this.onDeathCallbacks.push(callback);
  }
}

export default Player;
