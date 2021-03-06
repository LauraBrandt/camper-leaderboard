import React from 'react';
import TableRow from './TableRow';
import SortingButton from './SortingButton';
// import users from '../data';

class RankingTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      inactive: 'recent up',
      message: 'Loading . . .'
    }

    this.apiCall = this.apiCall.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderHeaderPointsItem = this.renderHeaderPointsItem.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    return fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => response.json())
      .then(data => this.setState({ users: data, message: '' }))
      .catch(err => this.setState({ message: 'Sorry, there was a problem loading the users.' }));
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

  renderHeaderPointsItem(label, type) {
    return(
      <div className="points">
        <span>{label}</span>
        <div className="points-sorters">
          <SortingButton type={type} direction="up" inactive={this.state.inactive === `${type} up`} handleClick={this.handleSort}/>
          <SortingButton type={type} direction="down" inactive={this.state.inactive === `${type} down`} handleClick={this.handleSort}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ranking-table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr className="row header-row">
              <th>#</th>
              <th>Camper</th>
              <th>{this.renderHeaderPointsItem("Points in last 30 days", "recent")}</th>
              <th>{this.renderHeaderPointsItem("All time points", "alltime")}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.length > 0 ? this.renderRows() : 
            this.state.message && <tr><td colSpan="4" className="message">{this.state.message}</td></tr>}
          </tbody>
        </table>
      </div>
    );
  }
}

export default RankingTable;
