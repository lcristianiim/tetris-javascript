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

// Removes the shadow, extra, active, pre states
function cleanUp () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] && !blocks[i].hasAttribute('style')) {
            blocks[i].removeAttribute('shadow');
            blocks[i].removeAttribute('extra');
            blocks[i].removeAttribute('active');
            blocks[i].removeAttribute('pre');
        }
    }
}

// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        if (check.rotate(piece)) {
            console.log('Cannot rotate, grid in the way');
        }
        else if (check.rotateCollision(piece)) {
            console.log('Cannot rotate, piece in the way');
        } else {
            piece.rotate();
        }
    }

    function checkGameOver() {
        var blocks = document.getElementsByClassName('column');
        for (var i = 0; i < 10; i++) {
            if (blocks[i].hasAttribute('active')) {
                return true;
                break;
            }
        }
    }

    // Begin the game with spacebar
    if (event.keyCode == 32) {
        setInterval(function() {
            if (checkDown()) {
                console.log('Collision detected');
                if (checkGameOver()) {
                    console.log('Game over');
                    alert('Game Over. Press f5 to restart');
                } else {
                    check.makeUsed();
                    check.verifyRows(piece);
                    getPiece();
                }
            } else {
                if (!check.down(piece)) {
                    piece.moveDown();
                    piece.drawShape();

                } else {

                    if (checkGameOver()) {
                        console.log('Game over');
                        alert('Game Over. Press f5 to restart');
                    } else {
                        check.makeUsed();
                        check.verifyRows(piece);
                        getPiece();
                    }
                }
            }
        }, 500);
    }

    // down key
    if (event.keyCode == 40) {
        if (checkDown()) {
            console.log('Collision detected');
            if (checkGameOver()) {
                console.log('Game over');
                alert('Game Over. Press f5 to restart');
            } else {
                check.makeUsed();
                check.verifyRows(piece);
                getPiece();
            }
        } else {
            if (!check.down(piece)) {
                piece.moveDown();
                piece.drawShape();

            } else {

                if (checkGameOver()) {
                    console.log('Game over');
                    alert('Game Over. Press f5 to restart');
                } else {
                    check.makeUsed();
                    check.verifyRows(piece);
                    getPiece();
                }
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
        if (blocks[i].hasAttribute('pre')) {
            blocks[i].removeAttribute('pre');
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

// Returns true if grid collision detected
function rotate (piece) {
    piece.getNextDimensions();

    if (piece.pivot.y > piece.grid.columns - piece.nextWidth) {
        return true;
    } else {
        return false;
    }
}

// Returns true if collision with 'used' block detected
function rotateCollision(piece) {
    var blocks = document.getElementsByClassName('column');
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('used') && blocks[i].hasAttribute('pre')) {
            return true;
            break;
        }
    }
}

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

// Clears rows witch are complete
function verifyRows(piece) {
    var rows = document.getElementsByClassName('row');
    var count = 0;

    for (let i = 0; i < rows.length; i++) {
        count = 0;
        for (let j = 0; j < piece.grid.columns; j++) {
            if (rows[i].children[j].hasAttribute('used')) {
                count++;
            }
            // all columns in a row are 'used'
            if (count == piece.grid.columns) {

                for (let k = 0; k < piece.grid.columns; k++) {
                    rows[i].children[k].setAttribute('dissapear', true);
                    rows[i].children[k].removeAttribute('used');
                    rows[i].children[k].removeAttribute('style');
                }

                var blocks = document.getElementsByClassName('column');
                var status = false;

                for (let m = blocks.length; m > 0; m--) {
                    if (blocks[m] && blocks[m].hasAttribute('dissapear')) {
                        status = true;
                    }

                    if (status) {
                        if (blocks[m].hasAttribute('used')) {
                            if (blocks[m].hasAttribute('dissapear')) {status = false}

                            if (blocks[m].attributes.style) {
                                var customStyle = blocks[m].attributes.style.textContent;
                                function hackyGetColor (customStyle) {
                                    var color = customStyle.split(" ");
                                    return color[color.length - 1].split('"')[0];
                                }
                                var hackedColor = hackyGetColor(customStyle);

                                let point = helper.getPointFromBlock(m, piece.grid);
                                let newPoint = {
                                    x: point.x + 1,
                                    y: point.y
                                }

                                let customBlock = helper.getBlock(newPoint, piece.grid);
                                if (customBlock) {
                                    customBlock.setAttribute('used', true);
                                    customBlock.setAttribute('style', 'background: ' + hackedColor);
                                    blocks[m].removeAttribute('used');
                                    blocks[m].removeAttribute('style');
                                }
                            }

                        }

                    }
                }
            }
        }
        let allBlocks = document.getElementsByClassName('column');
        for (let z = 0; z < allBlocks.length; z++) {
            allBlocks[z].removeAttribute('dissapear');
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
    isRightCollision: isRightCollision,
    rotateCollision: rotateCollision,
    verifyRows: verifyRows
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

function matrixPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].setAttribute('pre', 'true');
    }
};

function deMatrixPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].removeAttribute('pre');
    }
};

var piece = {
    width: '',
    height: '',
    nextWidth: '',
    nextHeight: '',
    pivot: '',
    grid: '',
    color: '',
    currentShapeName: '',
    nextShape: '',
    rotate: function () {

        this.eraseShape();

        this.currentShapeName = this.nextShape;
        this.currentShape = this.shape[this.currentShapeName];
        this.nextShape = next(this.shape, this.currentShapeName);

	this.drawPre();
        this.drawShape();
    },
    moveDown: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.x += 1;
        this.drawShape();
	this.drawPre();
    },
    moveLeft: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.y += -1;
        this.drawShape();
	this.drawPre();
    },
    moveRight: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.y += 1;
        this.drawShape();
	this.drawPre();
    },
    init: function (grid, color) {
        this.setShape();
        this.getDimensions();
        this.nextShapeF();

        this.color = color;
        this.grid = grid;
        this.pivot = {
            x: 0,
            y: helper.randomIntFromInterval(0, grid.columns - this.width)
        };

	this.drawPre();
        this.drawShape();
    },
    setShape: function () {
        // sets one random currentShape and currentShapeName
        randomS = helper.getRandomKeyNameFromObject(this.shape);
        this.currentShapeName = randomS;
        this.currentShape = this.shape[randomS];
    },
    nextShapeF: function () {
        this.nextShape = next(this.shape, this.currentShapeName);
    },
    getDimensions: function () {
        this.width = this.currentShape.value[0].length;
        this.height = this.currentShape.value.length;
    },
    getNextDimensions: function () {
        this.nextWidth = this.shape[this.nextShape].value[0].length;
        this.nextHeight = this.shape[this.nextShape].value.length;
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
    drawPre: function () {
	for (var i = 0; i < this.shape[this.nextShape].value.length; i++) {
	    for (var j = 0; j < this.shape[this.nextShape].value[0].length; j++) {
		if (this.shape[this.nextShape].value[i][j]) {
		    if (this.shape[this.nextShape].value[i][j] == 1) {
			let newPoint = {
			    x: this.pivot.x + i,
			    y: this.pivot.y + j
			};
			matrixPoint(newPoint, this.grid, this.color);
		    }
		}
	    }
	}
    },
    erasePre: function () {
        for (var i = 0; i < this.shape[this.nextShape].value.length; i++) {
            for (var j = 0; j < this.shape[this.nextShape].value[0].length; j++) {
                if (this.shape[this.nextShape].value[i][j]) {
                    if (this.shape[this.nextShape].value[i][j] == 1) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        deMatrixPoint(newPoint, this.grid, this.color);
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

                    [1, 0],
                    [1, 0],
                    [1, 1]

                ]
            },
            b: {
                value: [
                    [0, 0, 1],
                    [1, 1, 1]
                ]
            },
            c: {
                value: [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ]
            },
            d: {
                value: [
                    [1, 1, 1],
                    [1, 0, 0]
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
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            },
            b: {
                value: [
                    [1, 1, 1, 1]
                ]
            },
            c: {
                value: [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            },
            d: {
                value: [
                    [1, 1, 1, 1]
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
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            },
            b: {
                value: [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            },
            c: {
                value: [
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            },
            d: {
                value: [
                    [1, 0],
                    [1, 1],
                    [0, 1]
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
                    [0, 1, 0],
                    [1, 1, 1]
                ]
            },
            b: {
                value: [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ]
            },
            c: {
                value: [
                    [1, 1, 1],
                    [0, 1, 0]
                ]
            },
            d: {
                value: [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ]
            }
        }
    }
});

var cubePiece = Object.create(piece, {
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
                    [1, 1],
                    [1, 1]
                ]
            },
            b: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            },
            c: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            },
            d: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            }
        }
    }
});

module.exports = {
    linePiece: linePiece,
    lPiece: lPiece,
    zPiece: zPiece,
    tPiece: tPiece,
    cubePiece: cubePiece
}

},{"./helper":3}]},{},[1]);
