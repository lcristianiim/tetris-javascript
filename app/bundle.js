(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const
    initTetris = require('../lib/init-tetris'),
    shape = require('../lib/tetris-shapes'),
    check = require('../lib/check.js'),
    helper = require('../lib/helper');

var grid = {
    rows: 20,
    columns: 10
}
var piece;
var colors = ['orange', 'cyan', 'brown', 'yellow', 'magenta', 'lime'];
var color = '';

// Initialize tetris grid
initTetris.init(grid, 'tetris-container');

getPiece();
console.log(piece.name);

function getPiece() {
    color = colors[Math.floor(Math.random()*colors.length)];

    // Initialize random piece
    piece = helper.getRandomKeyFromObject(shape);

    // Initialize random shape as currentShape
    piece.init(grid, color);
}


// var point1 = { x: point.x - 1, y: point.y - 1 }
// var point2 = { x: point.x - 1, y: point.y }
// var point3 = { x: point.x - 1, y: point.y + 1 }
//
// var point4 = { x: point.x, y: point.y - 1 }
// var point5 = { x: point.x, y: point.y }
// var point6 = { x: point.x, y: point.y + 1 }
//
// var point7 = { x: point.x + 1, y: point.y - 1 }
// var point8 = { x: point.x + 1, y: point.y}
// var point9 = { x: point.x + 1, y: point.y + 1}
//
// var shadowPoints = [point1, point2, point3, point4, point5, point6, point7, point8, point9]

// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        piece.rotate();
        piece.drawShape();
    }

    // down key
    if (event.keyCode == 40) {
        if (!check.down(piece)) {

            piece.moveDown();
            piece.drawShape();

        } else {
            getPiece()
        }

    }

    // left key
    if (event.keyCode == 37) {
        if (!check.left(piece)) {
            piece.moveLeft();
            piece.drawShape();
        } else {
            console.log('Margin left reached');
        }
    }

    // right key
    if (event.keyCode == 39) {
        if (!check.right(piece)) {
            piece.moveRight();
            piece.drawShape();
        } else {
            console.log('Margin right reached');
        }
    }
}

},{"../lib/check.js":2,"../lib/helper":3,"../lib/init-tetris":4,"../lib/tetris-shapes":5}],2:[function(require,module,exports){
const helper = require('./helper.js');

function down (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.x == piece.grid.rows - 1) {

                console.log('bottom reached');

                for (var j = 0; j < columnBlocks.length; j++) {
                    if (columnBlocks[j].getAttribute("active") == "true") {
                        columnBlocks[j].removeAttribute("active");
                    }
                }

                return true;
                break;
            }
        }
    }
}

function left (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == 0) {
                return true;
                break;
            }
        }
    }
}

function right (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == piece.grid.columns - 1) {
                return true;
                break;
            }
        }
    }
}

function rotate (piece) {
    var columnBlocks = document.getElementsByClassName('column');

    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {

            var pointer = helper.getPointFromBlock(i, piece.grid);
            console.log(pointer);

        }
    }
}


module.exports = {
    down: down,
    left: left,
    right: right,
    rotate: rotate
}

},{"./helper.js":3}],3:[function(require,module,exports){
/**
 *
 * @public
 * @name randomIntFromInterval
 * @param {int} min The minimum value.
 * @param {int} max The maximum value.
 * @return {int} Random value between min and max
 *
 */
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 *
 *
 * @public
 * @name getRandomKeyFromObject
 * @param {object} object A non empty object.
 * @return {object} key from a given object.
 *
 */
function getRandomKeyFromObject (object) {
    let numberOfPieces = Object.keys(object).length - 1;
    let key = Object.keys(object)[randomIntFromInterval(0, numberOfPieces)];

    for (var prop in object) {
        if (prop == key){
            return object[prop];
        }
    }
}

function getRandomKeyNameFromObject (object) {
    let numberOfPieces = Object.keys(object).length - 1;
    let key = Object.keys(object)[randomIntFromInterval(0, numberOfPieces)];
    return key;
}

function getBlock (point, grid) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    return column[block];
}

function getPointFromBlock (blockNumber, grid) {
    var point = {
        x: '',
        y: ''
    };

    var number = (blockNumber % grid.columns)- 10;
    point.x = Math.floor(blockNumber / grid.columns);
    point.y = blockNumber % grid.columns;
    return point;
}

module.exports = {
    randomIntFromInterval: randomIntFromInterval,
    getRandomKeyFromObject: getRandomKeyFromObject,
    getRandomKeyNameFromObject: getRandomKeyNameFromObject,
    getBlock: getBlock,
    getPointFromBlock: getPointFromBlock
}

},{}],4:[function(require,module,exports){
/**
 * Creates a tetris grid.
 *
 * @private
 * @param {object} options The grid object like (options.rows; options.columns).
 * @param {string} className The class name with which the tetris will be initialized in html.
 * @return {object} DOM element.
 *
 *
 */
function generateTetrisGrid(options, className) {

    var tetrisContainer = document.createElement('div');
    tetrisContainer.className = className;

    for (i = 0; i < options.rows; i++) {
        let div = document.createElement("div");
        div.setAttribute('class', 'row');

        for (j = 0; j < options.columns; j++) {
            let column = document.createElement('div');
            column.setAttribute('class', 'column');
            div.appendChild(column);
        }
        tetrisContainer.appendChild(div);
    }

    return tetrisContainer;
}

/**
 * Initialize tetris in html.
 *
 * @public
 * @param {object} options The grid object like (options.rows; options.conumns).
 * @param {string} id Html container (id) in witch the tetris grid will be implemented.
 *
 */
function init(options, className) {
    var tetris = generateTetrisGrid(options, className);

    // Inserting the grid into the body
    document.body.appendChild(tetris);
}

exports.init = init;

},{}],5:[function(require,module,exports){
const helper = require('./helper');

function drawPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].setAttribute('style', 'background: ' + color);
        column[block].setAttribute('used', 'used');
    }
};

function erasePoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].removeAttribute('style');
        column[block].removeAttribute('used');
    }
};

function next(obj, specificKey) {
    var found = false;
    for (var key in obj) {
        if (found == true) {
            return key;
            break;
        }
        if (key == 'd') {
            return 'a';
            break;
        }
        if (key == specificKey) {found = true}
    }
}

var piece = {
    width: '',
    height: '',
    pivot: '',
    grid: '',
    color: '',
    currentShapeName: '',
    nextShape: '',
    rotate: function () {
        this.nextShape = next(this.shape, this.currentShapeName);
        this.currentShapeName = this.nextShape;

        this.getDimensions();
        var preWidth = this.shape[this.nextShape].value[0].length - 2;
        var preHeight = this.shape[this.nextShape].value.length - 2;

        // Check if there is enough space in grid to rotate the piece
        if (this.pivot.y + 1 > this.grid.columns - preWidth) {
            console.log('Cannot rotate');
        } else {
            this.eraseShape();
            this.currentShape = this.shape[this.currentShapeName];
            this.drawShape();
        }
    },
    moveDown: function () {
        this.eraseShape();
        this.pivot.x += 1;
        this.drawShape();
    },
    moveLeft: function () {
        this.eraseShape();
        this.pivot.y += -1;
        this.drawShape();
    },
    moveRight: function () {
        this.eraseShape();
        this.pivot.y += 1;
        this.drawShape();
    },
    init: function (grid, color) {
        this.setShape();
        this.getDimensions();

        this.color = color;
        this.grid = grid;
        this.pivot = {
            x: 0,
            y: helper.randomIntFromInterval(0, grid.columns - this.width)
        };

        this.drawShape();
    },
    setShape: function () {
        // sets one random currentShape and currentShapeName
        randomS = helper.getRandomKeyNameFromObject(this.shape);
        this.currentShapeName = randomS;
        this.currentShape = this.shape[randomS];
    },
    getDimensions: function () {
        this.width = this.currentShape.value[0].length;
        this.height = this.currentShape.value.length;
    },
    drawShape: function () {
        for (var i = 0; i < this.currentShape.value.length; i++) {
            for (var j = 0; j < this.currentShape.value[0].length; j++) {
                if (this.currentShape.value[i][j]) {
                    if (this.currentShape.value[i][j] == 1) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        drawPoint(newPoint, this.grid, this.color);
                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).setAttribute('active', 'true');
                        }
                    }

                    if (this.currentShape.value[i][j] == 2) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        drawPoint(newPoint, this.grid, 'black');
                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).setAttribute('shadow', 'moving');
                        }
                    }
                }
            }
        }
    },
    eraseShape: function () {
        for (var i = 0; i < this.currentShape.value.length; i++) {
            for (var j = 0; j < this.currentShape.value[0].length; j++) {
                if (this.currentShape.value[i][j]) {
                    if (this.currentShape.value[i][j] == 1 || this.currentShape.value[i][j] == 2) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        erasePoint(newPoint, this.grid, this.color);
                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).removeAttribute('shadow');
                            helper.getBlock(newPoint, this.grid).removeAttribute('active');
                        }
                    }
                }
            }
        }
    }
};

var lPiece = Object.create(piece, {
    name: { value: 'lPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [2, 2, 2, 0],
                    [2, 1, 2, 0],
                    [2, 1, 2, 2],
                    [2, 1, 1, 2],
                    [2, 2, 2, 2]
                ]
            },
            b: {
                value: [
                    [0, 0, 2, 2, 2],
                    [2, 2, 2, 1, 2],
                    [2, 1, 1, 1, 2],
                    [2, 2, 2, 2, 2]
                ]
            },
            c: {
                value: [
                    [2, 2, 2, 2],
                    [2, 1, 1, 2],
                    [2, 2, 1, 2],
                    [0, 2, 1, 2],
                    [0, 2, 2, 2]
                ]
            },
            d: {
                value: [
                    [2, 2, 2, 2, 2],
                    [2, 1, 1, 1, 2],
                    [2, 1, 2, 2, 2],
                    [2, 2, 2, 0, 0]
                ]
            }
        }
    }
});

var linePiece = Object.create(piece, {
    name: { value: 'linePiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [2, 2, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 2, 2]
                ]
            },
            b: {
                value: [
                    [2, 2, 2, 2, 2, 2],
                    [2, 1, 1, 1, 1, 2],
                    [2, 2, 2, 2, 2, 2]
                ]
            },
            c: {
                value: [
                    [2, 2, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 1, 2],
                    [2, 2, 2]
                ]
            },
            d: {
                value: [
                    [2, 2, 2, 2, 2, 2],
                    [2, 1, 1, 1, 1, 2],
                    [2, 2, 2, 2, 2, 2]
                ]
            }
        }
    }
});

var zPiece = Object.create(piece, {
    name: { value: 'zPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [0, 2, 2, 2, 2],
                    [2, 2, 1, 1, 2],
                    [2, 1, 1, 2, 2],
                    [2, 2, 2, 2, 0]
                ]
            },
            b: {
                value: [
                    [2, 2, 2, 0],
                    [2, 1, 2, 2],
                    [2, 1, 1, 2],
                    [2, 2, 1, 2],
                    [0, 2, 2, 2]
                ]
            },
            c: {
                value: [
                    [0, 2, 2, 2, 2],
                    [2, 2, 1, 1, 2],
                    [2, 1, 1, 2, 2],
                    [2, 2, 2, 2, 0]
                ]
            },
            d: {
                value: [
                    [2, 2, 2, 0],
                    [2, 1, 2, 2],
                    [2, 1, 1, 2],
                    [2, 2, 1, 2],
                    [0, 2, 2, 2]
                ]
            }
        }
    }
});

var tPiece = Object.create(piece, {
    name: { value: 'tPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [0, 2, 2, 2, 0],
                    [2, 2, 1, 2, 2],
                    [2, 1, 1, 1, 2],
                    [2, 2, 2, 2, 2]
                ]
            },
            b: {
                value: [
                    [0, 2, 2, 2],
                    [2, 2, 1, 2],
                    [2, 1, 1, 2],
                    [2, 2, 1, 2],
                    [0, 2, 2, 2]
                ]
            },
            c: {
                value: [
                    [2, 2, 2, 2, 2],
                    [2, 1, 1, 1, 2],
                    [2, 2, 1, 2, 2],
                    [0, 2, 2, 2, 0]
                ]
            },
            d: {
                value: [
                    [2, 2, 2, 0],
                    [2, 1, 2, 2],
                    [2, 1, 1, 2],
                    [2, 1, 2, 2],
                    [2, 2, 2, 0]
                ]
            }
        }
    }
});

module.exports = {
    linePiece: linePiece,
    lPiece: lPiece,
    zPiece: zPiece,
    tPiece: tPiece
}

},{"./helper":3}]},{},[1]);
