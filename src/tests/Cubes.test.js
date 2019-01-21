import React from 'react';
import { shallow, mount } from 'enzyme';

import Cubes from '../components/Cubes';
import Cell from '../components/Cell';
import Button from '../components/Button';

describe('Cubes', () => {

    const params = {
        tableClass: 'table',
    };

    const props = {
        initialHeight: 5,
        initialWidth: 5,
        cellSize: 60,
    };

    function getRowCount(component) {
        return component.find(`.${params.tableClass} tr`).length;
    }

    function getColCount(component) {
        return component.find(`.${params.tableClass} tr`).first().find(Cell).length;
    }

    describe('#render', () => {

        describe('render Cubes component with props', () => {

            it('check rows', () => {
                const wrapper = shallow(<Cubes {...props} />);
                expect(getRowCount(wrapper)).toBe(props.initialHeight);
            });

            it('check cols', () => {
                const wrapper = shallow(<Cubes {...props} />);
                wrapper.find(`.${params.tableClass} tr`).forEach((el) => {
                    expect(el.find(Cell).length).toBe(props.initialWidth);
                });
            });

            it('check size', () => {
                const wrapper = mount(<Cubes {...props} />);
                expect(wrapper.find(Cell).first().find('td').prop('height')).toBe(props.cellSize);
                expect(wrapper.find(Cell).first().find('td').prop('width')).toBe(props.cellSize);
            });
        });

        describe('render Cubes component without props', () => {
            const defaultProps = {
                initialHeight: 4,
                initialWidth: 4,
                cellSize: 50,
            };

            it('check rows', () => {
                const wrapper = shallow(<Cubes />);
                expect(getRowCount(wrapper)).toBe(defaultProps.initialHeight);
            });

            it('check cols', () => {
                const wrapper = shallow(<Cubes />);
                wrapper.find(`.${params.tableClass} tr`).forEach((el) => {
                    expect(el.find(Cell).length).toBe(defaultProps.initialWidth);
                });
            });

            it('check size', () => {
                const wrapper = mount(<Cubes />);
                expect(wrapper.find(Cell).first().find('td').prop('height')).toBe(defaultProps.cellSize);
                expect(wrapper.find(Cell).first().find('td').prop('width')).toBe(defaultProps.cellSize);
            });
        });
    });


    describe('#buttons', () => {
        function subtract(a, b) {
            return a - b;
        }

        function checkButton(component, className, result, countAction) {
            const prevCount = countAction(component);
            component.find(`.${className}`).find(Button).simulate('click');
            const nextCount = countAction(component);
            expect(subtract(nextCount, prevCount)).toBe(result);
        }

        describe('check add buttons', () => {
            it('add row click event', () => {
                const wrapper = shallow(<Cubes {...props} />);
                checkButton(wrapper, 'bottom', 1, getRowCount)
            });

            it('add column click event', () => {
                const wrapper = shallow(<Cubes {...props} />);
                checkButton(wrapper, 'right', 1, getColCount)
            });
        });

        describe('check remove buttons', () => {
            it('remove row click event', () => {
                const wrapper = shallow(<Cubes {...props} />);
                checkButton(wrapper, 'left', -1, getRowCount)
            });

            it('remove column click event', () => {
                const wrapper = shallow(<Cubes {...props} />);
                checkButton(wrapper, 'top', -1, getColCount)
            });
        });

        describe('check remove buttons on 1x1 table', () => {
            const newProps = {
                initialHeight: 1,
                initialWidth: 1,
                cellSize: 50,
            };

            it('remove row click event', () => {
                const wrapper = shallow(<Cubes {...newProps} />);
                checkButton(wrapper, 'left', 0, getRowCount)
            });

            it('remove column click event', () => {
                const wrapper = shallow(<Cubes {...newProps} />);
                checkButton(wrapper, 'top', 0, getColCount)
            });
        });

    });


});
