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

/***/ "./src/generateField.js":
/*!******************************!*\
  !*** ./src/generateField.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return generateField; });\nfunction generateField() {\r\n\tconst field = [ \r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0],\r\n\t\t[0,0,0,0,0,0,0,0,0,0]\r\n\t];\r\n\r\n\t//генерация случайного числа от 0 до index\r\n\tfunction generateRandomNumber(index) {\r\n\t\treturn Math.floor(Math.random()*(index + 1));\r\n\t}\r\n\t//генерация числа, отвечающего за направление корабля: 0 - по горизонтали, 1 - по вертикали\r\n\tfunction generateDirection() {\r\n\t\treturn generateRandomNumber(1);\r\n\t}\r\n\t//генерация начальной координаты field[row][column]\r\n\tfunction generateOriginCoordinate(direction, shipLength) {\r\n\t\tlet maxColumn = field[0].length - 1,\r\n\t\t\tmaxRow = field.length - 1;\r\n\t\tif (direction === 0) { //по горизонтали\r\n\t\t\tmaxColumn = field[0].length - shipLength;\r\n\t\t} else { //по вертикали\r\n\t\t\tmaxRow = field.length - shipLength;\r\n\t\t}\r\n\t\tconst row = generateRandomNumber(maxRow),\r\n\t\t\tcolumn = generateRandomNumber(maxColumn);\r\n\t\treturn [row, column]\r\n\t}\r\n\t//получение направление расположения корабля и начальной координаты\r\n\tfunction getInitialShipPosition(shipLength) {\r\n\t\tconst direction = generateDirection(),\r\n\t\t\t[row, column] = generateOriginCoordinate(direction, shipLength);\r\n\t\treturn [direction, row, column];\r\n\t}\r\n\t//проверка возможности размещения корабля с полученными координатами и направлением\r\n\tfunction checkShipPosition(position, shipLength) {\r\n\t\tconst [direction, row, column] = position;\r\n\t\tfor (let i = 0; i < shipLength; i++) {\r\n\t\t\tif (direction === 0 && field[row][column + i] !== 0) return false;\r\n\t\t\tif (direction === 1 && field[row + i][column] !== 0) return false; \r\n\t\t}\r\n\t\treturn true;\r\n\t}\r\n\t//добавение корабля на поле\r\n\tfunction addShipToField(position, shipLength) {\r\n\t\tconst [direction, row, column] = position;\r\n\t\tfor (let i = 0; i < shipLength; i++) {\r\n\t\t\tif (direction === 0) field[row][column + i] = shipLength\r\n\t\t\telse field[row + i][column] = shipLength;\r\n\t\t}\r\n\t}\r\n\t//размещение кораблей на поле\r\n\tfunction arrangeShips() {\r\n\t\t//const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];\r\n\t\tconst ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];\r\n\t\tfor (let ship of ships) {\r\n\t\t\tlet checkedPosition = false,\r\n\t\t\t\tposition = [];\r\n\t\t\twhile (!checkedPosition) {\r\n\t\t\t\tposition = getInitialShipPosition(ship);\r\n\t\t\t\tcheckedPosition = checkShipPosition(position, ship);\r\n\t\t\t}\r\n\t\t\taddShipToField(position, ship);\r\n\t\t}\r\n\t}\r\n\treturn field;\r\n}\n\n//# sourceURL=webpack:///./src/generateField.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _generateField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generateField */ \"./src/generateField.js\");\n\r\n\r\nconst field = Object(_generateField__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\nconsole.log(field);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });