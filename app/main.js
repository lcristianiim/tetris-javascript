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

function drawShadow() {
    for (var i = piece.pivot.x * piece.pivot.y; i < piece.grid.rows * piece.grid.columns; i++) {
        for (var j = piece.pivot.x * piece.pivot.y; j < columnsBlocks.length; j++) {

            if (columnsBlocks[j].getAttribute("used") == "used") {
                var point = helper.getPointFromBlock(j, grid);

                var point1 = { x: point.x - 1, y: point.y - 1 }
                var point2 = { x: point.x - 1, y: point.y }
                var point3 = { x: point.x - 1, y: point.y + 1 }

                var point4 = { x: point.x, y: point.y - 1 }
                var point5 = { x: point.x, y: point.y }
                var point6 = { x: point.x, y: point.y + 1 }

                var point7 = { x: point.x + 1, y: point.y - 1 }
                var point8 = { x: point.x + 1, y: point.y}
                var point9 = { x: point.x + 1, y: point.y + 1}

                var shadowPoints = [point1, point2, point3, point4, point5, point6, point7, point8, point9]
                shadowPoints.forEach(function (item) {
                    var shadowBlock = helper.getBlock(item, grid);
                    if (shadowBlock) {
                        shadowBlock.style.backgroundColor = "black";
                    }
                });
            }
        }
    }
}


function clearShadow() {
    for (var i = 0; i < piece.grid.rows * piece.grid.columns; i++) {
        for (var j = 0; j < columnsBlocks.length; j++) {
            if (columnsBlocks[j].getAttribute("used") == "used") {
                var point = helper.getPointFromBlock(j, grid);

                var point1 = { x: point.x - 1, y: point.y - 1 }
                var point2 = { x: point.x - 1, y: point.y }
                var point3 = { x: point.x - 1, y: point.y + 1 }

                var point4 = { x: point.x, y: point.y - 1 }
                var point5 = { x: point.x, y: point.y }
                var point6 = { x: point.x, y: point.y + 1 }

                var point7 = { x: point.x + 1, y: point.y - 1 }
                var point8 = { x: point.x + 1, y: point.y}
                var point9 = { x: point.x + 1, y: point.y + 1}

                var shadowPoints = [point1, point2, point3, point4, point5, point6, point7, point8, point9]
                shadowPoints.forEach(function (item) {
                    var shadowBlock = helper.getBlock(item, grid);
                    if (shadowBlock) {
                    shadowBlock.style.backgroundColor = "#3C3E3C";
                    }
                });
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
