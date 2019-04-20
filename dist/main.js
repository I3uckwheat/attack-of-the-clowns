/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/World.js":
/*!**********************!*\
  !*** ./src/World.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class World {
  constructor(gameField) {
    this.width = 1300;
    this.height = 700;

    // the second number is the amount of walkable height from the bottom of the playArea
    this.vTravelHeight = this.height - 500; 

    // Sets up gamefield 
    this.gameField = gameField;
    this.gameField.style.height = this.height + 'px';
    this.gameField.style.width =  this.width + 'px';

    this.playFieldObjects = [];
  }

  update(speed) {
    this.playFieldObjects.forEach(object => {
      object.x += speed * 50;
    });
  }

  draw() {
    this.playFieldObjects.forEach(object => {
      object.element.classList.add(object.cssClass);
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
      object.element.style.height = object.height + 'px';
      object.element.style.width = object.width + 'px';
    });
  }

  // Register an object to be tracked by the world
  register(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.element.cssClass);
    this.gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }

  anyCollisionsWith(entity) {
    return this.playFieldObjects.some(playFieldObject => {
      return this.isCollidingWithFeet(playFieldObject, entity);
    });
  }

  isCollidingWithFeet(rect1, rect2) {
    const feetPosition = {
      x: rect2.x,
      y: rect2.y + rect2.height - rect2.feet.height,
      height: rect2.feet.height,
      width: rect2.width,
    }

    return this.isColliding(rect1, feetPosition)
  }

  isColliding(rect1, rect2) {
    return (
      rect1.x > rect2.x &&                
      rect1.x < rect2.x + rect2.width &&  
      rect1.y + rect1.height > rect2.y &&                
      rect1.y < rect2.y + rect2.height    
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (World);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./World */ "./src/World.js");


const gameField = document.querySelector('#game');

const world = new _World__WEBPACK_IMPORTED_MODULE_0__["default"](gameField);

const background = {
  layers: {
    ring: {
      element: document.getElementById('ring'),
      position: 0,
      speed: 5,
      reset: 520,
    },
  }, 
  right: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position + layer.speed) % layer.reset;   
    });
  },
  left: function() {
    Object.values(this.layers).forEach(layer => {
      layer.position = (layer.position - layer.speed) % layer.reset;   
    });
  },
  draw: function() {
    this.layers.ring.element.style.backgroundPositionX = this.layers.ring.position + 'px';
  }
}

const player = {
  x: 100,
  y: 400,
  width: 110,
  height: 200,
  feet: {height: 25, width: 90},
  element: document.createElement('div'),
};

let left = 0;
let right = 0;
let up = 0;
let down = 0;

function initalize() {
  // sets up player
  player.element.classList.add('player');

  gameField.appendChild(player.element);
  
  world.register({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 67,
    height: 50,
  });
  
  // sets up movement
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      left = 1;
    }
    if (event.code === 'KeyA') {
      right = 1;
    }
    if (event.code === 'KeyW') {
      up = 1;
    }
    if (event.code === 'KeyS') {
      down = 1;
    }
    if (event.code === 'Space') {
    }
  });

  document.addEventListener('keyup', event => {
    if (event.code === 'KeyD') {
      left = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'KeyA') {
      right = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'KeyW') {
      up = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'KeyS') {
      down = 0;
      player.element.classList.remove('walking')
    }
    if (event.code === 'Space') {
    }
  });
}

function update() {
  // update player
  if (left === 1) {
    player.element.classList.add('walking', 'facing-left')
    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.x += 9;
    } else {
      world.update(-.1);
      background.left();
    }

    while (world.anyCollisionsWith(player)) {
      player.x -=1;
    }
  }  
  if (right === 1) {
    player.element.classList.add('walking')
    player.element.classList.remove('facing-left')

    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.x -= 9;
    } else {
      world.update(.1);
      background.right();
    }

    while (world.anyCollisionsWith(player)) {
      player.x +=1;
    }
  }
  if (up === 1) {
    player.element.classList.add('walking')

    if (player.y > world.vTravelHeight) {
      player.y -= 9;
    }

    while (world.anyCollisionsWith(player)) {
      player.y += 1;
    }
  }
  if (down === 1) {
    player.element.classList.add('walking')

    if (player.y + player.height < world.height) {
      player.y += 9;
    }
    while (world.anyCollisionsWith(player)) {
      player.y -= 1;
    }
  }
}

function draw() {
  player.element.style.left = player.x + 'px';
  player.element.style.top = player.y + 'px';

  background.draw();
  world.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initalize();
requestAnimationFrame(tick);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map