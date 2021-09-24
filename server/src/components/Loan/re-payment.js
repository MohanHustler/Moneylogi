import React from 'react';

import { Table } from 'react-bootstrap';

import {
  toDateFormat,
  toNumberWithCommaAndDecimal,
} from '../../utils/formattor';

const RePayment = ({ loanDetails }) => {
  return (
    <div className="repayment-sec">
      <div className="repayment-sec-heading">
        <h2>RE-PAYMENT DETAILS</h2>
      </div>
      <div className="repayment-sec-table">
        <Table responsive>
          <thead>
            <tr>
              <th>EMI DUE DATE</th>
              <th>STATUS</th>
              <th>EMI VALUE</th>
            </tr>
          </thead>
          <tbody>
            {loanDetails &&
              loanDetails.map((loan, index) => (
                <tr key={index}>
                  <td>{toDateFormat(loan.dueDate)}</td>
                  <td>
                    {loan.status === 'paid' ? (
                      <span className="label-status-paid">{loan.status}</span>
                    ) : (
                      <span className="status-unpaid">{loan.status}</span>
                    )}
                  </td>
                  <td className="repayment-aling">
                    {toNumberWithCommaAndDecimal(loan.dueAmount)}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RePayment;
