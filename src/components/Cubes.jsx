import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { BUTTON_MARGIN } from '../utils/constants';
import Table from '../helpers/Table';
import Button from './Button';
import Cell from './Cell';

export default class Cubes extends PureComponent {

    static propTypes = {
        initialWidth: PropTypes.number,
        initialHeight: PropTypes.number,
        cellSize: PropTypes.number,
    };

    static defaultProps = {
        initialWidth: 4,
        initialHeight: 4,
        cellSize: 50,
    };

    state = {
        matrix: [],
        width: 0,
        height: 0,
        cellSizeWithMargin: 0,
        activeRow: 0,
        activeCol: 0,
        rmButtonLeft: 0,
        rmButtonTop: 0,
        visibilityCol: 'hidden',
        visibilityRow: 'hidden',
    };

    componentDidMount() {
        this.init();
    };

    componentDidUpdate(props) {
        const { initialWidth, initialHeight, cellSize } = this.props;

        if (props.initialWidth !== initialWidth || props.initialHeight !== initialHeight || props.cellSize !== cellSize) {
            this.init();
        }
    }

    init() {
        const matrix = [];
        const {initialHeight, initialWidth, cellSize} = this.props;
        for (let row = 0; row < initialHeight; row++) {
            matrix.push(Table.createRow(row, initialWidth));
        }

        this.setState({
            matrix,
            width: initialWidth,
            height: initialHeight,
            cellSize,
            cellSizeWithMargin: cellSize + BUTTON_MARGIN,
        });
    };

    buildTable() {
        const {matrix} = this.state;
        const {cellSize} = this.props;

        return matrix.map(({row, cols}, indexRow) => {
            return <tr key={row}>{
                cols.map(({col}, indexCol) => {
                    return <Cell col={col} row={row} key={col} height={cellSize} width={cellSize}
                                 onMouseEnter={this.onMouseEnter(indexRow, indexCol)}/>
                })
            }
            </tr>;
        });
    };

    addRow = () => {
        const {matrix, height} = this.state;
        matrix.push(Table.createRow(height, matrix[0].cols.length));

        this.setState({
            matrix,
            height: height + 1,
        });
    };

    addColumn = () => {
        const {matrix, width} = this.state;
        const newMatrix = matrix.map(item => {
            item.cols.push(Table.createColumn(width));
            return item;
        });

        this.setState({
            matrix: newMatrix,
            width: width + 1,
        });
    };

    removeRow = () => {
        const {matrix, activeRow} = this.state;

        if (matrix.length > 1) {
            const newMatrix = matrix.filter((item, index) => index !== activeRow);

            this.setState({
                matrix: newMatrix,
                visibilityRow: Table.getVisibility(newMatrix, 'row', 'visible'),
            });
        }
    };

    removeColumn = () => {
        const {matrix, activeCol} = this.state;

        if (matrix[0].cols.length > 1) {
            const newMatrix = matrix.map(item => {
                item.cols = item.cols.filter((item, index) => index !== activeCol);
                return item;
            });

            this.setState({
                matrix: newMatrix,
                visibilityCol: Table.getVisibility(newMatrix, 'col', 'visible'),
            });
        }
    };

    onMouseEnter = (activeRow, activeCol) => {
        const {matrix, cellSizeWithMargin} = this.state;

        return () => {
            this.setState({
                activeRow,
                activeCol,
                rmButtonLeft: activeCol * cellSizeWithMargin,
                rmButtonTop: activeRow * cellSizeWithMargin,
                visibilityRow: Table.getVisibility(matrix, 'row', 'visible'),
                visibilityCol: Table.getVisibility(matrix, 'col', 'visible'),
            });
        };
    };

    onMouseLeave = (e) => {
        if (e.relatedTarget.className && !e.relatedTarget.className.includes('remove')) {
            this.setState({
                visibilityCol: 'hidden',
                visibilityRow: 'hidden',
            });
        }
    };

    render() {
        const {rmButtonLeft, rmButtonTop, cellSizeWithMargin, visibilityCol, visibilityRow} = this.state;
        const {cellSize} = this.props;

        return (
            <div>
                <div className="top" style={{marginLeft: cellSizeWithMargin}}>
                    <Button style={{left: rmButtonLeft, visibility: visibilityCol, width: cellSize, height: cellSize}}
                            onClick={this.removeColumn}
                            onMouseLeave={this.onMouseLeave}
                            type="remove"
                            title="-"/>
                </div>
                <div className="container">
                    <div className="left">
                        <Button style={{top: rmButtonTop, visibility: visibilityRow, width: cellSize, height: cellSize}}
                                onClick={this.removeRow}
                                onMouseLeave={this.onMouseLeave}
                                type="remove"
                                title="-"/>
                    </div>
                    <table className="table" onMouseLeave={this.onMouseLeave}>
                        <tbody>
                            {this.buildTable()}
                        </tbody>
                    </table>
                    <div className="right">
                        <Button style={{width: cellSize, height: cellSize}}
                                onClick={this.addColumn}
                                type="add"
                                title="+"/>
                    </div>
                </div>
                <div className="bottom" style={{marginLeft: cellSizeWithMargin}}>
                    <Button style={{width: cellSize, height: cellSize}}
                            onClick={this.addRow}
                            type="add"
                            title="+"/>
                </div>
            </div>
        );
    }
};
