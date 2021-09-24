import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form } from 'react-bootstrap';

import { addAddress } from '../../../containers/profile/add-address-action';
import { stateList } from '../../../containers/profile/state-list-action';
import ArrowIconDownGray from '../../../../images/icons/arrowIcondownGray.png';

const AddAddress = ({ closeNewAddressPopup, publicId }) => {
  const [newAddress, setNewAddress] = useState({
    addressLineOne: '',
    addressLineTwo: '',
    addressType: 'current',
    city: '',
    country: '',
    ownership: 'rented',
    pincode: '',
    state: '',
  });
  const [states, setStates] = useState([]);

  const dispatch = useDispatch();

  const stateListCallback = (statesList) => {
    setStates(statesList);
  };

  useEffect(() => {
    stateList(dispatch, stateListCallback);
  }, []);

  const handleAddAddress = () => {
    addAddress(publicId, newAddress, dispatch);
    closeNewAddressPopup();
  };

  return (
    <div className="editaddress-sec">
      <div className="editaddress-header">
        <h2>ADD NEW ADDRESS</h2>
      </div>
      <div className="editaddress-form-sec">
        <Form className="add-new-address-form">
          <div className="fliter-input-value">
            <label className="filter-input-title">
              Flat No., House No., Building No.
            </label>
            <Form.Control
              type="text"
              placeholder="Flat No., House No., Building No."
              value={newAddress.addressLineOne}
              onChange={(e) =>
                setNewAddress({ ...newAddress, addressLineOne: e.target.value })
              }
            />
          </div>
          <div className="fliter-input-value">
            <label className="filter-input-title">Area, Locality, Street</label>
            <Form.Control
              type="text"
              placeholder="Area, Locality, Street"
              value={newAddress.addressLineTwo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, addressLineTwo: e.target.value })
              }
            />
          </div>
          <div className="editaddress-form">
            <div className="fliter-input-value">
              <label className="filter-input-title">Pin Code</label>
              <Form.Control
                type="number"
                placeholder="Pin code"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    pincode: e.target.value,
                  })
                }
              />
            </div>
            <div className="fliter-input-value">
              <label className="filter-input-title">City</label>
              <Form.Control
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    city: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="editaddress-form">
            <div className="filter-select-value">
              <label className="filter-input-title">State</label>
              <Form.Control
                as="select"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    state: e.target.value,
                  })
                }
              >
                {states.map((state, index) => (
                  <option key={index}>{state.name}</option>
                ))}
              </Form.Control>
              <div className="downarrow-img">
                <img alt="forget-password" src={ArrowIconDownGray} />
              </div>
            </div>
            <div className="filter-select-value">
              <label className="filter-input-title">Country</label>
              <Form.Control
                as="select"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    country: e.target.value,
                  })
                }
              >
                <option>India</option>
                <option>Srilanka</option>
                <option>Bangladesh</option>
                <option>China</option>
                <option>Pakistan</option>
              </Form.Control>
              <div className="downarrow-img">
                <img alt="forget-password" src={ArrowIconDownGray} />
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="editaddress-bottom">
        <button className="black-border-btn">Set as Default</button>
        <div className="editaddress-select">
          <button
            className="cancel-btn btn-align"
            onClick={closeNewAddressPopup}
          >
            Cancel
          </button>
          <button className="black-border-btn" onClick={handleAddAddress}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
