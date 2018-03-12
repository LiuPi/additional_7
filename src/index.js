function saveEmptyPositions(m){
    var p = [];
    for(let i = 0; i < m.length; i++) {
        for(let j = 0; j < m[i].length; j++) {
            if(m[i][j] === 0) {
                p.push([i, j]);
            }
        }
    }
    return p;
}

function checkRow(m, row, value) {
    for(let i = 0; i < m[row].length; i++) {
        if(m[row][i] === value) {
            return false;
        }
    }
    return true;
}

function checkColumn(m, column, value) {
    for(let i = 0; i < m.length; i++) {
        if(m[i][column] === value) {
            return false;
        }
    }
    return true;
}

function checkSquare(m, column, row, value) {
    let col = 0;
    let r = 0;
    let s = 3;
    while(column >= col + s) {
        col += s;
    }
    while(row >= r + s) {
        r += s;
    }
    for(let i = r; i < r + s; i++) {
        for(let j = col; j < col + s; j++) {
            if(m[i][j] === value) {
                return false;
            }
        }
    }
    return true;
}

function checkValue(m, column, row, value) {
    return (checkRow(m, row, value) && checkColumn(m, column, value) && checkSquare(m, column, row, value));
}

function solvePuzzle(m, p) {
    var limit = 9, i, row, column, value, found;
    for(i = 0; i < p.length;) {
        row = p[i][0];
        column = p[i][1];
        value = m[row][column] + 1;
        found = false;
        while(!found && value <= limit) {
            if(checkValue(m, column, row, value)) {
                found = true;
                m[row][column] = value;
                i++;
            }
            else {
                value++;
            }
        }
        if(!found) {
            m[row][column] = 0;
            i--;
        }
    }
    return m;
}

module.exports = function solveSudoku(matrix) {
    var emptyPositions = saveEmptyPositions(matrix);
    return solvePuzzle(matrix, emptyPositions);
};