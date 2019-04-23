import Character from "./Character";

class Enemy extends Character {
  constructor(gameField, position) {
    super(gameField, 'clown');

    this.x = position.x;
    this.y = position.y;
    this.speed = 2.8;
  }
}

export default Enemy;