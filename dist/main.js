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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/World */ "./src/scripts/World.js");
/* harmony import */ var _scripts_Controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/Controls */ "./src/scripts/Controls.js");
/* harmony import */ var _scripts_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/Player */ "./src/scripts/Player.js");
/* harmony import */ var _scripts_EnemyController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/EnemyController */ "./src/scripts/EnemyController.js");
/* harmony import */ var _scripts_Background__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/Background */ "./src/scripts/Background.js");







const gameField = document.querySelector('#game');
 
// Globals
let player;
let world;
let controls;
let enemyController;

function initialize() {
  player = new _scripts_Player__WEBPACK_IMPORTED_MODULE_2__["default"](gameField);

  world = new _scripts_World__WEBPACK_IMPORTED_MODULE_0__["default"](gameField);
  world.registerStatic({
    cssClass: 'box',
    x: 600,
    y: 450,
    width: 67,
    height: 50,
  });

  enemyController = new _scripts_EnemyController__WEBPACK_IMPORTED_MODULE_3__["default"](gameField, world);
  enemyController.spawnEnemy();

  controls = new _scripts_Controls__WEBPACK_IMPORTED_MODULE_1__["default"]({KeyW: 'up', KeyA: 'left', KeyS: 'down', KeyD: 'right', Space: 'attack'});
  controls.addEvent('keyup', 'KeyA', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyD', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyW', () => player.endAnimations('walking'));
  controls.addEvent('keyup', 'KeyS', () => player.endAnimations('walking'));

  requestAnimationFrame(tick);
}

function update() {
  enemyController.update();

  // update player
  if (controls.isPressed('right')) {
    player.startAnimations('walking', 'facing-left');

    // stop on right edge of world 
    if (player.x + player.width < world.width - 150) {
      player.move('right');
    } else {
      world.update(-.1);
      
      _scripts_Background__WEBPACK_IMPORTED_MODULE_4__["default"].left();
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('right');
    }
  }  
  if (controls.isPressed('left')) {
    player.startAnimations('walking');
    player.endAnimations('facing-left');

    // stop on left edge of world 
    if (player.x > 0 + 150) {
      player.move('left');
    } else {
      world.update(.1);
      _scripts_Background__WEBPACK_IMPORTED_MODULE_4__["default"].right();
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('left');
    }
  }
  if (controls.isPressed('up')) {
    player.startAnimations('walking');

    if (player.y > world.vTravelHeight) {
      player.move('up');
    }

    while (world.anyCollisionsWith(player)) {
      player.unCollide('up');
    }
  }
  if (controls.isPressed('down')) {
    player.startAnimations('walking');

    if (player.y + player.height < world.height) {
      player.move('down');
    }
    while (world.anyCollisionsWith(player)) {
      player.unCollide('down');
    }
  }

  if(controls.isPressed('attack')) {
    player.attack();
  }
}

function draw() {
  player.draw();
  _scripts_Background__WEBPACK_IMPORTED_MODULE_4__["default"].draw();
  world.draw();
  enemyController.draw();
}

function tick(){
  update();
  draw();
  requestAnimationFrame(tick);
}

initialize();


/***/ }),

/***/ "./src/scripts/Background.js":
/*!***********************************!*\
  !*** ./src/scripts/Background.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (background);

/***/ }),

/***/ "./src/scripts/Character.js":
/*!**********************************!*\
  !*** ./src/scripts/Character.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Player {
  constructor(gameField, spriteClass) {
    this.element = document.createElement('div');
    this.element.classList.add(spriteClass);
    gameField.appendChild(this.element);

    this.x = 100;
    this.y = 400;
    this.width = 110;
    this.height = 200;
    this.feet = { height: 25, width: 90 };
    this.speed = 9;
    this.direction = 'right';

    this.weapon = 'fist';
    this.attackCoolingDown = false;
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.zIndex = this.y;
  }

  move(direction) {
    this.moveCharacter(direction, this.speed);
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

  // move the character opposite the detected collision
  unCollide(collisionDirection) {
    this.moveCharacter(collisionDirection, -1);
  }

  moveCharacter(direction, speed) {
    switch(direction) {
      case "right":
        this.x += speed;
        this.direction = 'right';
        break;
      case "left":
        this.x -= speed;
        this.direction = 'left';
        break;
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
      default:
        throw "You must pass a direction";
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./src/scripts/Controls.js":
/*!*********************************!*\
  !*** ./src/scripts/Controls.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Controls {
  constructor(controls) {
    this.controls = controls;

    this.controlState = Object.values(this.controls).reduce((acc, controlName) => {
      acc[controlName] = 0;
      return acc;
    }, {undefined: 0});

    this.controlEvents = {
      keyup: {},
      keydown: {}
    }

    // Add event listeners for keys
    document.addEventListener('keydown', event => {
      this.controlState[this.controls[event.code]] = 1;
      if (this.controlEvents.keydown[event.code]) {
        this.controlEvents.keydown[event.code].forEach(cb => cb());
      }
    });

    document.addEventListener('keyup', event => {
      this.controlState[this.controls[event.code]] = 0;
      if (this.controlEvents.keyup[event.code]) {
        this.controlEvents.keyup[event.code].forEach(cb => cb());
      }
    });
  }

  isPressed(control) {
    return this.controlState[control];
  }

  addEvent(keyDirection, keyCode, cb) {
    // Set up array of callbacks if it doesn't exist
    if (!this.controlEvents[keyDirection][keyCode]) {
      this.controlEvents[keyDirection][keyCode] = [cb];
    } else {
      this.controlEvents[keyDirection][keyCode].push(cb);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Controls);


/***/ }),

/***/ "./src/scripts/Enemy.js":
/*!******************************!*\
  !*** ./src/scripts/Enemy.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ "./src/scripts/Character.js");


class Enemy extends _Character__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(gameField, position) {
    super(gameField, 'player');

    this.x = position.x;
    this.y = position.y;
    this.speed = 2.8;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Enemy);


/***/ }),

/***/ "./src/scripts/EnemyController.js":
/*!****************************************!*\
  !*** ./src/scripts/EnemyController.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enemy */ "./src/scripts/Enemy.js");


class EnemyController {
  constructor(gameField, world) {
    this.gameField = gameField;
    this.world = world;

    this.enemies = [];
  }

  update() {
    this.enemies.forEach(enemy => {
      enemy.startAnimations('walking', 'facing-right');
      enemy.move('left');
    });
  }

  draw() {
    this.enemies.forEach(enemy => {
      enemy.draw();
    });
  }

  spawnEnemy() {
    const enemy = new _Enemy__WEBPACK_IMPORTED_MODULE_0__["default"](this.gameField, {x: 700, y: 200});
    this.enemies.push(enemy);
    this.world.registerDynamic(enemy);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (EnemyController);


/***/ }),

/***/ "./src/scripts/Player.js":
/*!*******************************!*\
  !*** ./src/scripts/Player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ "./src/scripts/Character.js");


class Player extends _Character__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(gameField) {
    super(gameField, 'player');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./src/scripts/World.js":
/*!******************************!*\
  !*** ./src/scripts/World.js ***!
  \******************************/
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
      object.element.style.left = object.x + 'px';
      object.element.style.top = object.y + 'px';
    });
  }

  // Register an object to be tracked by the world
  registerStatic(object) {
    object.element = document.createElement('div');
    object.element.classList.add(object.cssClass);
    this.gameField.appendChild(object.element);
    this.playFieldObjects.push(object);
  }

  registerDynamic(object) {
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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map