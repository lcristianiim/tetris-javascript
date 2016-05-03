const helper = require('./helper.js');

function down (piece) {
    if (piece.pivot.x != piece.grid.rows - piece.height) {
        return true;
    } else console.log('Bottom reached');
}

function left (piece) {
    if (piece.pivot.y != 0) {
        return true;
    } else console.log('Left reached');
}


function right (piece) {
    if (piece.pivot.y != piece.grid.columns - piece.width) {
        return true;
    } else console.log('Right reached');
}

function downCollision (piece, grid) {
    var block = helper.getBlock(piece.pivot, grid);
    console.log(block);
}

module.exports = {
    down: down,
    left: left,
    right: right,
    downCollision: downCollision
}
