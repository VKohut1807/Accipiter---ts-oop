/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/BackgroundCanvas.ts":
/*!********************************!*\
  !*** ./ts/BackgroundCanvas.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass BackgroundCanvas {\n    canvas = document.getElementById(\"canvas\");\n    ctx = this.canvas.getContext(\"2d\");\n    skybg = new Image();\n    position = 0;\n    speed = 1;\n    constructor() { }\n    async init() {\n        return new Promise((resolve) => {\n            this.skybg.onload = () => {\n                resolve();\n            };\n            this.skybg.src = \"img/background.jpg\";\n        });\n    }\n    update() {\n        this.position += this.speed;\n        if (this.position >= this.canvas.height) {\n            this.position = 0;\n        }\n    }\n    render() {\n        this.ctx.drawImage(this.skybg, 0, this.position, this.canvas.width, this.canvas.height);\n        this.ctx.drawImage(this.skybg, 0, this.position - this.canvas.height, this.canvas.width, this.canvas.height);\n    }\n    clear() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    }\n}\nexports[\"default\"] = BackgroundCanvas;\n\n\n//# sourceURL=webpack:///./ts/BackgroundCanvas.ts?");

/***/ }),

/***/ "./ts/BaseVehicle.ts":
/*!***************************!*\
  !*** ./ts/BaseVehicle.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass BaseVehicle {\n    canvas;\n    ctx;\n    imgPath;\n    x;\n    y;\n    cx;\n    cy;\n    size;\n    exist;\n    constructor({ ...args }) {\n        this.canvas = args.canvas;\n        this.ctx = args.ctx;\n        this.imgPath = new Image();\n        this.imgPath.src = args.imgPath;\n        this.x = args.x;\n        this.y = args.y;\n        this.cx = args.cx;\n        this.cy = args.cy;\n        this.size = args.size;\n        this.exist = args.exist;\n    }\n    async init() {\n        await new Promise((resolve) => {\n            this.imgPath.onload = resolve;\n        });\n    }\n}\nexports[\"default\"] = BaseVehicle;\n\n\n//# sourceURL=webpack:///./ts/BaseVehicle.ts?");

/***/ }),

/***/ "./ts/Game.ts":
/*!********************!*\
  !*** ./ts/Game.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nconst BackgroundCanvas_1 = __importDefault(__webpack_require__(/*! ./BackgroundCanvas */ \"./ts/BackgroundCanvas.ts\"));\nconst UFO_1 = __importDefault(__webpack_require__(/*! ./UFO */ \"./ts/UFO.ts\"));\nconst Jet_1 = __importDefault(__webpack_require__(/*! ./Jet */ \"./ts/Jet.ts\"));\nconst SpriteAnimation_1 = __importDefault(__webpack_require__(/*! ./SpriteAnimation */ \"./ts/SpriteAnimation.ts\"));\nconst getRandomNumber_1 = __importDefault(__webpack_require__(/*! ./helpers/getRandomNumber */ \"./ts/helpers/getRandomNumber.ts\"));\nclass Game {\n    backgroundCanvas;\n    ufos;\n    jets;\n    explosions = [];\n    explosionSize = 192;\n    isGameOver = false;\n    animationFrameNumber = 0;\n    setAppearanceTimeUFO = 1000;\n    setDelayTimeCanvasClear = 2000;\n    constructor() {\n        this.backgroundCanvas = new BackgroundCanvas_1.default();\n        this.ufos = [];\n        this.jets = [];\n    }\n    async init() {\n        await this.backgroundCanvas.init();\n        this.addInitialJet();\n    }\n    update() {\n        this.backgroundCanvas.update();\n        this.ufos.forEach((ufo) => ufo.update());\n        this.jets.forEach((ufo) => ufo.update());\n        this.handleCollisions();\n        if (this.isGameOver)\n            return;\n    }\n    render() {\n        this.backgroundCanvas.render();\n        this.ufos.forEach((ufo) => ufo.render());\n        this.jets.forEach((ufo) => ufo.render());\n        this.renderExplosions();\n        if (this.isGameOver)\n            return;\n    }\n    startGameLoop() {\n        this.backgroundCanvas.canvas.addEventListener(\"mousemove\", this.onMouseMove.bind(this));\n        const animate = () => {\n            this.update();\n            this.render();\n            this.requestAnimationFrameForAll(animate);\n        };\n        animate();\n        this.addUFOInterval();\n    }\n    onMouseMove(event) {\n        if (this.jets.length <= 0)\n            return;\n        this.jets[0].x = event.offsetX - 25;\n        this.jets[0].y = event.offsetY - 25;\n    }\n    addUFOInterval() {\n        setInterval(() => {\n            if (this.isGameOver)\n                return;\n            this.addUFO();\n        }, this.setAppearanceTimeUFO);\n    }\n    addUFO() {\n        const ufoParams = this.createUFOParams();\n        this.createAndPushUFO(ufoParams);\n    }\n    createUFOParams() {\n        const size = this.ufos.length > 0 ? this.ufos[0].getSize() : 100;\n        return {\n            canvas: this.backgroundCanvas.canvas,\n            ctx: this.backgroundCanvas.ctx,\n            imgPath: \"img/ufo.png\",\n            x: (0, getRandomNumber_1.default)(0 + size / 4, this.backgroundCanvas.canvas.width - size / 4),\n            y: 0 + size / 4,\n            cx: (0, getRandomNumber_1.default)(1, 1),\n            cy: (0, getRandomNumber_1.default)(2, 10),\n            size: size,\n            exist: 0,\n        };\n    }\n    createAndPushUFO(ufoParams) {\n        const newUFO = new UFO_1.default(ufoParams);\n        this.ufos.push(newUFO);\n        newUFO.init();\n    }\n    addInitialJet() {\n        const jetParams = this.createJetParams();\n        this.createAndPushJet(jetParams);\n    }\n    createJetParams() {\n        const size = this.jets.length > 0 ? this.ufos[0].getSize() : 50;\n        return {\n            canvas: this.backgroundCanvas.canvas,\n            ctx: this.backgroundCanvas.ctx,\n            imgPath: \"img/plane.png\",\n            x: size / 2,\n            y: size / 2,\n            cx: size,\n            cy: size,\n            size: size,\n            exist: 0,\n        };\n    }\n    createAndPushJet(jetParams) {\n        const newJet = new Jet_1.default(jetParams);\n        this.jets.push(newJet);\n        newJet.init();\n    }\n    handleCollisions() {\n        for (let jet of this.jets) {\n            for (let ufo of this.ufos) {\n                if (this.isColliding(jet, ufo)) {\n                    const collisionX = (jet.x + ufo.x) / 2 - this.explosionSize / 4;\n                    const collisionY = (jet.y + ufo.y) / 2 - this.explosionSize / 4;\n                    this.createExplosion(collisionX, collisionY);\n                    this.removeJet(jet);\n                    this.removeUFO(ufo);\n                }\n            }\n        }\n    }\n    isColliding(jet, ufo) {\n        const distanceX = jet.x - ufo.x;\n        const distanceY = jet.y - ufo.y;\n        const distance = Math.hypot(distanceX, distanceY);\n        const minDistance = jet.size / 2 + ufo.size / 4;\n        return distance < minDistance;\n    }\n    removeJet(jet) {\n        const index = this.jets.indexOf(jet);\n        if (index !== -1) {\n            this.jets.splice(index, 1);\n            if (this.jets.length <= 0) {\n                this.isGameOver = true;\n                this.endGame();\n            }\n        }\n    }\n    removeUFO(ufo) {\n        const index = this.ufos.indexOf(ufo);\n        if (index !== -1) {\n            this.ufos.splice(index, 1);\n        }\n    }\n    renderExplosions() {\n        this.explosions.forEach((explosion) => {\n            explosion.renderFrame();\n        });\n    }\n    createExplosion(x, y) {\n        const explosion = new SpriteAnimation_1.default(\"img/explosion.png\", this.explosionSize, this.explosionSize, 5, 6, x, y, this.explosionSize / 2);\n        this.explosions.push(explosion);\n    }\n    endGame() {\n        if (!this.isGameOver && this.animationFrameNumber <= 0)\n            return;\n        setTimeout(() => {\n            window.cancelAnimationFrame(this.animationFrameNumber);\n            this.backgroundCanvas.clear();\n        }, this.setDelayTimeCanvasClear);\n    }\n    requestAnimationFrameForAll(callback) {\n        this.animationFrameNumber = window.requestAnimationFrame(callback);\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///./ts/Game.ts?");

/***/ }),

/***/ "./ts/Jet.ts":
/*!*******************!*\
  !*** ./ts/Jet.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst BaseVehicle_1 = __importDefault(__webpack_require__(/*! ./BaseVehicle */ \"./ts/BaseVehicle.ts\"));\nclass Jet extends BaseVehicle_1.default {\n    img;\n    constructor({ ...args }) {\n        super({ ...args });\n        this.img = new Image();\n        this.img.src = args.imgPath;\n        this.size = args.size;\n    }\n    async init() {\n        await new Promise((resolve) => {\n            this.img.onload = resolve;\n        });\n    }\n    update() { }\n    render() {\n        this.ctx.drawImage(this.imgPath, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);\n    }\n    getSize() {\n        return this.size;\n    }\n}\nexports[\"default\"] = Jet;\n\n\n//# sourceURL=webpack:///./ts/Jet.ts?");

/***/ }),

/***/ "./ts/SpriteAnimation.ts":
/*!*******************************!*\
  !*** ./ts/SpriteAnimation.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst BackgroundCanvas_1 = __importDefault(__webpack_require__(/*! ./BackgroundCanvas */ \"./ts/BackgroundCanvas.ts\"));\nclass SpriteAnimation {\n    backgroundCanvas;\n    image;\n    frameWidth;\n    frameHeight;\n    numFramesX;\n    numFramesY;\n    x;\n    y;\n    explosionSize;\n    currentFrameX = 0;\n    currentFrameY = 0;\n    frameDelay = 100;\n    constructor(imagePath, frameWidth, frameHeight, numFramesX, numFramesY, x, y, explosionSize) {\n        this.backgroundCanvas = new BackgroundCanvas_1.default();\n        this.image = new Image();\n        this.image.src = imagePath;\n        this.frameWidth = frameWidth;\n        this.frameHeight = frameHeight;\n        this.numFramesX = numFramesX;\n        this.numFramesY = numFramesY;\n        this.x = x;\n        this.y = y;\n        this.explosionSize = explosionSize;\n    }\n    renderFrame() {\n        this.backgroundCanvas.ctx.drawImage(this.image, this.currentFrameX * this.frameWidth, this.currentFrameY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.explosionSize, this.explosionSize);\n        this.currentFrameX++;\n        if (this.currentFrameX === this.numFramesX) {\n            this.currentFrameX = 0;\n            this.currentFrameY++;\n        }\n    }\n}\nexports[\"default\"] = SpriteAnimation;\n\n\n//# sourceURL=webpack:///./ts/SpriteAnimation.ts?");

/***/ }),

/***/ "./ts/UFO.ts":
/*!*******************!*\
  !*** ./ts/UFO.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst BaseVehicle_1 = __importDefault(__webpack_require__(/*! ./BaseVehicle */ \"./ts/BaseVehicle.ts\"));\nclass UFO extends BaseVehicle_1.default {\n    img;\n    constructor({ ...args }) {\n        super({ ...args });\n        this.img = new Image();\n        this.img.src = args.imgPath;\n        this.size = args.size;\n    }\n    async init() {\n        await new Promise((resolve) => {\n            this.img.onload = resolve;\n        });\n    }\n    update() {\n        this.x += this.cx;\n        this.y += this.cy;\n        if (this.x >= this.canvas.width - this.size / 4 || this.x <= 0 + this.size / 4) {\n            this.cx = -this.cx;\n        }\n        if (this.y >= this.canvas.height - this.size / 4 || this.y <= 0 + this.size / 4) {\n            this.cy = -this.cy;\n        }\n    }\n    render() {\n        this.ctx.drawImage(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);\n    }\n    getSize() {\n        return this.size;\n    }\n}\nexports[\"default\"] = UFO;\n\n\n//# sourceURL=webpack:///./ts/UFO.ts?");

/***/ }),

/***/ "./ts/helpers/getRandomNumber.ts":
/*!***************************************!*\
  !*** ./ts/helpers/getRandomNumber.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction getRandomNumber(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nexports[\"default\"] = getRandomNumber;\n\n\n//# sourceURL=webpack:///./ts/helpers/getRandomNumber.ts?");

/***/ }),

/***/ "./ts/main.ts":
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Game_1 = __webpack_require__(/*! ./Game */ \"./ts/Game.ts\");\nconst BackgroundCanvas_1 = __importDefault(__webpack_require__(/*! ./BackgroundCanvas */ \"./ts/BackgroundCanvas.ts\"));\nconst backgroundCanvas = new BackgroundCanvas_1.default();\nif (backgroundCanvas.ctx instanceof CanvasRenderingContext2D) {\n    const gameInstance = new Game_1.Game();\n    gameInstance.init().then(() => {\n        gameInstance.startGameLoop();\n    });\n}\nelse {\n    console.error(\"Unable to obtain 2D rendering context!\");\n}\n\n\n//# sourceURL=webpack:///./ts/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/main.ts");
/******/ 	
/******/ })()
;