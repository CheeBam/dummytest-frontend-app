export default class Table {

    static createColumn = (col) => {
        return { col }
    };

    static createRow = (rowNumber, width) => {
        const rowData = { row: rowNumber, cols: []};
        for (let col = 0; col < width; col++) {
            rowData.cols.push(Table.createColumn(col))
        }
        return rowData;
    };

    static getVisibility = (matrix, type, status) => {
        const length = type === 'row' ? matrix.length : matrix[0].cols.length;

        return length < 2 ? 'hidden' : status;
    }
}
