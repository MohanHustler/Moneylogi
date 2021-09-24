import React from 'react';

import { Form } from 'react-bootstrap';
import ToggleSwitch from '../Users/switch/toggle-switch';

const EditPincode = ({
  closeEditPincodePopup,
  handleUpdatePincode,
  editPincodeDetails,
  setEditPincodeDetails,
}) => {
  return (
    <div className="edit-bank-popup">
      <div className="edit-bank-header">
        <h2>EDIT</h2>
      </div>
      <div className="edit-bank-form">
        <Form className="manage-pincode-form">
          <div className="manage-pincode-left">
            <div className="edit-bank-input">
              <label>Pincode</label>
              <Form.Control
                type="text"
                placeholder="123456"
                value={editPincodeDetails.pincode}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    pincode: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>Division Name</label>
              <Form.Control
                type="text"
                placeholder="Navsari"
                value={editPincodeDetails.divisionName}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    divisionName: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>Taluk</label>
              <Form.Control
                type="text"
                placeholder="Chikhli"
                value={editPincodeDetails.taluk}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    taluk: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>State Name</label>
              <Form.Control
                type="text"
                placeholder="Gujarat"
                value={editPincodeDetails.stateName}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    stateName: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="manage-pincode-right">
            <div className="edit-bank-input">
              <label>Office Name</label>
              <Form.Control
                type="text"
                placeholder="Mogravadi B.O."
                value={editPincodeDetails.officeName}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    officeName: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>Region Name</label>
              <Form.Control
                type="text"
                placeholder="Vadodara"
                value={editPincodeDetails.regionName}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    regionName: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>District Name</label>
              <Form.Control
                type="text"
                placeholder="Navsari"
                value={editPincodeDetails.districtName}
                onChange={(e) =>
                  setEditPincodeDetails({
                    ...editPincodeDetails,
                    districtName: e.target.value,
                  })
                }
              />
            </div>
            <div className="edit-bank-input">
              <label>Country</label>
              <Form.Control type="text" placeholder="India" />
            </div>
          </div>
        </Form>
        <div className="editpopup-input-value">
          <ToggleSwitch
            editDetails={editPincodeDetails}
            setEditDetails={setEditPincodeDetails}
          />
        </div>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closeEditPincodePopup}>
          Cancel
        </button>
        <button className="black-border-btn" onClick={handleUpdatePincode}>
          OK
        </button>
      </div>
    </div>
  );
};

export default EditPincode;
