import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../App';
import RankingTable from '../Components/RankingTable';
import TableRow from '../Components/TableRow';

describe('App', () => {
  it('renders and matches snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('content', () => {
    let component;
    beforeEach(() => {
      component = shallow(<App />);
    });

    it('has a header', () => {
      expect(component.find('header')).toHaveLength(1);
    });

    it('has a footer', () => {
      expect(component.find('footer')).toHaveLength(1);
    });

    it('has 1 RankingTable component', () => {
      expect(component.find(RankingTable)).toHaveLength(1);
    });
  });
});
