import Character from "./Character";

class Player extends Character {
  constructor(gameField) {
    super(gameField, 'player');
  }
}

export default Player;
