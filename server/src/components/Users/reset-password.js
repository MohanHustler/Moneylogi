import React, { useState } from 'react';

import { Form } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import ProfileImage from '../../../images/icons/default-user-profile.svg';
import Hide from '../../../images/icons/hide.svg';
import Show from '../../../images/icons/show.svg';

const ResetPassword = ({
  heading,
  message,
  newUserName,
  newUserEmail,
  newUserPassword,
  closePopup,
  handleSubmit,
}) => {
  const [passwordField, setPasswordField] = useState(true);
  const [copied, setCopied] = useState(false);

  return (
    <div className="reset-password">
      <div className="reset-password-header">
        <h2>{heading}</h2>
      </div>
      <div className="reset-password-body">
        <div className="reset-password-img">
          <img alt="reset password" src={ProfileImage} />
        </div>
        <p className="reset-password-message">{message}</p>
        <div className="reset-password-user">
          <h5>{newUserName}</h5>
          <label>{newUserEmail}</label>
        </div>
        <div className="reset-password-details">
          <p>Password</p>
          <div className="reset-password-field">
            {passwordField && (
              <Form.Control
                readOnly
                type="password"
                value="Dotted"
                className="reset-password-field-bullet"
              />
            )}
            {!passwordField && (
              <Form.Control
                readOnly
                type="text"
                value={newUserPassword}
                className="reset-password-field-text"
              />
            )}
            {!passwordField && (
              <div
                className="reset-password-hide-img"
                onClick={() => setPasswordField(!passwordField)}
              >
                <img alt="hide" src={Hide} />
              </div>
            )}

            {passwordField && (
              <div
                className="reset-password-show-img"
                onClick={() => setPasswordField(!passwordField)}
              >
                <img alt="show" src={Show} />
              </div>
            )}
          </div>
          <div className="copy-to-clipboard">
            <CopyToClipboard
              text={newUserPassword}
              onCopy={() => setCopied(true)}
            >
              <span>Click to copy password</span>
            </CopyToClipboard>
            {copied ? (
              <span className="copy-to-clipboard-msg">Copied.</span>
            ) : null}
          </div>
        </div>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closePopup}>
          Cancel
        </button>
        <button className="black-border-btn" onClick={handleSubmit}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
