import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import App from '../App';
import RankingTable from '../Components/RankingTable';
import TableRow from '../Components/TableRow';

const fetch = require('node-fetch');
const users = [
  {username: "a", recent: 5, alltime: 10, img: "#"},
  {username: "b", recent: 4, alltime: 8, img: "#"},
  {username: "c", recent: 3, alltime: 6, img: "#"},
]
fetch.mockResponse(JSON.stringify( users ));

describe('App', () => {
  it('renders and matches snapshot', (done) => {
    const component = renderer.create(<App />);

    setImmediate(() => {
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
      done();
    }, 0);
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
