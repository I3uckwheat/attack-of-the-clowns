class Character {
  constructor(spriteClass) {
    this.element = document.createElement('div');
    this.element.classList.add(spriteClass);
    this.element.style.border = "1px solid black";

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
      this.footbox = document.createElement('div');
      this.footbox.style = `position: absolute; border: 1px solid green; width: ${this.feet.width}px; height: ${this.feet.height}px`;

      this.hitbox = document.createElement('div');
      this.hitbox.style = `position: absolute; border: 1px solid blue; width: ${this.width}px; height: ${this.height}px`;
    }
  }

  get feet() {
    return {
      x: this.x,
      y: this.y + this.height - 25,
      height: 25, 
      width: this.width 
    };

  }

  draw() {
    this.element.style.left = this.x - this.spriteOffsetX + 'px';
    this.element.style.top = this.y - this.spriteOffsetY + 'px';
    this.element.style.zIndex = this.y;

    if (process.env.DEVELOPMENT || true) {
      this.footbox.style.left = this.feet.x + 'px';
      this.footbox.style.top = this.feet.y + 'px';

      this.hitbox.style.left = this.x + 'px';
      this.hitbox.style.top = this.y + 'px';
    }
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
}

export default Character;
