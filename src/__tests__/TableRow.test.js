import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import TableRow from '../Components/TableRow';

describe('TableRow', () => {
  let mockProps = {
    user: {
      username: 'camper',
      recent: 5,
      alltime: 10,
      img: "#"
    },
    index: 0
  };
  
  it('renders and matches snapshot', () => {
    const renderedComponent = renderer.create(<TableRow {...mockProps}/>);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  describe('content', () => {
    let component;
    const resetProps = () => mockProps = {
      user: {
        username: 'camper',
        recent: 5,
        alltime: 10,
        img: "#"
      },
      index: 0
    }

    beforeEach(() => {
      resetProps();
      component = shallow(<TableRow {...mockProps}/>);
    });

    it('has 4 columns', () => {
      expect(component.find('tr td')).toHaveLength(4);
    });

    it('the first column contains the prop index + 1', () => {
      expect(component.find('td').at(0).text()).toBe((mockProps.index + 1).toString());
    });

    it('the second column contains a link with href containing the username from prop user', () => {
      const column = component.find('td').at(1);
      const link = column.find('a');
      expect(link).toHaveLength(1);
      expect(link.prop('href')).toContain(mockProps.user.username);
    });
    
    it('the previous link contains an image with src and alt that contains the username from prop user', () => {
      const container = component.find('td').at(1).find('a');
      
      const image = container.find('img');
      expect(image).toHaveLength(1);
      expect(image.prop('src')).toBe(mockProps.user.img);
      expect(image.prop('alt')).toContain(mockProps.user.username);
    });

    it('the previous link contains the username text from prop user', () => {
      const container = component.find('td').at(1).find('a');
      expect(container.text()).toContain(mockProps.user.username);
    });
    
    it('the third column contains the recent points from prop user', () => {
      expect(component.find('td').at(2).text()).toBe((mockProps.user.recent).toString());
    });
    
    it('the fourth column contains the all time points from prop user', () => {
      expect(component.find('td').at(3).text()).toBe((mockProps.user.alltime).toString());
    });
  });
});