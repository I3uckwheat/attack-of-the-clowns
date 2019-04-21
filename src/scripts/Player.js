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
    this.speed = 9;
    this.direction = 'right';

    this.weapon = 'fist';
    this.attackCoolingDown = false;
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  move(direction) {
    this.moveCharacter(direction, this.speed);
  }

  attack() {
    if (!this.attackCoolingDown) {
        this.startAnimations('punch');

      this.attackCoolingDown = true;
      setTimeout(() => {
        this.attackCoolingDown = false
        this.endAnimations('punch');
      }, 800);
    }
  }

  startAnimations(...classes) {
    this.element.classList.add(...classes);
  }

  endAnimations(...classes) {
    this.element.classList.remove(...classes);
  }

  // move the character opposite the detected collision
  unCollide(collisionDirection) {
    this.moveCharacter(collisionDirection, -1);
  }

  moveCharacter(direction, speed) {
    switch(direction) {
      case "right":
        this.x += speed;
        this.direction = 'right';
        break;
      case "left":
        this.x -= speed;
        this.direction = 'left';
        break;
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
      default:
        throw "You must pass a direction";
    }
  }
}

export default Player;
