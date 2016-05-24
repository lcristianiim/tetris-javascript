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
