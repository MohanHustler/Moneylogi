import React from 'react';

import { Form } from 'react-bootstrap';
import ToggleSwitch from '../Users/switch/toggle-switch';

const EditProfession = ({
  closeEditProfessionPopup,
  editProfessionDetails,
  setEditProfessionDetails,
  handleSubmit,
}) => {
  return (
    <div className="edit-bank-popup">
      <div className="edit-bank-header">
        <h2>EDIT</h2>
      </div>
      <div className="edit-bank-form">
        <Form>
          <div className="edit-bank-input">
            <label>Name of Profession</label>
            <Form.Control
              className="edit-profession-input-text"
              type="text"
              placeholder="Retail"
              value={editProfessionDetails.name}
              onChange={(e) =>
                setEditProfessionDetails({
                  ...editProfessionDetails,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="editpopup-input-value">
            <ToggleSwitch
              editDetails={editProfessionDetails}
              setEditDetails={setEditProfessionDetails}
            />
          </div>
        </Form>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closeEditProfessionPopup}>
          Cancel
        </button>
        <button className="black-border-btn" onClick={handleSubmit}>
          OK
        </button>
      </div>
    </div>
  );
};

export default EditProfession;
