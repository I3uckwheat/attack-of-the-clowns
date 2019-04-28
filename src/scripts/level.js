import Entity from "./Entity";

const left = -900;
const width = 2800;

const top = 296;
const height = 650;

const amountOfObjects = 15;

const levelObjects = [];

// Left and right walls
levelObjects.push(new Entity(left, top - 9, 13, height, 'barrier'))
levelObjects.push(new Entity(left + width, top - 9, 13, height, 'barrier'))


for(let i = 0; i < amountOfObjects; i++) {
  const x = Math.floor(Math.random() * (left + 2000 - width - 1000)) + width - 1000;
  const y = Math.floor(Math.random() * (top - height)) + height;

  levelObjects.push(new Entity(x, y, 67, 50, 'box'));
}

export default levelObjects;