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

// Returns true if all in a row are 'used'
function verifyRows() {
    var rows = document.getElementsByClassName('row');
    var count = 0;

    for (let i = 0; i < rows.length; i++) {
        count = 0;
        for (let j = 0; j < grid.columns; j++) {
            if (rows[i].children[j].hasAttribute('used')) {
                count++;
            }
            // all columns in a row are 'used'
            if (count == grid.columns) {

                for (let k = 0; k < grid.columns; k++) {
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

                            let point = helper.getPointFromBlock(m, grid);
                            let newPoint = {
                                x: point.x + 1,
                                y: point.y
                            }

                            let customBlock = helper.getBlock(newPoint, grid);
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

                // move all blocks down by one row
                // var blocks = document.getElementsByClassName('column');
                // for (let m = 0; m < blocks.length; m++) {
                //
                //     if (blocks[m].hasAttribute('used')) {
                //
                //         if (blocks[m].attributes.style) {
                //             var customStyle = blocks[m].attributes.style.textContent;
                //             function hackyGetColor (customStyle) {
                //                 var color = customStyle.split(" ");
                //                 return color[color.length - 1].split('"')[0];
                //             }
                //             var hackedColor = hackyGetColor(customStyle);
                //
                //             let point = helper.getPointFromBlock(m, grid);
                //             let newPoint = {
                //                 x: point.x + 1,
                //                 y: point.y
                //             }
                //
                //             let customBlock = helper.getBlock(newPoint, grid);
                //             if (customBlock) {
                //                 customBlock.setAttribute('used', true);
                //                 customBlock.setAttribute('style', 'background: ' + hackedColor);
                //                 blocks[m].removeAttribute('used');
                //                 blocks[m].removeAttribute('style');
                //             }
                //         }
                //
                //     }
                // }


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
        // visualizeUsed();
        if (checkDown()) {
            console.log('Collision detected');
            check.makeUsed();
            verifyRows();
            getPiece();
        } else {
            if (!check.down(piece)) {
                piece.moveDown();
                piece.drawShape();

            } else {
                check.makeUsed();
                verifyRows();
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
