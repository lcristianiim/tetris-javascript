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
