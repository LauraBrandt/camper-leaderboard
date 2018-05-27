import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import SortingButton from '../Components/SortingButton';

describe('SortingButton', () => {
  let mockProps = {
    type: "recent",
    direction: "up",
    handleClick: jest.fn()
  };
  
  it('renders and matches snapshot', () => {
    const renderedComponent = renderer.create(<SortingButton {...mockProps}/>);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  describe('content', () => {
    let component;
    const resetProps = () => mockProps = {
      type: "recent",
      direction: "up",
      handleClick: jest.fn()
    }

    beforeEach(() => {
      component = shallow(<SortingButton {...mockProps}/>);
    });
    
    afterEach(() => {
      resetProps();
    });

    it('contains a button', () => {
      expect(component.find('button')).toHaveLength(1);
    });

    it('has the correct icon', () => {
      expect(component.find('.fa-caret-up')).toHaveLength(1);
    });

    it('has the correct button classes', () => {
      expect(component.find('button').prop('className')).toBe('recent up');
      
      component.setProps({inactive: true});
      expect(component.find('button').prop('className')).toBe('recent up inactive');
    });

    it('has the correct button title', () => {
      expect(component.find('button').prop('title')).toBe('Sort descending');
    });
  });

  describe('interactions', () => {
    const component = shallow(<SortingButton {...mockProps}/>);
    expect(mockProps.handleClick).not.toBeCalled();
    component.find('button').simulate('click');
    expect(mockProps.handleClick).toBeCalled();
    mockProps.handleClick.mockReset();
  });
});