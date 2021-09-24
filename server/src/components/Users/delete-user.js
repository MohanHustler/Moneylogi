import React from 'react';

import AlertImage from '../../../images/alert.png';

const DeleteUser = ({ deletuserPopupClose, handleDeleteUser }) => {
  return (
    <div>
      <div className="delete-reason">
        <h1>Delete</h1>
        <div className="reasons">
          <label>
            <img src={AlertImage} />
          </label>
          <span>Are you sure? You want to delete this user.</span>
        </div>
        <div className="delete-reason-button">
          <label>
            <button className="cancel-btn" onClick={deletuserPopupClose}>
              Cancel
            </button>
          </label>
          <span>
            <button className="black-border-btn" onClick={handleDeleteUser}>
              Ok
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
