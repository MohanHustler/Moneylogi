import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal } from 'react-bootstrap';

import { callLogsAction } from '../../../containers/profile/call-logs-action';
import { toDateTimeFormat } from '../../../utils/formattor';

import ViewIcon from '../../../../images/icons/eyeIconBlack.svg';
import EditIcon from '../../../../images/icons/editIconBlack.svg';
import CloseIconWhite from '../../../../images/icons/closeIconWhite.svg';
import ArrowIconDownGray from '../../../../images/icons/arrowIcondownGray.png';

import CallLogs from '../call-logs';

const ProfileDetailsTab = () => {
  const [currentTab, setCurrentTab] = useState('identity-check');
  // call logs
  const [callLogs, setCallLogs] = useState(false);
  const [actionType, setActionType] = useState('Action');

  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = {
      pageNumber: 1,
      pageSize: 10,
    };

    callLogsAction(urlParams, dispatch);
  }, []);

  const { callLogsDetails } = useSelector((state) => state.callLogs);

  const closeCallLogPopup = () => {
    setCallLogs(false);
  };

  const identityCheck = [
    {
      date_of_birth: '01-Jan-1990',
      father_name: 'Mohammad Reyazuddin',
      mobile_no: '9990598699',
      name: 'Shoaib Alam',
      pan_no: 'AOTPA1289Z',
      status: 'Verified',
    },
  ];

  const financialCheck = [
    {
      account_no: '9990598699',
      bank_name: 'HDFC Bank',
      ifsc_code: 'HDFC123787',
      name: 'Shoaib Alam',
      status: 'Verified',
    },
    {
      account_no: '9990598699',
      bank_name: 'HDFC Bank',
      ifsc_code: 'HDFC123787',
      name: 'Shoaib Alam',
      status: 'Verified',
    },
    {
      account_no: '9990598699',
      bank_name: 'HDFC Bank',
      ifsc_code: 'HDFC123787',
      name: 'Shoaib Alam',
      status: 'Verified',
    },
  ];

  const employmentInfo = [
    {
      business_name: 'Architect',
      business_nature: 'Builders',
      employment_type: 'Self-Employed',
      organization_types: 'Partnership Firm',
      profession: 'Architect Firms',
    },
  ];

  const permanentAddress = [
    {
      address_line_one: 'A-232, 1st Floor',
      address_line_two: 'Mayur Vihar',
      city: 'New Delhi',
      landmark: 'Mayur Vihar Metro Station',
      pincode: '110091',
      property_type: 'New Delhi',
    },
  ];

  const officeAddress = [
    {
      address_line_one: 'A-232, 1st Floor',
      address_line_two: 'Mayur Vihar',
      city: 'New Delhi',
      landmark: 'Mayur Vihar Metro Station',
      pincode: '110091',
      property_type: 'New Delhi',
    },
  ];

  const loanInfo = [
    {
      id: '1',
      last_paid: '04-Feb-2020, 01:22:34 PM',
      loan_amount: '10,0903.00',
      loan_no: 'ML-129837',
      status: 'Active',
    },
    {
      id: '2',
      last_paid: '04-Feb-2020, 01:22:34 PM',
      loan_amount: '10,0903.00',
      loan_no: 'ML-129837',
      status: 'Closed',
    },
  ];

  return (
    <div className="profile-details-tab">
      <ul>
        <li
          onClick={() => setCurrentTab('identity-check')}
          className={`${
            currentTab === 'identity-check' && 'profile-details-tab-active'
          }`}
        >
          IDENTITY CHECK
        </li>
        <li
          onClick={() => setCurrentTab('financial-check')}
          className={`${
            currentTab === 'financial-check' && 'profile-details-tab-active'
          }`}
        >
          FINANCIAL CHECK
        </li>
        <li
          onClick={() => setCurrentTab('employment-info')}
          className={`${
            currentTab === 'employment-info' && 'profile-details-tab-active'
          }`}
        >
          EMPLOYMENT INFO
        </li>
        <li
          onClick={() => setCurrentTab('permanent-address')}
          className={`${
            currentTab === 'permanent-address' && 'profile-details-tab-active'
          }`}
        >
          PERMANENT ADDRESS
        </li>
        <li
          onClick={() => setCurrentTab('office-address')}
          className={`${
            currentTab === 'office-address' && 'profile-details-tab-active'
          }`}
        >
          OFFICE ADDRESS
        </li>
        <li
          onClick={() => setCurrentTab('call-logs')}
          className={`${
            currentTab === 'call-logs' && 'profile-details-tab-active'
          }`}
        >
          USER CALL LOGS
        </li>
        <li
          onClick={() => setCurrentTab('loan-info')}
          className={`${
            currentTab === 'loan-info' && 'profile-details-tab-active'
          }`}
        >
          LOAN INFO
        </li>
      </ul>

      <Table responsive className="profile-details-table">
        <thead className="profile-details-head">
          {currentTab === 'identity-check' && (
            <tr>
              <th>PAN NO</th>
              <th>NAME</th>
              <th>MOBILE NO</th>
              <th>FATHER'S NAME</th>
              <th>DATE OF BIRTH</th>
              <th>STATUS</th>
            </tr>
          )}
          {currentTab === 'financial-check' && (
            <tr>
              <th>NAME</th>
              <th>BANK NAME</th>
              <th>ACCOUNT NO</th>
              <th>IFSC CODE</th>
              <th>ACTION</th>
              <th>STATUS</th>
            </tr>
          )}
          {currentTab === 'employment-info' && (
            <tr>
              <th>NAME OF BUSINESS</th>
              <th>NATURE OF BUSINESS</th>
              <th>ORGANIZATION TYPES</th>
              <th>PROFESSION</th>
              <th>EMPLOYMENT TYPE</th>
              <th>STATUS</th>
            </tr>
          )}
          {currentTab === 'permanent-address' && (
            <tr>
              <th>TYPE OF PROPERTY</th>
              <th>ADDRESS LINE 1</th>
              <th>ADDRESS LINE 2</th>
              <th>LANDMARK</th>
              <th>PINCODE</th>
              <th>CITY</th>
            </tr>
          )}
          {currentTab === 'office-address' && (
            <tr>
              <th>TYPE OF PROPERTY</th>
              <th>ADDRESS LINE 1</th>
              <th>ADDRESS LINE 2</th>
              <th>LANDMARK</th>
              <th>PINCODE</th>
              <th>CITY</th>
            </tr>
          )}

          {currentTab === 'call-logs' && (
            <Fragment>
              <tr className="profile-add-call-log-history">
                <th colSpan="4">
                  <label>
                    Here you can check-out the all user call logs history.
                  </label>
                </th>
                <th>
                  <button onClick={() => setCallLogs(true)}>
                    Add Call logs
                  </button>
                </th>
              </tr>
              <tr>
                <th>SUMMARY</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th>CREATED BY</th>
                <th>DATE</th>
              </tr>
            </Fragment>
          )}
          {currentTab === 'loan-info' && (
            <tr>
              <th>#</th>
              <th>LOAN NO</th>
              <th>LOAN AMOUNT</th>
              <th>LAST PAID</th>
              <th>STATUS</th>
            </tr>
          )}
        </thead>

        <tbody className="profile-details-body">
          {currentTab === 'identity-check' && (
            <Fragment>
              {identityCheck.map((check, index) => (
                <tr key={index}>
                  <td className="profile-details-tr-bright">{check.pan_no}</td>
                  <td className="profile-details-tr-bright">{check.name}</td>
                  <td className="profile-details-tr-bright">
                    {check.mobile_no}
                  </td>
                  <td>{check.father_name}</td>
                  <td>{check.date_of_birth}</td>
                  <td>
                    <a className="green-status-btn">{check.status}</a>
                  </td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'financial-check' && (
            <Fragment>
              {financialCheck.map((financial, index) => (
                <tr key={index}>
                  <td className="profile-details-tr-bright">
                    {financial.name}
                  </td>
                  <td>{financial.bank_name}</td>
                  <td>{financial.account_no}</td>
                  <td>{financial.ifsc_code}</td>
                  <td className="profile-details-tr-bright">
                    <Dropdown
                      onSelect={(e) => setActionType(e)}
                      className="personal-user-type-dropdown custom-dropdown"
                    >
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {actionType}
                        <img src={ArrowIconDownGray} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Edit">Edit</Dropdown.Item>
                        <Dropdown.Item eventKey="Delete">Delete</Dropdown.Item>
                        <Dropdown.Item eventKey="Fraud Report">
                          Fraud Report
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Summary">
                          Summary
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <a className="green-status-btn">{financial.status}</a>
                  </td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'employment-info' && (
            <Fragment>
              {employmentInfo.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.business_name}</td>
                  <td>{employee.business_nature}</td>
                  <td>{employee.organization_types}</td>
                  <td> {employee.profession}</td>
                  <td> {employee.employment_type}</td>
                  <td className="other-docs-action-icon">
                    <img className="mr-3" alt={ViewIcon} src={ViewIcon} />
                    <img alt={EditIcon} src={EditIcon} />
                  </td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'permanent-address' && (
            <Fragment>
              {permanentAddress.map((address, index) => (
                <tr key={index}>
                  <td>{address.property_type}</td>
                  <td>{address.address_line_one}</td>
                  <td>{address.address_line_two}</td>
                  <td> {address.landmark}</td>
                  <td> {address.pincode}</td>
                  <td>{address.city}</td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'office-address' && (
            <Fragment>
              {officeAddress.map((address, index) => (
                <tr key={index}>
                  <td>{address.property_type}</td>
                  <td>{address.address_line_one}</td>
                  <td>{address.address_line_two}</td>
                  <td> {address.landmark}</td>
                  <td> {address.pincode}</td>
                  <td>{address.city}</td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'call-logs' && (
            <Fragment>
              {callLogsDetails.map((call, index) => (
                <tr key={index}>
                  <td>{call.summary || '-'}</td>
                  <td>{call.description || '-'}</td>
                  <td>{call.status || '-'}</td>
                  <td> {call.createdBy || '-'}</td>
                  <td>{toDateTimeFormat(call.createdAt)}</td>
                </tr>
              ))}
            </Fragment>
          )}

          {currentTab === 'loan-info' && (
            <Fragment>
              {loanInfo.map((loan, index) => (
                <tr key={index}>
                  <td className="profile-details-tr-number">{loan.id}</td>
                  <td>
                    <Link
                      className="profile-details-tr-bright"
                      to="/loaninformation"
                    >
                      {loan.loan_no}
                    </Link>
                  </td>
                  <td>{loan.loan_amount}</td>
                  <td>{loan.last_paid}</td>
                  <td>
                    {loan.status === 'Active' ? (
                      <a className="green-status-btn">{loan.status}</a>
                    ) : (
                      <a className="red-status-btn">{loan.status}</a>
                    )}
                  </td>
                </tr>
              ))}
            </Fragment>
          )}
        </tbody>
      </Table>
      {/* Call Logs Modal */}
      <Modal
        show={callLogs}
        onHide={() => setCallLogs(false)}
        animation={false}
        className="loan-eligible-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setCallLogs(false)}>
            <img alt="close" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <CallLogs
            closeCallLogPopup={closeCallLogPopup}
            // setUserCallLogs={setUserCallLogs}
            // userCallLogs={userCallLogs}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileDetailsTab;
