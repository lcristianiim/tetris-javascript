(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const
    initTetris = require('../lib/init-tetris'),
    shape = require('../lib/tetris-shapes'),
    helper = require('../lib/helper');

var grid = {
    rows: 20,
    columns: 10
}


var colors = ['orange', 'cyan', 'brown', 'yellow', 'magenta', 'lime'];
var color = colors[Math.floor(Math.random()*colors.length)];

// Initialize tetris grid
initTetris.init(grid, 'tetris-container');

// Initialize random piece
var piece = helper.getRandomKeyFromObject(shape);

// Initialize random shape as currentShape
piece.init(grid, color);
// console.log(piece.width);
// console.log(piece.height);

// var pivotPoint = {
//     x: 0,
//     y: helper.randomIntFromInterval(0, grid.columns - piece.width)
// }

// piece.drawShape(pivotPoint, piece.currentShape.value, grid, color);


// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        console.log('up');
    }

    // down key
    if (event.keyCode == 40) {
        if (checkDown) {
            piece.eraseShape(pivotPoint, piece.currentShape.value, grid, color);
            pivotPoint.x += 1;
            piece.drawShape(pivotPoint, piece.currentShape.value, grid, color);
        } else {
            console.log('Down impossible');
        }
    }

    // left key
    if (event.keyCode == 37) {
        piece.eraseShape(pivotPoint, piece.currentShape.value, grid, color);
        pivotPoint.y += -1;
        piece.drawShape(pivotPoint, piece.currentShape.value, grid, color);
    }

    // right key
    if (event.keyCode == 39) {
        piece.eraseShape(pivotPoint, piece.currentShape.value, grid, color);
        pivotPoint.y += 1;
        piece.drawShape(pivotPoint, piece.currentShape.value, grid, color);
    }
}

},{"../lib/helper":2,"../lib/init-tetris":3,"../lib/tetris-shapes":4}],2:[function(require,module,exports){
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

module.exports = {
    randomIntFromInterval: randomIntFromInterval,
    getRandomKeyFromObject: getRandomKeyFromObject,
    getRandomKeyNameFromObject: getRandomKeyNameFromObject
}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

var piece = {
    width: '',
    height: '',
    pivot: '',
    grid: '',
    color: '',
    rotate: function () {
        console.log('rotating');
    },
    init: function (pivot, grid, color) {
        this.setShape();
        this.getDimensions();

        this.color = color;
        this.grid = grid;
        this.pivot = pivot;
    },
    setShape: function () {
        // sets a random currentShape
        this.currentShape = helper.getRandomKeyFromObject(this.shape);
    },
    getDimensions: function () {
        this.width = this.currentShape.value[0].length;
        this.height = this.currentShape.value.length;
    },
    drawShape: function (point, shape, grid, color) {
        for (var i = 0; i < shape.length; i++) {
            for (var j = 0; j < shape[0].length; j++) {
                if (shape[i][j]) {
                    if (shape[i][j] == 1) {
                        let newPoint = {
                            x: point.x + i,
                            y: point.y + j
                        };
                        drawPoint(newPoint, grid, color);
                    }
                }
            }
        }
    },
    eraseShape: function (point, shape, grid, color) {
        for (var i = 0; i < shape.length; i++) {
            for (var j = 0; j < shape[0].length; j++) {
                if (shape[i][j]) {
                    if (shape[i][j] == 1) {
                        let newPoint = {
                            x: point.x + i,
                            y: point.y + j
                        };
                        erasePoint(newPoint, grid, color);
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

module.exports = {
    linePiece: linePiece,
    lPiece: lPiece,
    zPiece: zPiece
}

},{"./helper":2}]},{},[1]);
