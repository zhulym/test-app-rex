//libraries
import React from 'react';
//styles
import '../UsersList/UsersList.scss';

const UsersList = (props) => {
  const fields = ['id', 'First Name', 'Last Name', 'Email', 'Phone', 'State',]
  let sortTargetValue;

  const showProfile = (e) => {
    const currentId = Number(e.target.parentNode.firstChild.innerText);
    const currentUser = props.sortUsers.find(user => user.id === currentId);
    props.setIsProfileCallBack(true);
    props.setCurrentProfileCallBack(currentUser);
  }

  const setSortValue = (e) => {
    let sortTarget = e.target.parentNode.innerText;
    sortTarget = sortTarget.charAt(0).toLowerCase() + sortTarget.slice(1, sortTarget.length);
    sortTargetValue = sortTarget.slice(0, sortTarget.length - 2).split(' ').join('');

    if (props.typeOfSort.toLowerCase() === sortTargetValue.toLowerCase()) {
      props.setIsClickedSortCallBack(!props.isClickedSort);
    } else {
      props.setIsClickedSortCallBack(false);
    }
    props.setTypeOfSortCallBack(sortTargetValue);
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
        {props.sortUsers.map((user, i) => (
          <tr key={user.id + user.phone} className="user__item" onClick={showProfile}>
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
    </table >
  )
}
export default UsersList;