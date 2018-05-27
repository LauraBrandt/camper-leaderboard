import React from 'react';
import PropTypes from 'prop-types';

const SortingButton = ({ type, direction, inactive, handleClick }) => {
  return(
    <div>
      <button 
        className={`${type} ${direction}${inactive ? ' inactive' : ''}`} 
        title={`Sort ${direction === 'up' ? 'descending' : 'ascending'}`}
        onClick={inactive ? null : handleClick}
      >
        <i className={`fas fa-caret-${direction}`}></i>
      </button>
    </div>
  );
}

SortingButton.propTypes = {
  type: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['up', 'down']),
  handleClick: PropTypes.func.isRequired,
  inactive: PropTypes.bool
}

export default SortingButton;
