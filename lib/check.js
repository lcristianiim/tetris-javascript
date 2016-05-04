const helper = require('./helper.js');

function down (piece) {
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

module.exports = {
    down: down,
    left: left,
    right: right
}
