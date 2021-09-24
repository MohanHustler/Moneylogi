import React from 'react';

const AddressDetails = (props) => (
  <div className="addressdetails-sec logs">
    <div className="filter-header">
      <h2>ADDRESS DETAILS</h2>
      <button
        className="black-border-btn add-btn"
        onClick={() => {
          props.closeAndOpenAddAddressPopup();
        }}
      >
        Add New Address
      </button>
    </div>
    <div className="addressdetails-sec-btn">
      <button className="default-chip">Default</button>
    </div>

    {props.addAddress.map((add, index) => (
      <div className="editaddress-visible-sec" key={index}>
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
            onClick={() => {
              props.editHandler(add);
            }}
            className="black-border-btn"
          >
            Edit
          </button>
          <button className="black-border-btn ">Set as Default</button>
        </div>
      </div>
    ))}

    <div className="filter-bottom">
      <button
        className="cancel-btn filter-btn"
        onClick={() => {
          props.closeAddressDetailsPopup();
        }}
      >
        Cancel
      </button>
      <button
        className="black-border-btn filter-btn"
        onClick={() => {
          props.closeAddressDetailsPopup();
        }}
      >
        OK
      </button>
    </div>
  </div>
);

export default AddressDetails;
