import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {

    static propTypes = {
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    };

    render() {
        const { type, title, ...buttonProps } = this.props;

        return (
            <button {...buttonProps} className={`button ${type}-button`}>{ title }</button>
        );

    }
}
