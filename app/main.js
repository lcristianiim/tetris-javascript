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

function drawShadow() {
    for (var i = 0; i < piece.grid.rows * piece.grid.columns; i++) {
        var block = document.getElementsByClassName('column');
        for (i = 0; i < block.length; i++) {
            if (block[i].getAttribute("used") == "used") {
                var point = helper.getPointFromBlock(i, grid);
                if (point.x - 1 >= 0) {
                    for (var k = point.x - 1; k <= point.x + 1; k++ ) {
                        if (point.y - 1 >= 0) {
                            for (var t = point.y - 1; t <= point.y + 1; t++) {
                                if (block[i].getAttribute("used") == "used" && t <= 10) {
                                    var pointer = {
                                        x: k,
                                        y: t
                                    }
                                    var blocker = helper.getBlock(pointer, grid);
                                    if (blocker) {
                                        blocker.style.backgroundColor = 'black';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


function clearShadow() {
    for (var i = 0; i < piece.grid.rows * piece.grid.columns; i++) {
        var block = document.getElementsByClassName('column');
        for (i = 0; i < block.length; i++) {
            if (block[i].getAttribute("used") == "used") {
                var point = helper.getPointFromBlock(i, grid);
                if (point.x - 1 >= 0) {
                    for (var k = point.x - 1; k <= point.x + 1; k++ ) {
                        if (point.y - 1 >= 0) {
                            for (var t = point.y - 1; t <= point.y + 1; t++) {
                                if (block[i].getAttribute("used") == "used" && t <= 10) {
                                    var pointer = {
                                        x: k,
                                        y: t
                                    }
                                    var blocker = helper.getBlock(pointer, grid);
                                    if (blocker) {
                                        blocker.style.backgroundColor = '#3C3E3C';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


// Handling the keydown event
document.body.onkeydown = function (event) {

    // up key
    if (event.keyCode == 38) {
        clearShadow();
        piece.rotate();
        drawShadow();
        piece.drawShape();
    }

    // down key
    if (event.keyCode == 40) {
        if (check.down(piece)) {
            clearShadow();
            piece.moveDown();
            drawShadow();
            piece.drawShape();
            // check.downCollision(piece, grid);
        } else getPiece();
    }

    // left key
    if (event.keyCode == 37) {
        if (check.left(piece)) {
            clearShadow();
            piece.moveLeft();
            drawShadow();
            piece.drawShape();
        }
    }

    // right key
    if (event.keyCode == 39) {
        if (check.right(piece)) {
            clearShadow();
            piece.moveRight();
            drawShadow();
            piece.drawShape();
        }
    }
}
