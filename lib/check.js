const helper = require('./helper.js');

// Turns all active blocks to 'used' and removes all 'shadows'
function makeUsed() {
    let blocks = document.getElementsByClassName('column');
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('active')) {
            blocks[i].removeAttribute('active');
            blocks[i].setAttribute('used', 'true');
        }
        if (blocks[i].hasAttribute('shadow')) {
            blocks[i].removeAttribute('shadow');
        }
        if (blocks[i].hasAttribute('pre')) {
            blocks[i].removeAttribute('pre');
        }
    }
}

// Returns true if piece reached bottom
function down (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.x == piece.grid.rows - 1) {
                return true;
                break;
            }
        }
    }
}

// Returns true if margin left reached
function left (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == 0) {
                return true;
                break;
            }
        }
    }
}

// Returns true if left collision with another piece occures
function isLeftCollision(piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            let point = {
                x: pointer.x,
                y: pointer.y - 1
            }
            let newBlock = helper.getBlock(point, piece.grid);
            if (newBlock.hasAttribute('used')) {
                return true;
                break;
            }
        }
    }
}

// Returns true if margin right reached
function right (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == piece.grid.columns - 1) {
                return true;
                break;
            }
        }
    }
}

// Returns true if left collision with another piece occures
function isRightCollision(piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            let point = {
                x: pointer.x,
                y: pointer.y + 1
            }
            let newBlock = helper.getBlock(point, piece.grid);
            if (newBlock.hasAttribute('used')) {
                return true;
                break;
            }
        }
    }
}

// Returns true if grid collision detected
function rotate (piece) {
    piece.getNextDimensions();

    if (piece.pivot.y > piece.grid.columns - piece.nextWidth) {
        return true;
    } else {
        return false;
    }
}

// Returns true if collision with 'used' block detected
function rotateCollision(piece) {
    var blocks = document.getElementsByClassName('column');
    for (var i = 0; i < blocks.length; i++) {
        if (blocks[i].hasAttribute('used') && blocks[i].hasAttribute('pre')) {
            return true;
            break;
        }
    }
}

function next(obj, specificKey) {
    var found = false;
    for (var key in obj) {
        if (found == true) {
            return key;
            break;
        }
        if (key == 'd') {
            return 'a';
            break;
        }
        if (key == specificKey) {found = true}
    }
}

module.exports = {
    down: down,
    left: left,
    right: right,
    rotate: rotate,
    makeUsed: makeUsed,
    isLeftCollision: isLeftCollision,
    isRightCollision: isRightCollision,
    rotateCollision: rotateCollision
}
