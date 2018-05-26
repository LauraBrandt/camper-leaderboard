import React from 'react';
import TableRow from './TableRow';
import users from '../data';

class RankingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
    this.renderRows = this.renderRows.bind(this);
  }

  componentDidMount() {
    this.setState({ users });
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
              <th>Points in last 30 days</th>
              <th>All time points</th>
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
