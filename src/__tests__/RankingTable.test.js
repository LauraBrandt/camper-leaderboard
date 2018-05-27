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

  describe('interactions', () => {
    describe('handleSort', () => {
      let component;
      const reset = () => {
        component = shallow(<RankingTable />);
        component.setState({ 
          users: [
            {username: "", recent: 1, alltime: 2},
            {username: "", recent: 3, alltime: 1},
            {username: "", recent: 2, alltime: 3}
          ],
          inactive: 'recent up' 
        });
      }
      
      beforeEach(() => {
        reset();
      });

      it("sorts 'recent up' and sets new state.inactive correctly", () => {
        component.setState({ inactive: 'recent down' });
        const event = {
          currentTarget: {
            classList: ['recent', 'up']
          }
        }

        component.instance().handleSort(event);
        expect(component.state('users')[0].recent).toBe(3);
        expect(component.state('users')[2].recent).toBe(1);
        expect(component.state('inactive')).toBe('recent up');
      });

      it("sorts 'recent down' and sets new state.inactive correctly", () => {
        const event = {
          currentTarget: {
            classList: ['recent', 'down']
          }
        }

        component.instance().handleSort(event);
        expect(component.state('users')[0].recent).toBe(1);
        expect(component.state('users')[2].recent).toBe(3);
        expect(component.state('inactive')).toBe('recent down');
      });

      it("sorts 'alltime down' and sets new state.inactive correctly", () => {
        const event = {
          currentTarget: {
            classList: ['alltime', 'down']
          }
        }

        component.instance().handleSort(event);
        expect(component.state('users')[0].alltime).toBe(1);
        expect(component.state('users')[2].alltime).toBe(3);
        expect(component.state('inactive')).toBe('alltime down');
      });

      it("sorts 'alltime up' and sets new state.inactive correctly", () => {
        const event = {
          currentTarget: {
            classList: ['alltime', 'up']
          }
        }

        component.instance().handleSort(event);
        expect(component.state('users')[0].alltime).toBe(3);
        expect(component.state('users')[2].alltime).toBe(1);
        expect(component.state('inactive')).toBe('alltime up');
      });
    });

    describe('handleSort integration', () => {
      let component;
      const reset = () => {
        component = mount(<RankingTable />);
        component.setState({
          users: [
            {username: "a", recent: 1, alltime: 2},
            {username: "b", recent: 3, alltime: 1},
            {username: "c", recent: 2, alltime: 3}
          ],
          inactive: 'recent up' 
        });
      }
      
      beforeEach(() => {
        reset();
      });

      it('calls handleSort correctly on buttonClick', () => {
        component.instance().handleSort = jest.fn();
        component.instance().forceUpdate();

        expect(component.instance().handleSort).not.toBeCalled();
        component.find('.recent.down').simulate('click');
        expect(component.instance().handleSort).toBeCalled();
        
        const argument = component.instance().handleSort.mock.calls[0][0]
        expect(argument.target.classList[0]).toBe('recent');
        expect(argument.target.classList[1]).toBe('down');

        component.instance().handleSort.mockRestore();
      });

      it('executes handleSort correctly on button click', () => {
        component.find('.recent.down').simulate('click');

        expect(component.state('users')[0].recent).toBe(1);
        expect(component.state('users')[2].recent).toBe(3);
        expect(component.state('inactive')).toBe('recent down');
      });
    });
  });
});