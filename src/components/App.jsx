//libraries
import React, { useCallback, useState, useEffect, useMemo } from 'react';
//components
import ProfileCard from './ProfileCard/index';
import UsersList from './UsersList/index';
import SearchInput from './UsersList/SearchInput/index';
import FilterState from './UsersList/FilterState/index';
import Pagination from './Pagination/index';
//api
import { getUsers } from "../api/users";
//styles
import './App.scss';

const App = () => {
  const [users, setUsers] = useState([]);
  const [indexes, setIndexes] = useState({ start: 0, end: 20 });
  const [isProfile, setIsProfile] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({});
  const [typeOfSort, setTypeOfSort] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterState, setFilterState] = useState('');
  const [isClickedSort, setIsClickedSort] = useState(false);
  let direction = !isClickedSort ? 'asc' : 'desc';

  const fetchUsers = useCallback(async () => {
    try {
      const usersData = (await getUsers()) || [];
      setUsers(usersData.slice(indexes.start, indexes.end));
    } catch (error) {
      console.log(error)
    }
  }, [indexes]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortData = (data = [], type, order = direction) => {
    return [...data].sort((a, b) => order === 'asc' ? a[type]?.localeCompare(b[type]) : b[type]?.localeCompare(a[type]));
  }

  const sortUsers = useMemo((order) => {
    switch (true) {
      case typeOfSort === 'id' && direction === 'asc':
        return [...users].sort((a, b) => a[typeOfSort] - b[typeOfSort]);
      case typeOfSort === 'id' && direction === 'desc':
        return [...users].sort((a, b) => b[typeOfSort] - a[typeOfSort]);
      case typeOfSort === 'state' && direction === 'asc':
        return [...users].sort((a, b) => a.adress[typeOfSort].localeCompare(b.adress[typeOfSort]))
      case typeOfSort === 'state' && direction === 'desc':
        return [...users].sort((a, b) => b.adress[typeOfSort].localeCompare(a.adress[typeOfSort]))
      default:
        return sortData(users, typeOfSort, order)
    }
  }, [typeOfSort, users, filterState, sortData])

  const sortSearchUsers = useMemo(() => {
    if (Boolean(filterState)) {
      return sortUsers.filter(user => user.adress.state === filterState)
    }
    return sortUsers.filter(user => user.firstName.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue, sortUsers, filterState])

  const filterUsers = (e) => {
    setTypeOfSort('');
    setFilterState(e.target.value);
  }

  const states = sortUsers.map(user => user.adress.state);

  return (
    <div className="App">
      <h1 className="users__title">Users App</h1>
      <div className="sort-search__container">
        <SearchInput searchValue={searchValue} setSearchValueCallBack={setSearchValue} />
        <FilterState states={states} filterUsers={filterUsers} />
      </div>
      <div className="users__container">
        {sortSearchUsers.length ?
          (<>
            <UsersList
              sortUsers={sortSearchUsers}
              setTypeOfSortCallBack={setTypeOfSort}
              setIsProfileCallBack={setIsProfile}
              setCurrentProfileCallBack={setCurrentProfile}
              setIsClickedSortCallBack={setIsClickedSort}
              typeOfSort={typeOfSort}
              isClickedSort={isClickedSort}
            />
          </>
          ) : (<h2 className="users__not-found">No Users! Change search and filter values!</h2>)}
        <Pagination
          indexes={indexes}
          setIndexesCallBack={setIndexes}
          sortSearchUsers={sortSearchUsers}
          setSearchValueCallBack={setSearchValue}
        />
        {sortSearchUsers.length ? (<ProfileCard currentProfile={currentProfile} isProfile={isProfile} />) : ''}
      </div>
    </div>
  );
}

export default App;
