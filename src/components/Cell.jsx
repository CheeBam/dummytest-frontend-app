import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends PureComponent {

    static propTypes = {
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    render() {

        const { row, col, ...tdProps } = this.props;

        return (
            <td className="cell" {...tdProps}>{ `${row},${col}` }</td>
        );

    }
}
