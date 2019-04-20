class Player {
  constructor(gameField) {
    this.element = document.createElement('div');
    this.element.classList.add('player');
    gameField.appendChild(this.element);

    this.x = 100;
    this.y = 400;
    this.width = 110;
    this.height = 200;
    this.feet = { height: 25, width: 90 };
  }
}

export default Player;