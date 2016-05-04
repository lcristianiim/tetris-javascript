const helper = require('./helper');

function drawPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].setAttribute('style', 'background: ' + color);
        column[block].setAttribute('used', 'used');
    }
};

function erasePoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].removeAttribute('style');
        column[block].removeAttribute('used');
    }
};

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

var piece = {
    width: '',
    height: '',
    pivot: '',
    grid: '',
    color: '',
    currentShapeName: '',
    nextShape: '',
    rotate: function () {
        this.nextShape = next(this.shape, this.currentShapeName);

        var preWidth = this.shape[this.nextShape].value[0].length;
        var preHeight = this.shape[this.nextShape].value.length;

        this.width = preWidth;
        this.height = preHeight;

        if (this.pivot.y > this.grid.columns - preWidth) {
            console.log('error');
            this.getDimensions();
        } else {
            this.eraseShape();
            this.currentShapeName = this.nextShape;
            this.currentShape = this.shape[this.currentShapeName];

            this.drawShape();
        }
    },
    moveDown: function () {
        this.eraseShape();
        this.pivot.x += 1;
        this.drawShape();
    },
    moveLeft: function () {
        this.eraseShape();
        this.pivot.y += -1;
        this.drawShape();
    },
    moveRight: function () {
        this.eraseShape();
        this.pivot.y += 1;
        this.drawShape();
    },
    init: function (grid, color) {
        this.setShape();
        this.getDimensions();

        this.color = color;
        this.grid = grid;
        this.pivot = {
            x: 0,
            y: helper.randomIntFromInterval(0, grid.columns - this.width)
        };

        this.drawShape();
    },
    setShape: function () {
        // sets one random currentShape and currentShapeName
        randomS = helper.getRandomKeyNameFromObject(this.shape);
        this.currentShapeName = randomS;
        this.currentShape = this.shape[randomS];
    },
    getDimensions: function () {
        this.width = this.currentShape.value[0].length;
        this.height = this.currentShape.value.length;
    },
    drawShape: function () {
        for (var i = 0; i < this.currentShape.value.length; i++) {
            for (var j = 0; j < this.currentShape.value[0].length; j++) {
                if (this.currentShape.value[i][j]) {
                    if (this.currentShape.value[i][j] == 1) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        drawPoint(newPoint, this.grid, this.color);
                    }
                }
            }
        }
    },
    eraseShape: function () {
        for (var i = 0; i < this.currentShape.value.length; i++) {
            for (var j = 0; j < this.currentShape.value[0].length; j++) {
                if (this.currentShape.value[i][j]) {
                    if (this.currentShape.value[i][j] == 1) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        erasePoint(newPoint, this.grid, this.color);
                    }
                }
            }
        }
    }
};

var lPiece = Object.create(piece, {
    name: { value: 'lPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ]
            },
            b: {
                value: [
                    [0, 0, 1],
                    [1, 1, 1]
                ]
            },
            c: {
                value: [
                    [1, 1],
                    [0, 1],
                    [0, 1]
                ]
            },
            d: {
                value: [
                    [1, 1, 1],
                    [1, 0, 0]
                ]
            }
        }
    }
});

var linePiece = Object.create(piece, {
    name: { value: 'linePiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            },
            b: {
                value: [
                    [1, 1, 1, 1]
                ]
            },
            c: {
                value: [
                    [1],
                    [1],
                    [1],
                    [1]
                ]
            },
            d: {
                value: [
                    [1, 1, 1, 1]
                ]
            }
        }
    }
});

var zPiece = Object.create(piece, {
    name: { value: 'zPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            },
            b: {
                value: [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            },
            c: {
                value: [
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            },
            d: {
                value: [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            }
        }
    }
});

module.exports = {
    linePiece: linePiece,
    lPiece: lPiece,
    zPiece: zPiece
}
