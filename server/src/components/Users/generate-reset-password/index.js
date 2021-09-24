import React from 'react';

const GenerateResetPassword = ({ handleGeneratePassword }) => {
  return (
    <div className="generate-reset">
      <div className="generate-reset-header">
        <h2>Reset Password</h2>
      </div>
      <p className="generate-reset-message">
        To generate new password, Click on Generate button
      </p>
      <button className="black-border-btn" onClick={handleGeneratePassword}>
        GENERATE
      </button>
    </div>
  );
};

export default GenerateResetPassword;
