//libraries
import React from 'react';
//styles
import '../UsersList/UsersList.scss';

const UsersList = ({ sortUsers, setTypeOfSortCallBack, setIsProfileCallBack, setCurrentProfileCallBack }) => {
  const fields = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'State',]

  const showProfile = (e) => {
    const currentId = Number(e.target.parentNode.firstChild.innerText);
    const currentUser = sortUsers.find(user => user.id === currentId);
    setIsProfileCallBack(true);
    setCurrentProfileCallBack(currentUser);
  }

  const setSortValue = (e) => {
    let sortTarget = e.target.parentNode.innerText;
    sortTarget = sortTarget.charAt(0).toLowerCase() + sortTarget.slice(1, sortTarget.length);
    let sortTargetValue = sortTarget.slice(0, sortTarget.length - 2).split(' ').join('');
    setTypeOfSortCallBack(sortTargetValue);
  }

  return (
    <table className="users__list" border="1" width="100%">
      <thead>
        <tr className="table__head">
          {fields.map(field => (
            <th key={field} onClick={setSortValue}>{field}<span className="table__sort">&#9660;</span></th>)
          )}
        </tr>
      </thead>
      <tbody>
        {sortUsers.map((user, i) => (
          <tr key={user.id + i} className="user__item" onClick={showProfile}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.adress.state}</td>
          </tr>
        )
        )}
      </tbody>
    </table>
  )
}
export default UsersList;