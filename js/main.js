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

/***/ "./ts/Game.ts":
/*!********************!*\
  !*** ./ts/Game.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nclass Game {\n    canvas;\n    ctx;\n    skybg;\n    positionBg;\n    speedBg;\n    constructor(positionBg = 0, speedBg = 1) {\n        this.canvas = document.getElementById(\"canvas\");\n        const context = this.canvas.getContext(\"2d\");\n        if (!context) {\n            throw new Error(\"2D Context is not supported!\");\n        }\n        this.ctx = context;\n        this.skybg = new Image();\n        this.skybg.src = \"img/background.jpg\";\n        this.skybg.onload = () => {\n            this.init();\n        };\n        this.positionBg = positionBg;\n        this.speedBg = speedBg;\n    }\n    init() {\n        this.startAnimation();\n    }\n    update() { }\n    render() {\n        this.backgroundRun();\n    }\n    backgroundRun() {\n        this.ctx.drawImage(this.skybg, 0, this.positionBg, this.canvas.width, this.canvas.height);\n        this.ctx.drawImage(this.skybg, 0, this.positionBg - this.canvas.height, this.canvas.width, this.canvas.height);\n        this.positionBg += this.speedBg;\n        if (this.positionBg >= this.canvas.height) {\n            this.positionBg = 0;\n        }\n    }\n    startAnimation() {\n        const animate = () => {\n            this.update();\n            this.render();\n            this.requestAnimationFrameForAll(animate);\n        };\n        animate();\n    }\n    requestAnimationFrameForAll(callback) {\n        window.requestAnimationFrame(callback);\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///./ts/Game.ts?");

/***/ }),

/***/ "./ts/main.ts":
/*!********************!*\
  !*** ./ts/main.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Game_1 = __webpack_require__(/*! ./Game */ \"./ts/Game.ts\");\nconst gameInstance = new Game_1.Game();\ngameInstance.startAnimation();\n\n\n//# sourceURL=webpack:///./ts/main.ts?");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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