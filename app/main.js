const
    initTetris = require('../lib/init-tetris'),
    shape = require('../lib/tetris-shapes'),
    check = require('../lib/check.js'),
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

// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        console.log('up');
    }

    // down key
    if (event.keyCode == 40) {
        if (check.down(piece)) {
            piece.moveDown();
        }
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
