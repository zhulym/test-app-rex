//libraries
import React from 'react';
//styles
import './ProfileCard.scss';

const ProfileCard = ({ currentProfile, isProfile }) => {
  return (
    <>
      {isProfile && (
        <div className="profile__container">
          <div className="profile__info">
            <h2>Profile Info:</h2>
            <p>Selected Profile: {currentProfile.firstName} {currentProfile.lastName}</p>
            <p>Description: {currentProfile.description}</p>
            <p>Address: {currentProfile.adress.streetAddress}</p>
            <p>City: {currentProfile.adress.city}</p>
            <p>State: {currentProfile.adress.state}</p>
            <p>Index: {currentProfile.adress.zip}</p>
          </div>
        </div>
      )
      }
    </>
  )
}
export default ProfileCard;