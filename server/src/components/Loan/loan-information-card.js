import React from 'react';

import {
  toDateFormat,
  // toDateTimeFormat,
  toNumberWithCommaAndDecimal,
} from '../../utils/formattor';

const LoanInformationCard = ({ loanInfoDetails, profile, payments }) => (
  <div className="loan-inform">
    <div className="loan-content">
      <label className="loan-content-name">{profile && profile.name}</label>
      <span>{`( ${loanInfoDetails.number} )`}</span>
    </div>
    <div className="loan-tabel">
      <ul>
        <li>
          <label>Loan Amount</label>
          <span>{toNumberWithCommaAndDecimal(loanInfoDetails.amount)}</span>
        </li>
        <li>
          <label>Other Int. Amount</label>
          <span>{'-'}</span>
        </li>
        <li>
          <label>Loan Tenure</label>
          <span>{loanInfoDetails.tenure}</span>
        </li>
        <li>
          <label>Interest Rate</label>
          <span>{`${loanInfoDetails.interestRate}%`}</span>
        </li>
        <li>
          <label>Bank Name</label>
          <span>{profile && profile.bankName ? profile.bankName : '-'}</span>
        </li>
        <li>
          <label>AC Number</label>
          <span>
            {profile && profile.accountNumber ? profile.accountNumber : '-'}
          </span>
        </li>
        <li>
          <label>AC Holder Name</label>
          <span>{profile && profile.name ? profile.name : '-'}</span>
        </li>
        <li>
          <label>IFSC</label>
          <span>{profile && profile.ifsc ? profile.ifsc : '-'}</span>
        </li>
        <li>
          <label>Last Salry Date</label>
          <span>
            {profile && profile.lastMonthSalaryDate
              ? toDateFormat(profile.lastMonthSalaryDate)
              : '-'}
          </span>
        </li>
        <li>
          <label>Bounce Charges</label>
          <span>{loanInfoDetails.bounceCharges}</span>
        </li>
      </ul>
    </div>
    <div className="loan-content">
      <span>EMANDATE</span>
    </div>
    <div className="loan-tabel">
      <ul>
        <li>
          <label>Method</label>
          <span>AMIT KUMAR</span>
        </li>
        <li>
          <label>Customer ID</label>
          <span>Cust_D1Re2S4</span>
        </li>
        <li>
          <label>Order ID</label>
          <span>Order_DknoYv</span>
        </li>
        <li>
          <label>Transaction ID</label>
          <span>
            {payments && payments.transactionId ? payments.transactionId : '-'}
          </span>
        </li>
        <li>
          <label>Payment ID</label>
          <span>
            {payments && payments.referenceId ? payments.referenceId : '-'}
          </span>
        </li>
        <li>
          <label>AC Number</label>
          <span>
            {profile && profile.accountNumber ? profile.accountNumber : '-'}
          </span>
        </li>
        <li>
          <label>AC Holder Name</label>
          <span>{profile && profile.name ? profile.name : '-'}</span>
        </li>
      </ul>
    </div>
    <div className="loan-content">
      <span>DISBURSAL</span>
    </div>
    <div className="loan-tabel">
      <ul>
        <li>
          <label>PayOut Id</label>
          <span>pout_DknuUu</span>
        </li>
        <li>
          <label>Disbursed Date</label>
          <span>26-11-2019</span>
        </li>
        <li>
          <label>Loan Amount</label>
          <span>20,200.00</span>
        </li>
        <li>
          <label>Processing Fees</label>
          <span>588.82</span>
        </li>
        <li>
          <label>Disbursed Amount</label>
          <span>19,611.18</span>
        </li>
      </ul>
    </div>
  </div>
);

export default LoanInformationCard;
