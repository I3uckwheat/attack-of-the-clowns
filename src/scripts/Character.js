class Player {
  constructor(gameField, spriteClass) {
    this.element = document.createElement('div');
    this.element.classList.add(spriteClass);
    this.element.style.border = "1px solid black";
    gameField.appendChild(this.element);

    this.x = 0;
    this.y = 400;
    this.spriteOffsetX = 72;
    this.spriteOffsetY = 64;

    this.width = 55;
    this.height = 136;
    this.speed = 9;
    this.direction = 'right';

    this.weapon = 'fist';
    this.attackCoolingDown = false;

    if (process.env.DEVELOPMENT || true) {
      this.hitbox = document.createElement('div');
      this.hitbox.style = `position: absolute; border: 1px solid blue; width: ${this.width}px; height: ${this.height}px`;
      gameField.appendChild(this.hitbox);
    }
  }

  get feet() {
    return {
      x: this.x,
      y: this.y + this.height - 20,
      height: 25, 
      width: this.width 
    };

  }

  draw() {
    this.element.style.left = this.x - this.spriteOffsetX + 'px';
    this.element.style.top = this.y - this.spriteOffsetY + 'px';
    this.element.style.zIndex = this.y;

    if (process.env.DEVELOPMENT || true) {
      this.hitbox.style.left = this.x + 'px';
      this.hitbox.style.top = this.y + 'px';
    }
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
