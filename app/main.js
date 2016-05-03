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

function drawShadow() {
    for (var i = 0; i < piece.grid.rows * piece.grid.columns; i++) {
        var block = document.getElementsByClassName('column');
        console.log(block)
    }
}

drawShadow();

// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        piece.rotate();
    }

    // down key
    if (event.keyCode == 40) {
        if (check.down(piece)) {
            piece.moveDown();
            check.downCollision(piece, grid);
        } else getPiece();
    }

    // left key
    if (event.keyCode == 37) {
        if (check.left(piece)) {
            piece.moveLeft();
        }
    }

    // right key
    if (event.keyCode == 39) {
        if (check.right(piece)) {
            piece.moveRight();
        }
    }
}
