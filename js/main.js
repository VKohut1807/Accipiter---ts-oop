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

/***/ "./ts/BackgroundСanvas.ts":
/*!********************************!*\
  !*** ./ts/BackgroundСanvas.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BackgroundCanvas = void 0;\nclass BackgroundCanvas {\n    canvas = document.getElementById(\"canvas\");\n    ctx = this.canvas.getContext(\"2d\");\n    skybg;\n    position;\n    speed;\n    constructor() {\n        this.skybg = new Image();\n        this.position = 0;\n        this.speed = 1;\n    }\n    async init() {\n        this.skybg.src = \"img/background.jpg\";\n        await this.skybg.onload;\n    }\n    update() {\n        this.position += this.speed;\n        if (this.position >= this.canvas.height) {\n            this.position = 0;\n        }\n    }\n    render() {\n        this.ctx.drawImage(this.skybg, 0, this.position, this.canvas.width, this.canvas.height);\n        this.ctx.drawImage(this.skybg, 0, this.position - this.canvas.height, this.canvas.width, this.canvas.height);\n    }\n}\nexports.BackgroundCanvas = BackgroundCanvas;\n\n\n//# sourceURL=webpack:///./ts/Background%D0%A1anvas.ts?");

/***/ }),

/***/ "./ts/BaseVehicle.ts":
/*!***************************!*\
  !*** ./ts/BaseVehicle.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BaseVehicle = void 0;\nclass BaseVehicle {\n    canvas;\n    ctx;\n    img;\n    x;\n    y;\n    cx;\n    cy;\n    size;\n    exist;\n    constructor(canvas, ctx, imgPath, x, y, cx, cy, size, exist = 0) {\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.img = new Image();\n        this.img.src = imgPath;\n        this.x = x;\n        this.y = y;\n        this.cx = cx;\n        this.cy = cy;\n        this.size = size;\n        this.exist = exist;\n    }\n    async init() {\n        await new Promise((resolve) => {\n            this.img.onload = resolve;\n        });\n    }\n}\nexports.BaseVehicle = BaseVehicle;\n\n\n//# sourceURL=webpack:///./ts/BaseVehicle.ts?");

/***/ }),

/***/ "./ts/Game.ts":
/*!********************!*\
  !*** ./ts/Game.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nconst Background_anvas_1 = __webpack_require__(/*! ./BackgroundСanvas */ \"./ts/BackgroundСanvas.ts\");\nconst UFO_1 = __webpack_require__(/*! ./UFO */ \"./ts/UFO.ts\");\nconst helpers_1 = __importDefault(__webpack_require__(/*! ./helpers */ \"./ts/helpers.ts\"));\nclass Game {\n    backgroundCanvas;\n    ufos;\n    constructor() {\n        this.backgroundCanvas = new Background_anvas_1.BackgroundCanvas();\n        this.ufos = [];\n    }\n    async init() {\n        await this.backgroundCanvas.init();\n        this.addUFO();\n    }\n    update() {\n        this.backgroundCanvas.update();\n        this.ufos.forEach((ufo) => ufo.update());\n    }\n    render() {\n        this.backgroundCanvas.render();\n        this.ufos.forEach((ufo) => ufo.render());\n    }\n    runGameLoop() {\n        const animate = () => {\n            this.update();\n            this.render();\n            this.requestAnimationFrameForAll(animate);\n        };\n        animate();\n        setInterval(() => {\n            this.addUFO();\n        }, 2000);\n    }\n    addUFO() {\n        const canvas = this.backgroundCanvas.canvas;\n        const ctx = this.backgroundCanvas.ctx;\n        const imgPath = \"img/ufo.png\";\n        const size = this.ufos.length > 0 ? this.ufos[0].getSize() : 100;\n        const x = (0, helpers_1.default)(0 + size / 4, canvas.width - size / 4);\n        const y = 0 + size / 4;\n        const cx = (0, helpers_1.default)(1, 1);\n        const cy = (0, helpers_1.default)(2, 10);\n        const exist = 0;\n        const newUFO = new UFO_1.UFO(canvas, ctx, imgPath, x, y, cx, cy, size, exist);\n        this.ufos.push(newUFO);\n        newUFO.init();\n    }\n    requestAnimationFrameForAll(callback) {\n        window.requestAnimationFrame(callback);\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///./ts/Game.ts?");

/***/ }),

/***/ "./ts/UFO.ts":
/*!*******************!*\
  !*** ./ts/UFO.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UFO = void 0;\nconst BaseVehicle_1 = __webpack_require__(/*! ./BaseVehicle */ \"./ts/BaseVehicle.ts\");\nclass UFO extends BaseVehicle_1.BaseVehicle {\n    canvas;\n    ctx;\n    imgPath;\n    x;\n    y;\n    cx;\n    cy;\n    size;\n    exist;\n    img;\n    constructor(canvas, ctx, imgPath, x, y, cx, cy, size, exist) {\n        super(canvas, ctx, imgPath, x, y, cx, cy, size, exist);\n        this.canvas = canvas;\n        this.ctx = ctx;\n        this.imgPath = imgPath;\n        this.x = x;\n        this.y = y;\n        this.cx = cx;\n        this.cy = cy;\n        this.size = size;\n        this.exist = exist;\n        this.img = new Image();\n        this.size = size;\n    }\n    async init() {\n        this.img.src = this.imgPath;\n        await new Promise((resolve) => {\n            this.img.onload = resolve;\n        });\n    }\n    update() {\n        this.x += this.cx;\n        this.y += this.cy;\n        if (this.x >= this.canvas.width - this.size / 4 || this.x <= 0 + this.size / 4) {\n            this.cx = -this.cx;\n        }\n        if (this.y >= this.canvas.height - this.size / 4 || this.y <= 0 + this.size / 4) {\n            this.cy = -this.cy;\n        }\n    }\n    render() {\n        this.ctx.drawImage(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);\n    }\n    getSize() {\n        return this.size;\n    }\n}\nexports.UFO = UFO;\n\n\n//# sourceURL=webpack:///./ts/UFO.ts?");

/***/ }),

/***/ "./ts/helpers.ts":
/*!***********************!*\
  !*** ./ts/helpers.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nfunction getRandomNumber(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nexports[\"default\"] = getRandomNumber;\n\n\n//# sourceURL=webpack:///./ts/helpers.ts?");

/***/ }),

/***/ "./ts/main.ts":
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Game_1 = __webpack_require__(/*! ./Game */ \"./ts/Game.ts\");\nconst Background_anvas_1 = __webpack_require__(/*! ./BackgroundСanvas */ \"./ts/BackgroundСanvas.ts\");\nconst backgroundCanvas = new Background_anvas_1.BackgroundCanvas();\nif (backgroundCanvas.ctx instanceof CanvasRenderingContext2D) {\n    const gameInstance = new Game_1.Game();\n    gameInstance.init().then(() => {\n        gameInstance.runGameLoop();\n    });\n}\nelse {\n    console.error(\"Unable to obtain 2D rendering context!\");\n}\n\n\n//# sourceURL=webpack:///./ts/main.ts?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/main.ts");
/******/ 	
/******/ })()
;