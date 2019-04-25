import Entity from "./Entity";

class Character extends Entity{
  constructor(spriteClass) {
    super(300, 400, 55, 136, spriteClass);

    this.spriteOffsetX = 72;
    this.spriteOffsetY = 64;

    this.footHeight = 25;

    this.speed = 9;

    this.weapon = 'fist';
    this.attackCoolingDown = false;
    this.attacking = false;

    this.health = 100;

    if (process.env.DEVELOPMENT || true) {
      this.footbox = document.createElement('div');
      this.footbox.style = `position: absolute; border: 1px solid green; width: ${this.feet.width}px; height: ${this.feet.height}px`;
    }
  }

  get feet() {
    return {
      x: this.x,
      y: this.y + this.height - this.footHeight,
      height: this.footHeight, 
      width: this.width 
    };
  }

  draw() {
    super.draw();
    this.element.style.left = this.x - this.spriteOffsetX + 'px';
    this.element.style.top = this.y - this.spriteOffsetY + 'px';
    this.element.style.zIndex = this.y;

    if (process.env.DEVELOPMENT || true) {
      this.footbox.style = `position: absolute; border: 1px solid green; width: ${this.feet.width}px; height: ${this.feet.height}px`;
      this.footbox.style.left = this.feet.x + 'px';
      this.footbox.style.top = this.feet.y + 'px';
    }
  }

  attack(opponent) {
    if (!this.attackCoolingDown && !this.attacking) {

      // check distances and determine hits
      opponent && opponent.takeHit(10);

      this.attackCoolingDown = true;
      this.attacking = true;

      this.runAnimation('punch', () => {
        this.attacking = false;
        setTimeout(() => {
          this.attackCoolingDown = false;
        }, 700);
      })
    }
  }

  takeHit(damage) {
    this.health -= damage;
    this.runAnimation('takeHit');
  }

  runAnimation(animation, callback) {
    this.startAnimations(animation);

    const animationEndHandler = event => {
      if (event.animationName === animation) {
        callback && callback();
        this.endAnimations(animation);
        this.element.removeEventListener('animationend', animationEndHandler);
      }
    }

    this.element.addEventListener('animationend', animationEndHandler);
  }

  startAnimations(...classes) {
    this.element.classList.add(...classes);
  }

  endAnimations(...classes) {
    this.element.classList.remove(...classes);
  }
}

export default Character;
