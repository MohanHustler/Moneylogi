import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Select from 'react-select';

import { roleList } from '../../../containers/manage-users/role-list-action';

const EditUser = ({
  closeEditUserPopup,
  editUserDetails,
  setEditUserDetails,
  handleUpdateUser,
}) => {
  const role = { label: editUserDetails.role, value: editUserDetails.role };
  const status = {
    label: editUserDetails.status,
    value: editUserDetails.status,
  };

  const [roles, setRoles] = useState([]);

  const dispatch = useDispatch();

  const roleListCallback = (rolesList) => {
    const options = rolesList.map((roleObj) => {
      return { label: roleObj.role, value: roleObj.slug };
    });

    setRoles(options);
  };

  useEffect(() => {
    roleList(dispatch, roleListCallback);
  }, []);

  const statusList = [
    { label: 'active', value: 'active' },
    { label: 'inactive', value: 'inactive' },
  ];

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
        <h2>Edit</h2>
      </div>
      <div className="editpopup-form-sec">
        <Form>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">Name</label>
            <Form.Control
              type="text"
              placeholder="Sunil Kumar"
              name="name"
              value={editUserDetails.name}
              onChange={(e) =>
                setEditUserDetails({ ...editUserDetails, name: e.target.value })
              }
            />
          </div>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">Mobile No</label>
            <Form.Control
              type="text"
              placeholder="9998989898"
              name="mobileNo"
              value={editUserDetails.mobileNumber}
              onChange={(e) =>
                setEditUserDetails({
                  ...editUserDetails,
                  mobileNumber: e.target.value,
                })
              }
            />
          </div>
          <div className="editpopup-input-value">
            <label className="editpopup-input-title">Role</label>
            <Select
              onChange={(e) =>
                setEditUserDetails({
                  ...editUserDetails,
                  role: e.value,
                })
              }
              options={roles}
              value={role}
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
            <label className="editpopup-input-title">Status</label>
            <div className="Editmultipleselect">
              <Select
                onChange={(e) =>
                  setEditUserDetails({
                    ...editUserDetails,
                    status: e.value,
                  })
                }
                options={statusList}
                value={status}
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
          </div>
        </Form>
      </div>
      <div className="editpopup-bottom">
        <button className="cancel-btn" onClick={closeEditUserPopup}>
          Cancel
        </button>
        <button className="black-border-btn" onClick={handleUpdateUser}>
          OK
        </button>
      </div>
    </div>
  );
};

export default EditUser;
