import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Form } from 'react-bootstrap';

import * as Toastr from 'toastr';

import ForgotPasswordBanner from '../../../images/forgot-password.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailValidated, setEmailValidated] = useState(false);

  const validateEmail = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
    }
    setEmailValidated(true);
    if (email) {
      Toastr.success('Link sent to mail address', 'Sent Response');
    }
  };

  return (
    <div>
      <div className="onboarding-page ">
        <div className="onboarding-image">
          <div className="onboarding-img">
            <img alt="forget-password" src={ForgotPasswordBanner} />
          </div>
        </div>
        <div className="onboarding-content ">
          <div className="onboarding-header">
            <label>Forgot Password</label>
            <h2>Your Account</h2>
          </div>
          <div className="onboarding-fields ">
            <Form noValidate validated={emailValidated}>
              <div className="custom-input">
                <label>Email Address</label>
                <Form.Control
                  required
                  type="email"
                  value={email}
                  name="email"
                  placeholder="Email id"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {email === '' ? (
                  <Form.Control.Feedback type="invalid">
                    Please enter a email address.
                  </Form.Control.Feedback>
                ) : (
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                )}
              </div>
            </Form>
            <div className="onboarding-btn">
              <button
                type="submit"
                onClick={validateEmail}
                className="black-border-btn"
              >
                Send me link
              </button>
            </div>
            <div className="onboarding-fotter">
              <label>
                Already a member? <Link to="/signin">Sign In</Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
