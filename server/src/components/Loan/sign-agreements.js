import React from 'react';

const SignAgreements = () => {
  return (
    <div className="sign-agreements">
      <h1>E-SIGN AGREEMENT</h1>
      <div className="agreements">
        <ul>
          <li>
            <label> File No</label>
            <span>MNLG0002528</span>
          </li>
          <li>
            <label>Document Type</label>
            <span>Loan Agreement</span>
          </li>
          <li>
            <label>Signed At</label>
            <span>26-11-2019 08:08:59 AM</span>
          </li>
        </ul>
        <div className="download">
          <button className="black-border-btn">
            <span>Download</span>
            <div className="loader-button-gif-sec">
              <div className="loader-button-gif"></div>
            </div>
            <span className="laoder-span">Loading ...</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignAgreements;
