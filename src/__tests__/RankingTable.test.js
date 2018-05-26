import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import RankingTable from '../Components/RankingTable';
import TableRow from '../Components/TableRow';

describe('RankingTable', () => {
  it('renders and matches snapshot', () => {
    const component = renderer.create(<RankingTable />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  describe('content', () => {
    let component;
    beforeEach(() => {
      component = shallow(<RankingTable />);
    });

    it('has a table', () => {
      expect(component.find('table')).toHaveLength(1);
    });

    it('has 4 columns', () => {
      expect(component.find('table th')).toHaveLength(4);
    });

    it('contains the same number of TableRow components as users', () => {
      const fakeUsers = [
        {username: "", recent: 0, alltime: 0, img: ""}, 
        {username: "", recent: 0, alltime: 0, img: ""}, 
        {username: "", recent: 0, alltime: 0, img: ""}];
      component.setState({ users: fakeUsers });

      const numTableRows = component.find(TableRow).length;
      const numUsers = component.state('users').length;
      expect(numTableRows).toEqual(numUsers);
    });
  });

  describe('child components', () => {
    it('passes correct props to TableRow', () => {
      const component = shallow(<RankingTable />);
      const fakeUsers = [{username: "testuser", recent: 5, alltime: 10, img: "www.example.com"}];
      component.setState({ users: fakeUsers });

      const tableRow = component.find(TableRow).at(0);
      expect(tableRow.prop('index')).toBe(0);
      expect(tableRow.prop('user')).toEqual(fakeUsers[0]);
    });
  });
});