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
    var columnBlocks = document.getElementsByClassName('column');
    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == 0) {
                return true;
                break;
            }
        }
        if (columnBlocks[i].getAttribute("shadow") == "moving") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == 0) {
                let point = {
                    x: pointer.x,
                    y: pointer.y - 1
                }
                let block = helper.getBlock(point, piece.grid);
                if (block) {
                    block.setAttribute('extra', 'extra');
                    block.removeAttribute('used');
                    block.removeAttribute('shadow');
                }
            }
        }
    }
}

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
        if (columnBlocks[i].getAttribute("shadow") == "moving") {
            var pointer = helper.getPointFromBlock(i, piece.grid);
            if (pointer.y == 9) {
                let point = {
                    x: pointer.x + 1,
                    y: 0
                }
                let block = helper.getBlock(point, piece.grid);
                if (block) {
                    block.setAttribute('extra', 'extra');
                    block.removeAttribute('used');
                    block.removeAttribute('shadow');
                }
            }
        }
    }
}

function rotate (piece) {
    var columnBlocks = document.getElementsByClassName('column');

    for (var i = 0; i < columnBlocks.length; i++) {
        if (columnBlocks[i].getAttribute("active") == "true") {

            var pointer = helper.getPointFromBlock(i, piece.grid);
            console.log(pointer);

        }
    }
}

module.exports = {
    down: down,
    left: left,
    right: right,
    rotate: rotate
}
