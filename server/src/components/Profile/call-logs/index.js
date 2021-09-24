import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { addCallLogs } from '../../../containers/profile/add-call-logs-action';
import { callLogsAction } from '../../../containers/profile/call-logs-action';

import ArrowIconDownGray from '../../../../images/icons/arrowIcondownGray.png';

const CallLogs = ({ closeCallLogPopup }) => {
  const [summary, setSummary] = useState('Low Salary');
  const [descriptions, setDescriptions] = useState('');
  const [status, setStatus] = useState('Updated');

  const dispatch = useDispatch();

  const summaryList = [
    { name: 'Low Salary' },
    { name: 'Medium Salary' },
    { name: 'High Salary' },
    { name: 'Salary' },
  ];
  const statusList = [
    { name: 'Updated' },
    { name: 'Rejected' },
    { name: 'Pending' },
    { name: 'Completed' },
  ];

  const callLogSuccessCallback = () => {
    const urlParams = {
      pageNumber: 1,
      pageSize: 10,
    };

    callLogsAction(urlParams, dispatch);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCallLogs(
      {
        description: descriptions,
        status,
        summary,
      },
      callLogSuccessCallback,
      dispatch
    );

    closeCallLogPopup();
  };

  return (
    <div>
      <div className="logs">
        <h1>CALL LOGS</h1>
        <div className="logs-form">
          <div className="filter-select-value">
            <label className="filter-input-title">Summary</label>
            <Form.Control
              as="select"
              value={summary}
              name="summary"
              onChange={(e) => setSummary(e.target.value)}
            >
              {summaryList.map((list, i) => {
                return <option key={i}>{list.name}</option>;
              })}
            </Form.Control>
            <div className="downarrow-img">
              <img alt="forget-password" src={ArrowIconDownGray} />
            </div>
          </div>
          <div className="filter-select-value">
            <label className="filter-input-title">Descriptions</label>
            <Form.Control
              as="textarea"
              placeholder="details goes here"
              value={descriptions}
              name="descriptions"
              onChange={(e) => setDescriptions(e.target.value)}
            />
          </div>
          <div className="filter-select-value">
            <label className="filter-input-title">Status</label>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusList.map((list, i) => {
                return <option key={i}>{list.name}</option>;
              })}
            </Form.Control>
            <div className="downarrow-img">
              <img alt="forget-password" src={ArrowIconDownGray} />
            </div>
          </div>
          <div className="filter-bottom">
            <button
              className="cancel-btn filter-btn"
              onClick={closeCallLogPopup}
            >
              Cancel
            </button>
            <button
              className="black-border-btn filter-btn"
              onClick={handleSubmit}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLogs;
