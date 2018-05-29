import React from 'react';
import {shallow, mount} from 'enzyme';
import renderer from 'react-test-renderer';
import RankingTable from '../Components/RankingTable';
import TableRow from '../Components/TableRow';
import SortingButton from '../Components/SortingButton';

const fetch = require('node-fetch');
const users = [
  {username: "a", recent: 5, alltime: 10, img: "#"},
  {username: "b", recent: 4, alltime: 8, img: "#"},
  {username: "c", recent: 3, alltime: 6, img: "#"},
]

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponse(JSON.stringify( users ));
});

describe('RankingTable', () => {
  it('renders and matches snapshot', (done) => {
    const component = renderer.create(<RankingTable />);

    setImmediate(() => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      done();
    }, 0);
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
    let component;
    const state = {
      users: [
        {username: "a", recent: 1, alltime: 2},
        {username: "b", recent: 3, alltime: 1},
        {username: "c", recent: 2, alltime: 3}
      ],
      inactive: 'recent up' 
    }

    describe('handleSort', () => {
      beforeEach((done) => {
        component = shallow(<RankingTable />);
        setImmediate(() => {
          component.setState( state );
          done();
        }, 0);
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
      beforeEach((done) => {
        component = mount(<RankingTable />);
        setImmediate(() => {
          component.setState( state );
          done();
        }, 0);
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

  describe('message', () => {
    it('sets initial message to "Loading..." and renders it', () => {
      const component = shallow(<RankingTable />);
      expect(component.state('message')).toBe("Loading . . .");
      expect(component.find('.message').text()).toContain("Loading . . .");
    });

    it("changes message to empty string on successful api call and doesn't render it", () => {
      const component = shallow(<RankingTable />);
      expect.assertions(2);
      return component.instance().apiCall()
        .then(() => {
          expect(component.state('message')).toBe('');
          component.update();
          expect(component.find('.message')).toHaveLength(0);
        })
    });

    it('sets error message on failed api call and renders it', () => {
      fetch.mockReject(new Error('error'));
      expect.assertions(2);
      const component = shallow(<RankingTable />);

      return component.instance().apiCall()
        .then(() => {
          expect(component.state('message')).toContain('Sorry');
          component.update();
          expect(component.find('.message').text()).toContain('Sorry');
        })
    });
  });

  describe('api call', () => {
    it('fetch called with correct url', () => {
      const component = shallow(<RankingTable />);
      expect(fetch).toBeCalled();
      const url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
      expect(fetch).toBeCalledWith(url);
    });

    it('sets state.users correctly after successful api call and renders them', () => {
      const component = shallow(<RankingTable />);
      expect.assertions(3);
      return component.instance().apiCall()
        .then(() => {
          expect(component.state('users')).toEqual(users);
          component.update();
          expect(component.find(TableRow)).toHaveLength(users.length);
          const firstUser = component.find(TableRow).at(0).prop('user');
          expect(firstUser).toEqual(users[0]);
        })
    });
  });
});