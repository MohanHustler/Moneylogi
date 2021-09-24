import React, { useState, Fragment } from 'react';

import { Form } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import ShowIcon from '../../../images/icons/show.svg';
import HideIcon from '../../../images/icons/hide.svg';
import ChangePasswordBanner from '../../../images/change-password.svg';

import Header from '../../components/header';
import Footer from '../../components/footer';
import { resetPassword } from './reset-password-action';

const ResetPassword = (props) => {
  const { isLoading } = useSelector((state) => state.resetPassword);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmnewpassword, setConfirmnewpassword] = useState('');

  const [validated, setValidated] = useState(false);
  const [oldpasswordField, setOldpasswordField] = useState(true);
  const [newpasswordField, setNewpasswordField] = useState(true);
  const [confirmnewpasswordField, setConfirmnewpasswordField] = useState(true);

  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const resetPasswordSuccessCallback = () => {
    props.history.push('/dashboard');
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,10}$/;

    return regex.test(password);
  };

  const handleResetPassword = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
    }
    setValidated(true);

    if (email && oldpassword && newpassword && confirmnewpassword) {
      if (
        validatePassword(newpassword) &&
        validatePassword(confirmnewpassword)
      ) {
        if (newpassword !== confirmnewpassword) {
          setPasswordMismatch(true);
        } else {
          resetPassword(
            email,
            oldpassword,
            newpassword,
            confirmnewpassword,
            dispatch,
            resetPasswordSuccessCallback
          );
        }
      } else {
        setValidated(false);

        if (!validatePassword(newpassword)) {
          setInvalidNewPassword(!invalidNewPassword);
        }
        if (!validatePassword(confirmnewpassword)) {
          setInvalidConfirmPassword(!invalidConfirmPassword);
        }
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="onboarding-page ">
        <div className="onboarding-image">
          <div className="onboarding-img">
            <img alt="password" src={ChangePasswordBanner} />
          </div>
        </div>
        <div className="onboarding-content">
          <div className="onboarding-header">
            <label>RESET PASSWORD</label>
            <h2>Your Account</h2>
          </div>
          <div className="onboarding-fields">
            <p>
              <label>Hint:</label> Password should be atleast 8 character long.
              To make it stronger, use upper and lower case letter, number and
              symbols like # * ! & ^ %
            </p>
            <Form validated={validated}>
              <div className="custom-input">
                <label>Email ID</label>
                <div>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Email ID"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {email === '' && (
                    <Form.Control.Feedback type="invalid">
                      Please enter the email
                    </Form.Control.Feedback>
                  )}
                </div>
              </div>

              <div className="custom-input">
                <label>Password</label>
                <div>
                  {oldpasswordField && (
                    <Form.Control
                      required
                      type="password"
                      name="oldpassword"
                      value={oldpassword}
                      placeholder="Password"
                      onChange={(e) => setOldpassword(e.target.value)}
                    />
                  )}
                  {!oldpasswordField && (
                    <Form.Control
                      required
                      type="text"
                      name="oldpassword"
                      value={oldpassword}
                      placeholder="Password"
                      onChange={(e) => setOldpassword(e.target.value)}
                    />
                  )}

                  {!oldpasswordField && (
                    <div
                      className="show-img"
                      onClick={() => setOldpasswordField(!oldpasswordField)}
                    >
                      <img alt="show" src={ShowIcon} />
                    </div>
                  )}

                  {oldpasswordField && (
                    <div
                      className="hide-img"
                      onClick={() => setOldpasswordField(!oldpasswordField)}
                    >
                      <img alt="hide" src={HideIcon} />
                    </div>
                  )}

                  {oldpassword === '' && (
                    <Form.Control.Feedback type="invalid">
                      Please enter the password
                    </Form.Control.Feedback>
                  )}
                </div>
              </div>

              <div className="custom-input">
                <label>New Password</label>
                {newpasswordField && (
                  <Form.Control
                    required
                    type="password"
                    name="newpassword"
                    value={newpassword}
                    placeholder="New Password"
                    onChange={(e) => setNewpassword(e.target.value)}
                    className={`${
                      passwordMismatch ||
                      (invalidNewPassword && 'error-custom-border')
                    }`}
                  />
                )}
                {!newpasswordField && (
                  <Form.Control
                    required
                    type="text"
                    name="newpassword"
                    value={newpassword}
                    placeholder="New Password"
                    onChange={(e) => setNewpassword(e.target.value)}
                    className={`${
                      passwordMismatch ||
                      (invalidNewPassword && 'error-custom-border')
                    }`}
                  />
                )}

                {!newpasswordField && (
                  <div
                    className="show-img"
                    onClick={() => setNewpasswordField(!newpasswordField)}
                  >
                    <img alt="show" src={ShowIcon} />
                  </div>
                )}

                {newpasswordField && (
                  <div
                    className="hide-img"
                    onClick={() => setNewpasswordField(!newpasswordField)}
                  >
                    <img alt="hide" src={HideIcon} />
                  </div>
                )}
                {newpassword === '' && (
                  <Form.Control.Feedback type="invalid">
                    Please enter new password
                  </Form.Control.Feedback>
                )}
                {invalidNewPassword && (
                  <span className="custom-error-msg">
                    Invalid new password checkout hint
                  </span>
                )}
              </div>

              <div className="custom-input">
                <label>Confirm New Password</label>
                {confirmnewpasswordField && (
                  <Form.Control
                    required
                    type="password"
                    name="confirmnewpassword"
                    value={confirmnewpassword}
                    placeholder="Confirm New Password"
                    onChange={(e) => setConfirmnewpassword(e.target.value)}
                    className={`${
                      passwordMismatch ||
                      (invalidConfirmPassword && 'error-custom-border')
                    } `}
                  />
                )}
                {!confirmnewpasswordField && (
                  <Form.Control
                    required
                    type="text"
                    name="confirmnewpassword"
                    value={confirmnewpassword}
                    placeholder="Confirm New Password"
                    onChange={(e) => setConfirmnewpassword(e.target.value)}
                    className={`${
                      passwordMismatch ||
                      (invalidConfirmPassword && 'error-custom-border')
                    } `}
                  />
                )}

                {!confirmnewpasswordField && (
                  <div
                    className="show-img"
                    onClick={() =>
                      setConfirmnewpasswordField(!confirmnewpasswordField)
                    }
                  >
                    <img alt="show" src={ShowIcon} />
                  </div>
                )}

                {confirmnewpasswordField && (
                  <div
                    className="hide-img"
                    onClick={() =>
                      setConfirmnewpasswordField(!confirmnewpasswordField)
                    }
                  >
                    <img alt="hide" src={HideIcon} />
                  </div>
                )}

                {confirmnewpassword === '' && (
                  <Form.Control.Feedback type="invalid">
                    Please enter confirm new password
                  </Form.Control.Feedback>
                )}
                {newpassword !== '' && newpassword !== confirmnewpassword && (
                  <Form.Control.Feedback className="custom-error-msg">
                    Password mismatch
                  </Form.Control.Feedback>
                )}
                {invalidConfirmPassword && (
                  <span className="custom-error-msg">
                    Invalid confirm password checkout hint
                  </span>
                )}
              </div>
            </Form>
            <div className="onboarding-btn">
              <button
                className={`black-border-btn ${
                  isLoading && 'loading-button black-bg-loader'
                }`}
                onClick={handleResetPassword}
              >
                {!isLoading ? (
                  'Change'
                ) : (
                  <Fragment>
                    <div className="loader-button-gif-sec black-bg-loader-gif ">
                      <div className="loader-button-gif"></div>
                    </div>
                    <span className="laoder-span">Loading....</span>
                  </Fragment>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
