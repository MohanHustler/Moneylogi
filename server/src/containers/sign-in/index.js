import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Form } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import HomeBanner from '../../../images/home.svg';
import Hide from '../../../images/icons/hide.svg';
import Show from '../../../images/icons/show.svg';

import { signin } from './signin-action';

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

const SignIn = (props) => {
  const { isLoading } = useSelector((state) => state.signin);

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [passwordField, setPasswordField] = useState(true);

  const signinBtn = useRef();
  const prevEmail = usePrevious(email);
  const prevPassword = usePrevious(email);

  useEffect(() => {
    if (prevEmail !== email) {
      signinBtn.current.removeAttribute('disabled');
    }
    if (prevPassword !== password) {
      signinBtn.current.removeAttribute('disabled');
    }
  }, [email, password]);

  const loginDashboardCallback = () => {
    props.history.push('/dashboard');
  };
  const loginResetPasswordCallback = () => {
    props.history.push('/resetpassword');
  };
  const triggerSignin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
    }
    setValidated(true);

    if (email && password) {
      signin(
        email,
        password,
        dispatch,
        loginDashboardCallback,
        loginResetPasswordCallback
      );
      signinBtn.current.setAttribute('disabled', true);
    }
  };

  return (
    <div>
      <div className="onboarding-page signin-page">
        <div className="onboarding-image">
          <div className="onboarding-img">
            <img alt="home" src={HomeBanner} />
          </div>
        </div>
        <div className="onboarding-content signin-content">
          <div className="onboarding-header">
            <label>SIGN IN</label>
            <h2>Your Account</h2>
          </div>
          <Form noValidate validated={validated}>
            <div className="onboarding-fields signin-fileds">
              <div className="custom-input">
                <label>User name / Email id</label>
                <Form.Control
                  required
                  type="text"
                  value={email}
                  name="email"
                  autoComplete="off"
                  placeholder="User name / Email id"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email === '' && (
                  <Form.Control.Feedback type="invalid">
                    Please enter a username / email.
                  </Form.Control.Feedback>
                )}
              </div>

              <div className="custom-input">
                <label>Password</label>
                <Link to="/forgotpassword">Forgot Password?</Link>
                {passwordField && (
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}
                {!passwordField && (
                  <Form.Control
                    required
                    type="text"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                )}

                {passwordField && (
                  <div
                    className="hide-img"
                    onClick={() => setPasswordField(!passwordField)}
                  >
                    <img alt="hide" src={Hide} />
                  </div>
                )}

                {!passwordField && (
                  <div
                    className="show-img"
                    onClick={() => setPasswordField(!passwordField)}
                  >
                    <img alt="show" src={Show} />
                  </div>
                )}
                <Form.Control.Feedback type="invalid">
                  Please enter a password.
                </Form.Control.Feedback>
              </div>

              <div className="onboarding-btn">
                <button
                  ref={signinBtn}
                  onClick={triggerSignin}
                  type="submit"
                  className={`black-border-btn ${
                    isLoading && 'loading-button black-bg-loader'
                  }`}
                >
                  {!isLoading ? (
                    'Sign In'
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
