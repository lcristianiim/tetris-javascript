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

var columnsBlocks = document.getElementsByClassName('column');

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
            piece.moveDown();
            piece.drawShape();
    }

    // left key
    if (event.keyCode == 37) {
            piece.moveLeft();
            piece.drawShape();
    }

    // right key
    if (event.keyCode == 39) {
            piece.moveRight();
            piece.drawShape();
    }
}
