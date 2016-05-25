const helper = require('./helper');

function drawPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].setAttribute('style', 'background: ' + color);
    }
};

function erasePoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        if (!column[block].hasAttribute('shadow')) {
            column[block].removeAttribute('style');
            column[block].removeAttribute('used');
        }
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

function matrixPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].setAttribute('pre', 'true');
    }
};

function deMatrixPoint(point, grid, color) {
    let column = document.getElementsByClassName('column');
    let block = point.x * grid.columns + point.y;
    if (column[block]) {
        column[block].removeAttribute('pre');
    }
};

var piece = {
    width: '',
    height: '',
    nextWidth: '',
    nextHeight: '',
    pivot: '',
    grid: '',
    color: '',
    currentShapeName: '',
    nextShape: '',
    rotate: function () {

        this.eraseShape();

        this.currentShapeName = this.nextShape;
        this.currentShape = this.shape[this.currentShapeName];
        this.nextShape = next(this.shape, this.currentShapeName);

	this.drawPre();
        this.drawShape();
    },
    moveDown: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.x += 1;
        this.drawShape();
	this.drawPre();
    },
    moveLeft: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.y += -1;
        this.drawShape();
	this.drawPre();
    },
    moveRight: function () {
	this.erasePre();
        this.eraseShape();
        this.pivot.y += 1;
        this.drawShape();
	this.drawPre();
    },
    init: function (grid, color) {
        this.setShape();
        this.getDimensions();
        this.nextShapeF();

        this.color = color;
        this.grid = grid;
        this.pivot = {
            x: 0,
            y: helper.randomIntFromInterval(0, grid.columns - this.width)
        };

	this.drawPre();
        this.drawShape();
    },
    setShape: function () {
        // sets one random currentShape and currentShapeName
        randomS = helper.getRandomKeyNameFromObject(this.shape);
        this.currentShapeName = randomS;
        this.currentShape = this.shape[randomS];
    },
    nextShapeF: function () {
        this.nextShape = next(this.shape, this.currentShapeName);
    },
    getDimensions: function () {
        this.width = this.currentShape.value[0].length;
        this.height = this.currentShape.value.length;
    },
    getNextDimensions: function () {
        this.nextWidth = this.shape[this.nextShape].value[0].length;
        this.nextHeight = this.shape[this.nextShape].value.length;
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
                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).setAttribute('active', 'true');
                        }
                    }

                    if (this.currentShape.value[i][j] == 2) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };

                        // This is only as a helper to visualize shadows
                        // drawPoint(newPoint, this.grid, 'black');

                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).setAttribute('shadow', 'true');
                        }
                    }
                }
            }
        }
    },
    drawPre: function () {
	for (var i = 0; i < this.shape[this.nextShape].value.length; i++) {
	    for (var j = 0; j < this.shape[this.nextShape].value[0].length; j++) {
		if (this.shape[this.nextShape].value[i][j]) {
		    if (this.shape[this.nextShape].value[i][j] == 1) {
			let newPoint = {
			    x: this.pivot.x + i,
			    y: this.pivot.y + j
			};
			matrixPoint(newPoint, this.grid, this.color);
		    }
		}
	    }
	}
    },
    erasePre: function () {
        for (var i = 0; i < this.shape[this.nextShape].value.length; i++) {
            for (var j = 0; j < this.shape[this.nextShape].value[0].length; j++) {
                if (this.shape[this.nextShape].value[i][j]) {
                    if (this.shape[this.nextShape].value[i][j] == 1) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };
                        deMatrixPoint(newPoint, this.grid, this.color);
                    }
                }
            }
        }
    },
    eraseShape: function () {
        for (var i = 0; i < this.currentShape.value.length; i++) {
            for (var j = 0; j < this.currentShape.value[0].length; j++) {
                if (this.currentShape.value[i][j]) {
                    if (this.currentShape.value[i][j] == 1 || this.currentShape.value[i][j] == 2) {
                        let newPoint = {
                            x: this.pivot.x + i,
                            y: this.pivot.y + j
                        };

                        erasePoint(newPoint, this.grid, this.color);

                        if (helper.getBlock(newPoint, this.grid)) {
                            helper.getBlock(newPoint, this.grid).removeAttribute('shadow');
                            helper.getBlock(newPoint, this.grid).removeAttribute('active');
                        }
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

var tPiece = Object.create(piece, {
    name: { value: 'tPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [0, 1, 0],
                    [1, 1, 1]
                ]
            },
            b: {
                value: [
                    [0, 1],
                    [1, 1],
                    [0, 1]
                ]
            },
            c: {
                value: [
                    [1, 1, 1],
                    [0, 1, 0]
                ]
            },
            d: {
                value: [
                    [1, 0],
                    [1, 1],
                    [1, 0]
                ]
            }
        }
    }
});

var cubePiece = Object.create(piece, {
    name: { value: 'tPiece' },
    currentShape: {
        value: 'a',
        writable: true,
        configurable: true
    },
    shape: {
        value: {
            a: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            },
            b: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            },
            c: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            },
            d: {
                value: [
                    [1, 1],
                    [1, 1]
                ]
            }
        }
    }
});

module.exports = {
    linePiece: linePiece,
    lPiece: lPiece,
    zPiece: zPiece,
    tPiece: tPiece,
    cubePiece: cubePiece
}
