//libraries
import React from 'react';
//styles
import './SearchInput.scss';

const SearchInput = ({ searchValue, setSearchValueCallBack }) => {
  return (
    <div className="search__input">
      <form action="#">
        <input
          className="users__search-input"
          type="text"
          id="search-input"
          value={searchValue}
          placeholder="Search by name..."
          onChange={(e) => setSearchValueCallBack(e.target.value)}
        />
      </form>
    </div>
  )
}
export default SearchInput;