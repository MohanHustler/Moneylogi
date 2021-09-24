import React from 'react';

import { Table } from 'react-bootstrap';

const LoanEligibilityCheck = (props) => {
  const loancheck = [
    {
      extra_in_amount: '202',
      id: 1,
      intrest_rate: '0.34',
      loan_value: '100000',
      tenure: '200',
      total_emi: '3',
    },
    {
      extra_in_amount: '120',
      id: 2,
      intrest_rate: '0.34',
      loan_value: '104000',
      tenure: '200',
      total_emi: '3',
    },
    {
      extra_in_amount: '220',
      id: 3,
      intrest_rate: '0.34',
      loan_value: '768000',
      tenure: '200',
      total_emi: '3',
    },
    {
      extra_in_amount: '820',
      id: 4,
      intrest_rate: '0.34',
      loan_value: '107776',
      tenure: '200',
      total_emi: '3',
    },
  ];

  return (
    <div className="loaneligibilitycheck-sec logs">
      <div className="loaneligibilitycheck-header">
        <h2>LOAN ELIGIBILITY CHECK</h2>
      </div>
      <div className="loaneligibilitycheck-table">
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>LOAN VALUE</th>
              <th>EXTRA INTEREST AMOUNT</th>
              <th>TENURE</th>
              <th>INTEREST RATE</th>
              <th>TOTAL EMI</th>
            </tr>
          </thead>
          <tbody>
            {loancheck.map((loan, index) => (
              <tr key={index}>
                <td>{loan.id}</td>
                <td className="loaneligibilitycheck-value">
                  {loan.loan_value}
                </td>
                <td className="loaneligibilitycheck-value">
                  {loan.extra_in_amount}
                </td>
                <td>{loan.tenure}</td>
                <td>{loan.intrest_rate}</td>
                <td>{loan.total_emi}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="filter-bottom">
        <button
          className="cancel-btn filter-btn"
          onClick={props.closeEligibilityPopup}
        >
          Cancel
        </button>
        <button
          className="black-border-btn filter-btn"
          onClick={props.closeEligibilityPopup}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default LoanEligibilityCheck;
