import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch } from 'react-redux';

import SwitchButton from './switch';
import { roleList } from '../../containers/manage-users/role-list-action';

const AddUser = ({
  closeAddUserPopup,
  addUserDetails,
  setAddUserDetails,
  handleAddUser,
  validated,
  errorResponse,
  setErrorResponse,
}) => {
  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();

  const roleListCallback = (rolesList) => {
    const options = rolesList.map((role) => {
      return { label: role.role, value: role.slug };
    });

    setRoles(options);
  };

  useEffect(() => {
    roleList(dispatch, roleListCallback);
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      '&:hover': {
        border: state.isFocused ? 'solid 1px #dfdfdf' : 'solid 1px #dfdfdf',
      },
      border: state.isFocused ? 'solid 1px #dfdfdf' : 'solid 1px #dfdfdf',
      // This line disable the blue border
      boxShadow: state.isFocused ? 'solid 1px #dfdfdf' : 'solid 1px #dfdfdf',
    }),
  };

  return (
    <div className="editpopup-sec">
      <div className="editpopup-header">
        <h2>ADD USER</h2>
      </div>
      <div className="editpopup-form-sec">
        <Form noValidate validated={validated}>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">
              Name <span>*</span>
            </label>
            <Form.Control
              required
              type="text"
              placeholder="Sunil Kumar"
              name="name"
              value={addUserDetails.name}
              maxLength={20}
              onChange={(e) =>
                setAddUserDetails({ ...addUserDetails, name: e.target.value })
              }
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name.
            </Form.Control.Feedback>
          </div>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">
              Email ID <span>*</span>
            </label>
            <Form.Control
              required
              type="email"
              placeholder="rahul@moneyloji.com"
              name="emailId"
              value={addUserDetails.email}
              className={
                errorResponse.field === 'email' && 'error-custom-border'
              }
              maxLength={30}
              onChange={(e) => {
                setAddUserDetails({ ...addUserDetails, email: e.target.value });
                setErrorResponse({});
              }}
            />
            {addUserDetails.email === '' ? (
              <Form.Control.Feedback type="invalid">
                Please enter a email address.
              </Form.Control.Feedback>
            ) : (
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            )}

            {errorResponse && errorResponse.field === 'email' && (
              <span className="custom-error-msg">{errorResponse.message}</span>
            )}
          </div>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">
              Mobile No <span>*</span>
            </label>
            <Form.Control
              required
              type="number"
              placeholder="9998989898"
              name="mobileNo"
              value={addUserDetails.mobileNo}
              onInput={(e) => {
                // eslint-disable-next-line radix
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
              className={
                errorResponse.field === 'mobileNumber' && 'error-custom-border'
              }
              onChange={(e) => {
                setAddUserDetails({
                  ...addUserDetails,
                  mobileNo: e.target.value,
                });
                setErrorResponse({});
              }}
            />

            <Form.Control.Feedback type="invalid">
              Please enter a mobile number.
            </Form.Control.Feedback>

            {errorResponse && errorResponse.field === 'mobileNumber' && (
              <span className="custom-error-msg">{errorResponse.message}</span>
            )}
          </div>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">Role</label>
            <Select
              onChange={(e) =>
                setAddUserDetails({
                  ...addUserDetails,
                  role: e.value,
                })
              }
              options={roles}
              styles={customStyles}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#d8d8d8',
                  primary25: 'neutral10',
                },
              })}
            />
          </div>
          <div className="editpopup-input-value">
            <SwitchButton />
          </div>
        </Form>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closeAddUserPopup}>
          Cancel
        </button>
        <button className="black-border-btn " onClick={handleAddUser}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AddUser;
