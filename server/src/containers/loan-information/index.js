import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Breadcrumb } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

import { loanInfo } from './loan-information-action';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import LoanInformationCard from '../../components/Loan/loan-information-card';
import RePayment from '../../components/Loan/re-payment';
import SignAgreements from '../../components/Loan/sign-agreements';
import Footer from '../../components/footer';

const LoanInformation = ({ match }) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const loanId = path[path.length - 1];

    if (match.params) {
      loanInfo(match.params.id, dispatch);
    } else if (loanId) {
      loanInfo(loanId, dispatch);
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { loanInfoDetails, isFetching } = useSelector(
    (state) => state.loanInfo
  );
  const { loanDetails, payments, user } = loanInfoDetails;

  const addClassCallBack = () => {
    setShow(!show);
  };

  return (
    <div>
      <Header />
      <div className="common-container">
        <SidebarIcon addClassCallBack={addClassCallBack} show={show} />
        <div className={`common-wrapper ${show ? 'active' : ''} `}>
          <div className="col-md-12 mpad">
            <div className="common-heading">
              <h1>Loans Information</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Loans</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="Loan-info-sec-container row">
            <div className="col-md-3 mpad">
              <LoanInformationCard
                loanInfoDetails={loanInfoDetails}
                profile={user && user.profile}
                payments={payments}
              />
            </div>
            <div className="col-md-9 mpad">
              <div className="row">
                <div className="col-lg-6 col-md-12 mpad">
                  <div className="disburment-card blue-color">
                    <div className="disburment-card-sec">
                      <div className="disburment-card-img">
                        <CircularProgressbar value={50} text={`${50}%`} />
                      </div>
                      <div className="disburment-card-text">
                        <h1>&#8377; 49,34,98,489.00</h1>
                        <p>Total Principal Disbursed Amount</p>
                        <label className="blue-color">
                          22.2% more disburment
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mpad">
                  <div className="disburment-card green-color">
                    <div className="disburment-card-sec">
                      <div className="disburment-card-img">
                        <CircularProgressbar value={75} text={`${75}%`} />
                      </div>
                      <div className="disburment-card-text">
                        <h1>&#8377; 49,34,98,489.00</h1>
                        <p>Total Principal Disbursed Amount</p>
                        <label className="green-color">
                          22.2% more disburment
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="loan-info-repay">
                <div className="col-md-12 mpad">
                  <RePayment loanDetails={loanDetails} />
                </div>
              </div>
              <div className="loan-info-sign">
                <div className="col-md-12 mpad">
                  <SignAgreements />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer show={show} />
        <div className={`common-side-bar ${show ? 'active' : ''} `}>
          <SideBar addClassCallBack={addClassCallBack} show={show} />
        </div>
      </div>
    </div>
  );
};

export default LoanInformation;
