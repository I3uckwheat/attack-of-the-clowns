import Entity from "./Entity";

class Character extends Entity{
  constructor(spriteClass) {
    super(300, 400, 55, 136, spriteClass);

    this.spriteOffsetX = 72;
    this.spriteOffsetY = 64;

    this.speed = 9;

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
