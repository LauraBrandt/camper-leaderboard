import React from 'react';
import TableRow from './TableRow';
import SortingButton from './SortingButton';
import users from '../data';

class RankingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      inactive: 'recent up'
    }

    this.handleSort = this.handleSort.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  componentDidMount() {
    this.setState({ users });
  }

  handleSort(e) {
    const type = e.currentTarget.classList[0];
    const direction = e.currentTarget.classList[1];
    const sign = direction === 'up' ? -1 : 1;
    
    const users = this.state.users;
    users.sort((a, b) => sign * (a[type] - b[type]));
    this.setState({ users, inactive: `${type} ${direction}` })
  }

  renderRows() {
    return this.state.users.map((user, i) => 
      <TableRow user={user} index={i} key={user.username} />
    )
  }

  render() {
    return (
      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr className="row header-row">
              <th>#</th>
              <th>Camper</th> 
              <th>
                <div className="points">
                  <span className="points-label">Points in last 30 days</span>
                  <div className="points-sorters">
                    <SortingButton type="recent" direction="up" inactive={this.state.inactive === 'recent up'} handleClick={this.handleSort}/>
                    <SortingButton type="recent" direction="down" inactive={this.state.inactive === 'recent down'} handleClick={this.handleSort}/>
                  </div>
                </div>
              </th>
              <th>
                <div className="points">
                  <span>All time points</span>
                  <div className="points-sorters">
                    <SortingButton type="alltime" direction="up" inactive={this.state.inactive === 'alltime up'} handleClick={this.handleSort}/>
                    <SortingButton type="alltime" direction="down" inactive={this.state.inactive === 'alltime down'} handleClick={this.handleSort}/>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.users && this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RankingTable;
