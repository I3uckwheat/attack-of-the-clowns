import Entity from "./Entity";

const left = -900;
const width = 2800;

const top = 297;
const height = 760;

const amountOfObjects = 20;

const levelObjects = [];

// Left and right walls
levelObjects.push(new Entity(left, top, 13, height, 'barrier'))
levelObjects.push(new Entity(left + width, top, 13, height, 'barrier'))


for(let i = 0; i < amountOfObjects; i++) {
  const x = Math.floor(Math.random() * (left - width - 80)) + width - 80;
  const y = Math.floor(Math.random() * (top - height)) + height;

  levelObjects.push(new Entity(x, y, 67, 50, 'box'));
}

export default levelObjects;