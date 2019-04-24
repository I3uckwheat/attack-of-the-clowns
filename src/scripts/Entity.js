class Entity {
  constructor(x, y, width, height, spriteSheetClass) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;

    this.element = document.createElement('div');
    this.element.classList.add(spriteSheetClass);
    this.element.style.left = this.x;
    this.element.style.top = this.y;

    if (process.env.DEVELOPMENT || true) {
      this.hitbox = document.createElement('div');
      this.hitbox.style = `position: absolute; border: 1px solid blue; width: ${this.width}px; height: ${this.height}px`;
    }
  }

  get midX() {
    return this.x + this.width / 2;
  }

  get midY() {
    return this.y + this.height / 2;
  }

  get halfHeight() {
    return this.height / 2;
  }

  get halfWidth() {
    return this.width / 2;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width
  }

  get top() {
    return this.x;
  }

  get bottom() {
    return this.y + this.height;
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';

    if (process.env.DEVELOPMENT || true) {
      this.hitbox.style.left = this.x + 'px';
      this.hitbox.style.top = this.y + 'px';
    }
  }
}

export default Entity;