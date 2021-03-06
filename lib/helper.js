/**
 *
 * @public
 * @name randomIntFromInterval
 * @param {int} min The minimum value.
 * @param {int} max The maximum value.
 * @return {int} Random value between min and max
 *
 */
function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 *
 *
 * @public
 * @name getRandomKeyFromObject
 * @param {object} object A non empty object.
 * @return {object} key from a given object.
 *
 */
function getRandomKeyFromObject (object) {
    let numberOfPieces = Object.keys(object).length - 1;
    let key = Object.keys(object)[randomIntFromInterval(0, numberOfPieces)];

    for (var prop in object) {
        if (prop == key){
            return object[prop];
        }
    }
}

function getRandomKeyNameFromObject (object) {
    let numberOfPieces = Object.keys(object).length - 1;
    let key = Object.keys(object)[randomIntFromInterval(0, numberOfPieces)];
    return key;
}

function getBlock (point, grid) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    return column[block];
}

function getPointFromBlock (blockNumber, grid) {
    var point = {
        x: '',
        y: ''
    };

    var number = (blockNumber % grid.columns)- 10;
    point.x = Math.floor(blockNumber / grid.columns);
    point.y = blockNumber % grid.columns;
    return point;
}

module.exports = {
    randomIntFromInterval: randomIntFromInterval,
    getRandomKeyFromObject: getRandomKeyFromObject,
    getRandomKeyNameFromObject: getRandomKeyNameFromObject,
    getBlock: getBlock,
    getPointFromBlock: getPointFromBlock
}
