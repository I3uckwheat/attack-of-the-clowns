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
    this.direction = 'right';

    this.health = 100;
    this.strength = 90;
    this.dead = false;

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
    let result = 'miss';
    if (!this.attackCoolingDown && !this.attacking) {

      // check distances and determine hits
      if(opponent) {
        const dx = this.x - opponent.x;
        const dy = this.y - opponent.y;

        if ((Math.abs(dx) < 100 && Math.abs(dy) < 40) &&
          (dx < 0 && this.direction === 'right' || dx > 0 && this.direction === 'left')) {
            result = opponent.takeHit(this.strength);
        }
      }

      this.attackCoolingDown = true;
      this.attacking = true;

      this.runAnimation('punch', () => {
        this.attacking = false;
        setTimeout(() => {
          this.attackCoolingDown = false;
        }, 700);
      })
    }

    return result;
  }

  takeHit(damage) {
    const oldHealth = this.health;
    this.health -= damage;
    if (oldHealth > 0 && this.health <= 0) {
      this.die();
      return 'killed';
    } else {
      this.runAnimation('takeHit');
      return 'hit';
    }
  }

  die() {
    this.dead = true;
    this.health = 0;  // Prevents negative health values
    this.endAnimations('takeHit', 'punch');
    this.startAnimations('fall');
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
