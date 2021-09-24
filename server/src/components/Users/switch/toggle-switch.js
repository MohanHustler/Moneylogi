import React from 'react';

const ToggleSwitch = ({ editDetails, setEditDetails }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={editDetails.status}
        id="togBtn"
        onChange={() =>
          setEditDetails({
            ...editDetails,
            status: !editDetails.status,
          })
        }
      />
      <div className="slider round">
        <span className="on-active">Active</span>
        <span className="off-inactive">Inactive</span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
