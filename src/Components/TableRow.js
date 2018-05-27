import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ user, index }) => {
  return(
    <tr className="row">
      <td>{index+1}</td>
      <td>
        <a href={`https://www.freecodecamp.org/${user.username}`} className="user-info">
          <img src={user.img} alt={`${user.username} avatar`}/>
          <p>{user.username}</p>
        </a>
      </td>
      <td>{user.recent}</td>
      <td>{user.alltime}</td>
    </tr>
  );
}

TableRow.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    recent: PropTypes.number.isRequired,
    alltime: PropTypes.number.isRequired,
    img: PropTypes.string
  })
}

export default TableRow;
