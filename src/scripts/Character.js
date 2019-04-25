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

    this.healh = 100;

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
    if (!this.attackCoolingDown) {

      opponent.takeHit(10);

      // this.startAnimations('punch');
      this.attackCoolingDown = true;

      this.runAnimation('punch', () => {
        setTimeout(() => {
          this.attackCoolingDown = false;
        }, 700);
      })
    }
  }

  takeHit(damage) {
    this.runAnimation('takeHit', null, {interrupt: true});
  }

  runAnimation(animation, callback, {interrupt = false} = {}) {
    this.startAnimations(animation);
    if(interrupt) {
      this.element.style.animation = 'none';
      setTimeout(() => {
        this.element.style.animation = '';
      }, 10)
    } else {
      this.element.addEventListener('animationend', event => {
        if (event.animationName === animation) {
          this.endAnimations(animation);
          callback && callback();
        }
      }, {once: true})
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
