import React from 'react';
import RankingTable from './Components/RankingTable';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>FCC Camper Leaderboard</h1>
        </header>
        <RankingTable />
        <footer className="footer">Designed and coded by <a href="https://github.com/LauraBrandt">Laura Brandt</a></footer>
      </div>
    );
  }
}

export default App;
