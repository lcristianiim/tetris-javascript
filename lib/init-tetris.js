/**
 * Creates a tetris grid.
 *
 * @private
 * @param {object} options The grid object like (options.rows; options.columns).
 * @param {string} className The class name with which the tetris will be initialized in html.
 * @return {object} DOM element.
 *
 *
 */
function generateTetrisGrid(options, className) {

    var tetrisContainer = document.createElement('div');
    tetrisContainer.className = className;

    for (i = 0; i < options.rows; i++) {
        let div = document.createElement("div");
        div.setAttribute('class', 'row');

        for (j = 0; j < options.columns; j++) {
            let column = document.createElement('div');
            column.setAttribute('class', 'column');
            div.appendChild(column);
        }
        tetrisContainer.appendChild(div);
    }

    return tetrisContainer;
}

/**
 * Initialize tetris in html.
 *
 * @public
 * @param {object} options The grid object like (options.rows; options.conumns).
 * @param {string} id Html container (id) in witch the tetris grid will be implemented.
 *
 */
function init(options, className) {
    var tetris = generateTetrisGrid(options, className);

    // Inserting the grid into the body
    document.body.appendChild(tetris);
}

exports.init = init;
