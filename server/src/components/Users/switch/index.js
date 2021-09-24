import React from 'react';

const Switch = () => {
  return (
    <div className="genrate-password">
      <div className="normal-switch">
        <label>
          <input className="switch" type="checkbox" readOnly checked={true} />
          <div>
            <div></div>
          </div>
        </label>
      </div>
      <span>Automatically generate a password</span>
    </div>
  );
};

export default Switch;
