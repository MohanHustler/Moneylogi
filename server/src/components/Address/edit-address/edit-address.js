import React from 'react';

import { Form } from 'react-bootstrap';

import ArrowIconDownGray from '../../../../images/icons/arrowIcondownGray.png';

const EditAddress = (props) => (
  <div className="editaddress-sec">
    <div className="editaddress-header">
      <h2>EDIT ADDRESS</h2>
    </div>
    <div className="editaddress-form-sec">
      <Form>
        <div className="fliter-input-value">
          <label className="filter-input-title">
            Flat No. House No. Building No.
          </label>
          <Form.Control
            type="text"
            placeholder="B-165, First Floor"
            value={props.currentAddressCrud.flatno}
          />
        </div>
        <div className="fliter-input-value">
          <label className="filter-input-title">Area Locality Street</label>
          <Form.Control
            type="text"
            placeholder="New Ashok Nagar"
            value={props.currentAddressCrud.area}
          />
        </div>
        <div className="editaddress-form">
          <div className="fliter-input-value">
            <label className="filter-input-title">Pin Code</label>
            <Form.Control
              type="number"
              placeholder="2110096"
              value={props.currentAddressCrud.pincode}
            />
          </div>
          <div className="fliter-input-value">
            <label className="filter-input-title">City</label>
            <Form.Control
              type="text"
              placeholder="New Delhi"
              value={props.currentAddressCrud.city}
            />
          </div>
        </div>
        <div className="editaddress-form">
          <div className="filter-select-value">
            <label className="filter-input-title">State</label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
            <div className="downarrow-img">
              <img alt="forget-password" src={ArrowIconDownGray} />
            </div>
          </div>
          <div className="filter-select-value">
            <label className="filter-input-title">Country</label>
            <Form.Control as="select">
              <option>India</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
            <div className="downarrow-img">
              <img alt="forget-password" src={ArrowIconDownGray} />
            </div>
          </div>
        </div>
      </Form>
    </div>
    <div className="editaddress-bottom">
      <button className="black-border-btn ">Set as Default</button>
      <div className="editaddress-select">
        <button
          className="cancel-btn btn-align"
          onClick={props.closeEditDetailsPopup}
        >
          Cancel
        </button>
        <button
          className="black-border-btn"
          onClick={props.closeEditDetailsPopup}
        >
          OK
        </button>
      </div>
    </div>
    {/* {props.edit.map(add => (
        <div className="editaddress-visible-sec">
          <h2>
            <span>{add.flatno}</span>
            <span>{add.area}</span>
            <span>{add.city}</span>
            <span>{add.state}</span>
            <span>{add.country}</span>
            <span>{add.pincode}</span>
          </h2>
          <div className="editaddress-visible-sec-btn">
            <button
              onClick={() => props.editHandler(add)}
              className="black-border-btn"
            >
              Edit
            </button>
            <button className="black-border-btn ">Set as Default</button>
          </div>
        </div>
      ))} */}

    <div className="editaddress-visible-sec">
      <h2>D-23, Third Foor, Mayur Vihar, New Delhi, Delhi, India - 110090</h2>
      <div className="editaddress-visible-sec-btn">
        <button className="black-border-btn "> Edit </button>
        <button className="black-border-btn ">Set as Default</button>
      </div>
    </div>
    <div className="editaddress-visible-sec editaddress-visible-sec-end">
      <h2>A-56, First Foor, Laxmi Nagar, New Delhi, Delhi, India - 110083</h2>
      <div className="editaddress-visible-sec-btn">
        <button className="black-border-btn ">Edit</button>
        <button className="black-border-btn ">Set as Default</button>
      </div>
    </div>
  </div>
);

export default EditAddress;
