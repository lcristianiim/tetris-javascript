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

function getPiece() {
    color = colors[Math.floor(Math.random()*colors.length)];

    // Initialize random piece
    piece = helper.getRandomKeyFromObject(shape);

    // Initialize random shape as currentShape
    piece.init(grid, color);
}

function clearExtraBlocks () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('extra')) {
            blocks[i].removeAttribute('extra');
            blocks[i].removeAttribute('used');
            blocks[i].removeAttribute('shadow');
        }
    }
}

function checkCollision () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('used') && blocks[i].hasAttribute('shadow')) {

            for (let j = 0; j < blocks.length; j++) {
                if (blocks[j].hasAttribute('active')) {
                    blocks[j].removeAttribute('active');
                    blocks[j].setAttribute('used', 'used');
                }
            }

            // clean the collided blocks
            blocks[i].removeAttribute('shadow');

            return true;
            break;
        }
    }
}

function visualizeUsed() {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks && blocks[i].hasAttribute('used')) {
            blocks[i].style.background = 'grey';
        }
    }
}

// Checks if the active piece collides down with a 'used' piece
function checkDown () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('active')) {

            let point = helper.getPointFromBlock(i, grid);
            let newPoint = {
                x: point.x + 1,
                y: point.y
            }
            let block = helper.getBlock(newPoint, grid);

            if (block && block.hasAttribute('used')) {
                console.log('Piece colision with other piece');
                return true;
            }
        }
    }
}

// Removes the shadow, extra, active states
function cleanUp () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] && !blocks[i].hasAttribute('style')) {
            blocks[i].removeAttribute('shadow');
            blocks[i].removeAttribute('extra');
            blocks[i].removeAttribute('active');
        }
    }
}


// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        piece.rotate();
        piece.drawShape();
        check.rotate(piece);
    }

    // down key
    if (event.keyCode == 40) {
        visualizeUsed();
        if (checkDown()) {
            console.log('Collision detected');
            check.makeUsed();
            getPiece();
        } else {
            if (!check.down(piece)) {

                piece.moveDown();
                piece.drawShape();

            } else {
                check.makeUsed();
                getPiece();
            }
        }
    }

    // left key
    if (event.keyCode == 37) {
        if (!check.left(piece)) {

            if (check.isLeftCollision(piece)) {
                console.log('Left collision with another piece');
            } else {
                piece.moveLeft();
                piece.drawShape();
                clearExtraBlocks();
            }

        } else {
            console.log('Margin left reached');
        }
    }


    // right key
    if (event.keyCode == 39) {
        if (!check.right(piece)) {

            if (check.isRightCollision(piece)) {
                console.log('Right collision with another piece');
            } else {
                piece.moveRight();
                piece.drawShape();
                clearExtraBlocks();
            }
        } else {
            console.log('Margin right reached');
        }
    }
}

},{"../lib/check.js":2,"../lib/helper":3,"../lib/init-tetris":4,"../lib/tetris-shapes":5}],2:[function(require,module,exports){
const helper = require('./helper.js');

// Turns all active blocks to 'used' and removes all 'shadows'
function makeUsed() {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('active')) {
            blocks[i].removeAttribute('active');
            blocks[i].setAttribute('used', 'true');
        }
        if (blocks[i].hasAttribute('shadow')) {
            blocks[i].removeAttribute('shadow');
        }
    }
}

// Returns true if piece reached bottom
function down (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.x == piece.grid.rows - 1) {
                return true;
                break;
            }
        }
    }
}

// Returns true if margin left reached
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

// Returns true if left collision with another piece occures
function isLeftCollision(piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            let point = {
                x: pointer.x,
                y: pointer.y - 1
            }
            let newBlock = helper.getBlock(point, piece.grid);
            if (newBlock.hasAttribute('used')) {
                return true;
                break;
            }
        }
    }
}

// Returns true if margin right reached
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

// Returns true if left collision with another piece occures
function isRightCollision(piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            let point = {
                x: pointer.x,
                y: pointer.y + 1
            }
            let newBlock = helper.getBlock(point, piece.grid);
            if (newBlock.hasAttribute('used')) {
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
            if (pointer.y == 0) {
                for (let j = 0; j < piece.grid.rows; j++) {
                    newPoint = {
                        x: j,
                        y: piece.grid.columns - 1
                    }
                    let block = helper.getBlock(newPoint, piece.grid);
                    if (block.getAttribute("shadow") == "true") {
                        block.removeAttribute('used');
                        block.removeAttribute('shadow');
                    }
                }
            }

            if (pointer.y == 9) {
                for (let j = 0; j < piece.grid.rows; j++) {
                    newPoint = {
                        x: j,
                        y: 0
                    }
                    let block = helper.getBlock(newPoint, piece.grid);
                    if (block.getAttribute("shadow") == "true") {
                        block.removeAttribute('used');
                        block.removeAttribute('shadow');
                    }
                }
            }
        }
    }
}

module.exports = {
    down: down,
    left: left,
    right: right,
    rotate: rotate,
    makeUsed: makeUsed,
    isLeftCollision: isLeftCollision,
    isRightCollision: isRightCollision
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
    }
};

function erasePoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        if (!column[block].hasAttribute('shadow')) {
            column[block].removeAttribute('style');
            column[block].removeAttribute('used');
        }
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

        this.getDimensions();
        var preWidth = this.shape[this.nextShape].value[0].length - 2;
        var preHeight = this.shape[this.nextShape].value.length - 2;

        // Check if there is enough space in grid to rotate the piece
        if (this.pivot.y + 1 > this.grid.columns - preWidth) {
            console.log('Cannot rotate');
        } else {
        this.currentShapeName = this.nextShape;
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

                        // This is only as a helper to visualize shadows
                        // drawPoint(newPoint, this.grid, 'black');

                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).setAttribute('shadow', 'true');
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
                    [2, 2, 2, 2, 2, 2],
                    [1, 1, 1, 1, 2, 2]
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
                    [2, 2, 2, 2, 2, 2],
                    [1, 1, 1, 1, 2, 2]
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
                    [0, 2, 2, 2, 0],
                    [2, 2, 1, 2, 2],
                    [2, 1, 1, 2, 2],
                    [2, 2, 1, 2, 2]
                ]
            },
            c: {
                value: [
                    [2, 2, 2, 2, 2],
                    [2, 2, 2, 2, 2],
                    [2, 1, 1, 1, 2],
                    [0, 2, 1, 2, 0]
                ]
            },
            d: {
                value: [
                    [2, 2, 2, 2, 2],
                    [2, 2, 1, 2, 2],
                    [2, 2, 1, 1, 2],
                    [0, 2, 1, 2, 0]
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
