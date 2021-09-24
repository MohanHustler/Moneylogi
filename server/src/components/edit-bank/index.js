import React from 'react';

import { Form } from 'react-bootstrap';
import ToggleSwitch from '../Users/switch/toggle-switch';

const EditBank = ({
  closeEditUserPopup,
  editBankDetails,
  setEditBankDetails,
  handleUpdateBank,
}) => {
  return (
    <div className="edit-bank-popup">
      <div className="edit-bank-header">
        <h2>EDIT</h2>
      </div>
      <div className="edit-bank-form">
        <Form>
          <div className="edit-bank-input">
            <label>Bank Name</label>
            <Form.Control
              type="text"
              placeholder="Andhra Bank"
              value={editBankDetails.name}
              onChange={(e) =>
                setEditBankDetails({
                  ...editBankDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="edit-bank-input">
            <label>IFSC Code</label>
            <Form.Control
              type="text"
              placeholder="ANDB"
              value={editBankDetails.ifscCode}
              onChange={(e) =>
                setEditBankDetails({
                  ...editBankDetails,
                  ifscCode: e.target.value,
                })
              }
            />
          </div>
          <div className="edit-bank-input">
            <label>Finbit Code</label>
            <Form.Control
              type="text"
              placeholder="ANDB"
              value={editBankDetails.finbitCode}
              onChange={(e) =>
                setEditBankDetails({
                  ...editBankDetails,
                  finbitCode: e.target.value,
                })
              }
            />
          </div>
          <div className="edit-bank-input">
            <label>RazorPay Code</label>
            <Form.Control
              type="text"
              placeholder="ANDB"
              value={editBankDetails.razorpayCode}
              onChange={(e) =>
                setEditBankDetails({
                  ...editBankDetails,
                  razorpayCode: e.target.value,
                })
              }
            />
          </div>
          <div className="editpopup-input-value">
            <ToggleSwitch
              editDetails={editBankDetails}
              setEditDetails={setEditBankDetails}
            />
          </div>
        </Form>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closeEditUserPopup}>
          Cancel
        </button>
        <button className="black-border-btn" onClick={handleUpdateBank}>
          OK
        </button>
      </div>
    </div>
  );
};

export default EditBank;
