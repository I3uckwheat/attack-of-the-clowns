import Character from "./Character";

class Enemy extends Character {
  constructor(position) {
    super('clown');

    this.x = position.x;
    this.y = position.y;
    this.footHeight = 38;
    this.speed = 2.8;
  }
}

export default Enemy;
