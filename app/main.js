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

function clearExtraBlocks () {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('extra')) {
        console.log(blocks[i]);
            blocks[i].removeAttribute('extra');
            blocks[i].removeAttribute('used');
            blocks[i].removeAttribute('shadow');
        }
    }
}

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
            clearExtraBlocks();
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
