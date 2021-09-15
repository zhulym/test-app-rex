//libraries
import React from 'react';
//styles
import '../FilterState/FilterState.scss';

const FilterState = ({ filterUsers, states }) => {

  return (
    <div className="sort__select">
      <select className="sort__select-item" onChange={filterUsers}>
        <option value="">Filter by state:</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>)
        )}

      </select>
    </div>
  )
}
export default FilterState;