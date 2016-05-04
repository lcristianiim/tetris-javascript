const helper = require('./helper.js');

function down (piece) {
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.x == piece.grid.rows - 1) {

                console.log('bottom reached');

                for (var j = 0; j < columnBlocks.length; j++) {
                    if (columnBlocks[j].getAttribute("active") == "true") {
                        columnBlocks[j].removeAttribute("active");
                    }
                }

                return true;
                break;
            }
        }
    }
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
