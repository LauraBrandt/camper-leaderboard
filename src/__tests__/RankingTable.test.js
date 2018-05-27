import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import RankingTable from '../Components/RankingTable';
import TableRow from '../Components/TableRow';
import SortingButton from '../Components/SortingButton';

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

    it('has 4 sorting buttons', () => {
      expect(component.find(SortingButton)).toHaveLength(4);
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

    it('passes the correct props to the SortingButtons', () => {
      const component = shallow(<RankingTable />);

      const buttons = component.find(SortingButton);

      expect(buttons.at(0).prop('type')).toEqual('recent');
      expect(buttons.at(0).prop('direction')).toEqual('up');
      expect(buttons.at(0).prop('inactive')).toEqual(true);
      expect(buttons.at(0).prop('handleClick')).toEqual(component.instance().handleSort);
      
      expect(buttons.at(1).prop('type')).toEqual('recent');
      expect(buttons.at(1).prop('direction')).toEqual('down');
      expect(buttons.at(1).prop('inactive')).toBeFalsy();
      expect(buttons.at(1).prop('handleClick')).toEqual(component.instance().handleSort);
      
      expect(buttons.at(2).prop('type')).toEqual('alltime');
      expect(buttons.at(2).prop('direction')).toEqual('up');
      expect(buttons.at(2).prop('inactive')).toBeFalsy();
      expect(buttons.at(2).prop('handleClick')).toEqual(component.instance().handleSort);
      
      expect(buttons.at(3).prop('type')).toEqual('alltime');
      expect(buttons.at(3).prop('direction')).toEqual('down');
      expect(buttons.at(3).prop('inactive')).toBeFalsy();
      expect(buttons.at(3).prop('handleClick')).toEqual(component.instance().handleSort);
    });
  });
});