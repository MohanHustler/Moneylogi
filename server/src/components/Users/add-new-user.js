import React from 'react';

const AddNewUser = (props) => {
  return (
    <div className="add-new-user">
      <div className="new-user">
        <h1>For adding new user, click on Add new User Button.</h1>
      </div>
      <div className="add-new-user-btn">
        <button className="black-btn" onClick={props.handleAdduserPopupShow}>
          Add New User
        </button>
      </div>
    </div>
  );
};

export default AddNewUser;
