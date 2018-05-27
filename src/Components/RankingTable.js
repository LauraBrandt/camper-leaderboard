import React from 'react';
import TableRow from './TableRow';
import SortingButton from './SortingButton';
import users from '../data';

class RankingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    }

    this.handleSort = this.handleSort.bind(this);
    this.renderRows = this.renderRows.bind(this);
  }

  componentDidMount() {
    this.setState({ users });
  }

  handleSort(e) {
    console.log(this)
    console.log(e.target)
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
                    <SortingButton type="recent" direction="up" inactive={true} handleClick={this.handleSort}/>
                    <SortingButton type="recent" direction="down" handleClick={this.handleSort}/>
                  </div>
                </div>
              </th>
              <th>
                <div className="points">
                  <span>All time points</span>
                  <div className="points-sorters">
                    <SortingButton type="alltime" direction="up" handleClick={this.handleSort}/>
                    <SortingButton type="alltime" direction="down" handleClick={this.handleSort}/>
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
