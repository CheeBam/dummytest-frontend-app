export const createColumn = (col) => {
    return { col }
};

export const createRow = (rowNumber, width) => {
    const rowData = { row: rowNumber, cols: []};
    for (let col = 0; col < width; col++) {
        rowData.cols.push(createColumn(col))
    }
    return rowData;
};

export const getVisibility = (matrix, type, status) => {
    const length = type === 'row' ? matrix.length : matrix[0].cols.length;

    return length < 2 ? 'hidden' : status;
};

export default {
    createColumn,
    createRow,
    getVisibility,
}
