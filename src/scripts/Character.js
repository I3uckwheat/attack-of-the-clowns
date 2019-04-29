import Entity from "./Entity";

class Character extends Entity {
  constructor(spriteClass) {
    super(450, 400, 55, 136, spriteClass);

    this.spriteOffsetX = 72;
    this.spriteOffsetY = 64;

    this.footHeight = 25;

    this.speed = 9;

    this.weapon = 'fist';
    this.attackCoolingDown = false;
    this.attacking = false;
    this.direction = 'right';

    this.health = 100;
    this.strength = 50;
    this.dead = false;

    this.attackCooldown = 700;

    if (process.env.DEVELOPMENT) {
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

    if (process.env.DEVELOPMENT) {
      this.footbox.style = `position: absolute; border: 1px solid green; width: ${this.feet.width}px; height: ${this.feet.height}px`;
      this.footbox.style.left = this.feet.x + 'px';
      this.footbox.style.top = this.feet.y + 'px';
    }
  }

  attack(opponents, animationClass) {
    let result = {
      hits: 0,
      misses: 0,
      kills: 0
    };

    if (this.dead) return result;

    opponents.forEach(opponent => {
      if (!this.attackCoolingDown && !this.attacking) {

        // check distances and determine hits
        if (opponent) {
          const dx = this.x - opponent.x;
          const dy = this.y - opponent.y;

          if ((Math.abs(dx) < 100 && Math.abs(dy) < 40) &&
            (dx < 0 && this.direction === 'right' || dx > 0 && this.direction === 'left')) {
            if(opponent.takeHit(this.strength) === 'killed') {
              (this.strength + 10 <= 100) ? this.strength += 10 : this.strength = 100;
              result.kills++;
            } else {
              result.hits++;
            }
          } else {
            result.misses++;
          }
        }
      }
    });

    this.attackCoolingDown = true;
    this.attacking = true;

    this.runAnimation(animationClass, () => {
      this.attacking = false;
      setTimeout(() => {
        this.attackCoolingDown = false;
      }, this.attackCooldown);
    });

    return result;
  }

  takeHit(damage) {
    const oldHealth = this.health;
    this.health -= damage;
    if(this.health < 0) this.health = 0;
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
    this.health = 0; // Prevents negative health values
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
