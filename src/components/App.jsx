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

  const fetchUsers = useCallback(async () => {
    try {
      const usersData = (await getUsers()) || [];
      setUsers(usersData.sort((a, b) => a['id'] - b['id']).slice(indexes.start, indexes.end));
    } catch (error) {
      console.log(error)
    }
  }, [indexes]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortUsers = useMemo(() => {
    switch (true) {
      case typeOfSort === 'iD':
        return [...users].sort((a, b) => a[typeOfSort] - b[typeOfSort])
      case typeOfSort === 'firstName':
        return [...users].sort((a, b) => a[typeOfSort].localeCompare(b[typeOfSort]))
      case typeOfSort === 'lastName':
        return [...users].sort((a, b) => a[typeOfSort].localeCompare(b[typeOfSort]))
      case typeOfSort === 'firstName':
        return [...users].sort((a, b) => a[typeOfSort].localeCompare(b[typeOfSort]))
      case typeOfSort === 'email':
        return [...users].sort((a, b) => a[typeOfSort].localeCompare(b[typeOfSort]))
      case typeOfSort === 'phone':
        return [...users].sort((a, b) => a[typeOfSort].localeCompare(b[typeOfSort]))
      case typeOfSort === 'state':
        return [...users].sort((a, b) => a.adress[typeOfSort].localeCompare(b.adress[typeOfSort]))
      default:
        return users;
    }
  }, [typeOfSort, users, filterState])

  const sortSearchUsers = useMemo(() => {
    if (Boolean(filterState)) {
      return sortUsers.filter(user => user.adress.state === filterState)
    }
    return sortUsers.filter(user => user.firstName.toLowerCase().includes(searchValue));
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
