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

// Clears rows witch are complete
function verifyRows(piece) {
    var rows = document.getElementsByClassName('row');
    var count = 0;

    for (let i = 0; i < rows.length; i++) {
        count = 0;
        for (let j = 0; j < piece.grid.columns; j++) {
            if (rows[i].children[j].hasAttribute('used')) {
                count++;
            }
            // all columns in a row are 'used'
            if (count == piece.grid.columns) {

                for (let k = 0; k < piece.grid.columns; k++) {
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

                                let point = helper.getPointFromBlock(m, piece.grid);
                                let newPoint = {
                                    x: point.x + 1,
                                    y: point.y
                                }

                                let customBlock = helper.getBlock(newPoint, piece.grid);
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

module.exports = {
    down: down,
    left: left,
    right: right,
    rotate: rotate,
    makeUsed: makeUsed,
    isLeftCollision: isLeftCollision,
    isRightCollision: isRightCollision,
    rotateCollision: rotateCollision,
    verifyRows: verifyRows
}
