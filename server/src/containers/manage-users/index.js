/* eslint-disable max-lines */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';

import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { Breadcrumb, Modal } from 'react-bootstrap';

import { manageUsers } from './manage-users-action';
import { generatePasswordAction } from './generate-password-action';
import { manageUserFilters } from './manage-users-constants';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';
import CloseIconWhite from '../../../images/icons/closeIconWhite.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import Footer from '../../components/footer';

import AddNewUser from '../../components/Users/add-new-user';
import AddUser from '../../components/Users/add-user';
import Action from '../../components/Users/action';
import { addUser } from '../../containers/manage-users/add-user-action';
import { editUser } from '../../containers/manage-users/edit-user-action';
import EditUser from '../../components/Users/edit-user';
import DeleteUser from '../../components/Users/delete-user';
import GenerateResetPassword from '../../components/Users/generate-reset-password';
import ResetPassword from '../../components/Users/reset-password';
import DataTable from '../../components/data-table';
import { toDateFormat } from '../../utils/formattor';
// import { cityList } from '../../constants';

const ManageUsers = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [dueDate, setDueDate] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(29, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [selectCity, setSelectCity] = useState([]);
  // const [cities, setCities] = useState('');
  const [email, setEmail] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([manageUserFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);
  const [adduserpopup, setAdduserpopup] = useState(false);
  const [deletuserpopup, setDeletuserpopup] = useState(false);
  const [edituserpopup, setEdituserpopup] = useState(false);
  const [generateResetPopup, setGenerateResetPopup] = useState(false);
  const [resetUserPopup, setResetUserPopup] = useState(false);
  const [newUserAddedPopup, setNewUserAddedPopup] = useState(false);

  const [validated, setValidated] = useState(false);
  const [errorResponse, setErrorResponse] = useState({});
  const [addUserDetails, setAddUserDetails] = useState({
    email: '',
    mobileNo: '',
    name: '',
    role: '',
  });

  const [newUserData, setNewUserData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [editUserDetails, setEditUserDetails] = useState({
    concurrencyStamp: '',
    mobileNumber: '',
    name: '',
    publicId: '',
    role: '',
    status: '',
  });

  const [deleteUserDetails, setDeleteUserDetails] = useState({
    concurrencyStamp: '',
    publicId: '',
  });

  const [generatePassword, setGeneratePassword] = useState({
    concurrencyStamp: '',
    email: '',
    name: '',
    newPassword: '',
    publicId: '',
  });

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Name') {
      setName(filterValue);
    } else if (filterName === 'Mobile Number') {
      setMobileNumber(filterValue);
    } else if (filterName === 'Role') {
      setRole(filterValue);
    } else if (filterName === 'City') {
      setSelectCity(filterValue);
    } else if (filterName === 'Date Created') {
      setStartDate(filterValue.startDate);
      setEndDate(filterValue.endDate);
    } else if (filterName === 'Email') {
      setEmail(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Name') {
      return name;
    } else if (filterName === 'Mobile Number') {
      return mobileNumber;
    } else if (filterName === 'Role') {
      return role;
    } else if (filterName === 'City') {
      return selectCity;
    } else if (filterName === 'Date Created') {
      return [startDate, endDate];
    } else if (filterName === 'Email') {
      return email;
    }
  };

  const { users, totalRecords, isFetching } = useSelector(
    (state) => state.manageUsers
  );

  const usersList =
    users &&
    users.map((user, index) => {
      const id = index + 1;

      if (user.profile) {
        return {
          concurrencyStamp: user.concurrencyStamp || '-',
          createdAt: user.createdAt || '-',
          email: user.email || '-',
          id,
          mobileNumber: user.mobileNumber || '-',
          name: user.profile.name || '-',
          publicId: user.publicId,
          role: user.role || '-',
          status: user.status || '-',
        };
      }
      return {
        concurrencyStamp: user.concurrencyStamp || '-',
        createdAt: user.createdAt || '-',
        email: user.email || '-',
        id,
        mobileNumber: user.mobileNumber || '-',
        name: '-',
        publicId: user.publicId,
        role: user.role || '-',
        status: user.status || '-',
      };
    });

  const dispatch = useDispatch();

  const getUsersData = (urlParams) => {
    manageUsers(urlParams, dispatch);
  };

  useEffect(() => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getUsersData(urlParams);
  }, []);

  const generatePasswordSuccess = (autoGeneratedPassword) => {
    setGeneratePassword({
      ...generatePassword,
      newPassword: autoGeneratedPassword,
    });
  };

  const handleGeneratePassword = () => {
    generatePasswordAction(generatePassword, generatePasswordSuccess, dispatch);
    setGenerateResetPopup(false);
    setResetUserPopup(true);
  };

  const handleAdduserPopupClose = () => setAdduserpopup(false);

  const handleAdduserPopupShow = () => setAdduserpopup(true);

  const deletuserPopupClose = () => setDeletuserpopup(false);

  const addUserSuccess = (newData) => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    setValidated(false);
    handleAdduserPopupClose();
    setNewUserData({
      email: newData.email,
      name: newData.name,
      password: newData.password,
    });

    setNewUserAddedPopup(true);
    getUsersData(urlParams);
    setAddUserDetails({ email: '', mobileNo: '', name: '', role: '' });
  };

  const addUserFailure = (errorRes) => {
    setErrorResponse(errorRes);
  };

  const handleAddUser = () => {
    setAddUserDetails(addUserDetails);

    const newUserDetails = addUserDetails;

    setValidated(true);
    if (
      addUserDetails.name &&
      addUserDetails.email &&
      addUserDetails.mobileNo
    ) {
      addUser(newUserDetails, addUserSuccess, addUserFailure, dispatch);
    }
  };

  const deleteUserSuccess = () => {
    setDeletuserpopup(!deletuserpopup);
  };

  const handleDeleteUser = () => {
    let deleteUserData = deleteUserDetails;

    deleteUserData = _.omit(deleteUserData, ['publicId', 'concurrencyStamp']);
    editUser(
      deleteUserData,
      deleteUserDetails.publicId,
      deleteUserDetails.concurrencyStamp,
      deleteUserSuccess,
      dispatch
    );
  };

  const handleResetPassword = () => {
    setResetUserPopup(false);
  };

  const handleNewUserAdded = () => {
    setNewUserAddedPopup(false);
  };

  const updateUserSuccess = () => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getUsersData(urlParams);
  };

  const handleUpdateUser = () => {
    setEditUserDetails(editUserDetails);
    let updateUserDetails;

    updateUserDetails = editUserDetails;

    updateUserDetails = _.omit(updateUserDetails, [
      'publicId',
      'concurrencyStamp',
    ]);

    editUser(
      updateUserDetails,
      editUserDetails.publicId,
      editUserDetails.concurrencyStamp,
      updateUserSuccess,
      dispatch
    );
    setEdituserpopup(false);
  };

  const handleFilterPopup = () => {
    setFilterPopup(true);
    setApplyFilter(false);
  };

  const handleDownloadcvvPopup = () => setDownloadcvv(!downloadcvv);

  const closeFilterCallBack = () => {
    setFilterPopup(false);
    setDownloadcvv(false);
    if (name || mobileNumber || role || email || dueDate) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    // if (selectCity.length) {
    //   const citiesArr =
    //     selectCity &&
    //     selectCity.map((el) => {
    //       const index = el - 1;

    //       return cityList[index].label;
    //     });

    //   setCities(citiesArr.join(','));
    // } else {
    //   setCities('');
    // }

    const dateChanged =
      startDate.format('DD-MMM-YYYY') !==
        moment().subtract(29, 'days').format('DD-MMM-YYYY') ||
      endDate.format('DD-MMM-YYYY') !== moment().format('DD-MMM-YYYY');

    if (dateChanged) {
      setDueDate(true);
    }

    let urlParams;
    const arrValues = [];

    if (name || mobileNumber || role || email || dateChanged) {
      if (name) {
        urlParams = {
          'filters[1][ilike]': name,
          'filters[1][key]': 'name',
        };
        arrValues.push({
          'filters[1][ilike]': name,
          'filters[1][key]': 'name',
          name: 'Name',
        });
        setFilterParams(arrValues);
      }
      if (mobileNumber) {
        urlParams = {
          ...urlParams,
          'filters[1][eq]': mobileNumber,
          'filters[1][key]': 'mobileNumber',
        };
        arrValues.push({
          'filters[1][eq]': mobileNumber,
          'filters[1][key]': 'mobileNumber',
          name: 'Mobile Number',
        });
        setFilterParams(arrValues);
      }
      if (role) {
        urlParams = {
          ...urlParams,
          'filters[2][eq]': role,
          'filters[2][key]': 'role',
        };
        arrValues.push({
          'filters[2][eq]': role,
          'filters[2][key]': 'role',
          name: 'Role',
        });
        setFilterParams(arrValues);
      }
      if (dateChanged) {
        if (startDate.format('DD-MMM-YYYY') === endDate.format('DD-MMM-YYYY')) {
          urlParams = {
            ...urlParams,
            'filters[3][eq]': startDate.format('DD-MMM-YYYY'),
            'filters[3][key]': 'createdAt',
          };
          arrValues.push({
            'filters[3][eq]': startDate.format('DD-MMM-YYYY'),
            'filters[3][key]': 'createdAt',
            name: 'Date Created',
          });
          setFilterParams(arrValues);
        }
      }
      if (email) {
        urlParams = {
          ...urlParams,
          'filters[4][eq]': email,
          'filters[4][key]': 'email',
        };
        arrValues.push({
          'filters[4][eq]': email,
          'filters[4][key]': 'email',
          name: 'Email',
        });
        setFilterParams(arrValues);
      }

      getUsersData({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
      });
      setApplyFilter(true);
    }
  };

  const clearFilterValues = () => {
    setName('');
    setMobileNumber('');
    setRole('');
    setStartDate(moment().subtract(29, 'days'));
    setEndDate(moment());
    setSelectCity([]);
    // setCities('');
    setEmail('');
  };

  function actionIcon(onClick, cell) {
    const handleEditShowPopup = () => {
      setEditUserDetails({
        concurrencyStamp: cell.concurrencyStamp,
        mobileNumber: cell.mobileNumber,
        name: cell.name,
        publicId: cell.publicId,
        role: cell.role,
        status: cell.status,
      });

      setEdituserpopup(true);
    };
    const handleDeleteShowPopup = () => {
      setDeleteUserDetails({
        concurrencyStamp: cell.concurrencyStamp,
        publicId: cell.publicId,
        status: 'deleted',
      });

      setDeletuserpopup(true);
    };
    const handleGenerateResetShowPopup = () => {
      setGeneratePassword({
        concurrencyStamp: cell.concurrencyStamp,
        email: cell.email,
        name: cell.name,
        newPassword: '',
        publicId: cell.publicId,
      });

      setGenerateResetPopup(true);
    };

    return (
      <Action
        handleEditShowPopup={() => handleEditShowPopup(onClick)}
        handleDeleteShowPopup={() => handleDeleteShowPopup(onClick)}
        handleGenerateResetShowPopup={() =>
          handleGenerateResetShowPopup(onClick)
        }
      />
    );
  }

  const dateFormatter = (cell) => {
    if (cell) {
      return toDateFormat(cell);
    }
    return '-';
  };

  function userName(cell, row) {
    return <Link to={`/users/${row.publicId}`}>{cell}</Link>;
  }

  function userMobileNo(cell, row) {
    return <Link to={`/users/${row.publicId}`}>{cell}</Link>;
  }

  const addClassCallBack = () => {
    setShow(!show);
  };

  const removeFilterChips = (params, fieldName) => {
    const fieldsArr = addFiled;

    fieldsArr.pop();
    setAddFiled(fieldsArr);
    params.forEach((element, index) => {
      if (element.name === fieldName) {
        params.splice(index, 1);
      }
    });
    setFilterParams(params);
  };

  const updateFilterInput = (filterName) => {
    const params = filterParams;
    let newObj = {};

    if (filterName === 'Name') {
      setName('');
      removeFilterChips(params, 'Name');
    }
    if (filterName === 'Mobile Number') {
      setMobileNumber('');
      removeFilterChips(params, 'Mobile Number');
    }
    if (filterName === 'Role') {
      setRole('');
      removeFilterChips(params, 'Role');
    }
    if (filterName === 'Email') {
      setEmail('');
      removeFilterChips(params, 'Email');
    }

    if (filterName === 'Date Created') {
      setStartDate(moment().subtract(29, 'days'));
      setEndDate(moment());
      setDueDate(false);
      removeFilterChips(params, 'Date Created');
    }

    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    getUsersData({
      ...urlParams,
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    });
  };

  const createCustomToolBar = (props) => {
    return (
      <div>
        {props.components.searchPanel}
        {applyFilter && (
          <div className="common-table-chips-section">
            {name && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Name:</label>
                  <span> {` '${name}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Name')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {mobileNumber && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Mobile Number:</label>
                  <span> {` '${mobileNumber}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Mobile Number')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {role && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Role:</label>
                  <span> {` '${role}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Role')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {dueDate && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Date Created:</label>
                  {startDate.format('DD-MMM-YYYY') ===
                  endDate.format('DD-MMM-YYYY') ? (
                    <span>{` '${startDate.format('DD-MMM-YYYY')}'`}</span>
                  ) : (
                    <span>{` '${startDate.format(
                      'DD-MMM-YYYY'
                    )} - ${endDate.format('DD-MMM-YYYY')}'`}</span>
                  )}
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Date Created')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {email && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Email:</label>
                  <span> {` '${email}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Email')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {/* {cities && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>City:</label>
                  <span>{`'${cities}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => {
                        setCities('');
                        setSelectCity([]);
                      }}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    );
  };

  const tableHeaderData = [
    {
      columnClassName: '',
      dataField: 'id',
      dataFormat: (cell) => cell,
      dataSort: false,
      isKey: true,
      name: '#',
      width: '100',
    },
    {
      columnClassName: '',
      dataField: 'name',
      dataFormat: userName,
      dataSort: true,
      isKey: false,
      name: 'Name',
      width: '240',
    },
    {
      columnClassName: '',
      dataField: 'mobileNumber',
      dataFormat: userMobileNo,
      dataSort: false,
      isKey: false,
      name: 'Mobile No',
      width: '200',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'role',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Role',
      width: '150',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'createdAt',
      dataFormat: dateFormatter,
      dataSort: true,
      isKey: false,
      name: 'Date Created',
      width: '180',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'email',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'EMAIL ID',
      width: '250',
    },
    {
      columnClassName: '',
      dataField: 'action',
      dataFormat: actionIcon,
      dataSort: false,
      isKey: false,
      name: 'Actions',
      width: '150',
    },
  ];

  return (
    <div>
      <Header />
      <div className="common-container">
        {filterPopup || downloadcvv ? (
          <div className="common-overlay" onClick={closeFilterCallBack}></div>
        ) : null}
        <SidebarIcon addClassCallBack={addClassCallBack} show={show} />
        <div className={`common-wrapper ${show ? 'active' : ''} `}>
          <div className="col-md-12 mpad">
            <div className="common-heading">
              <h1>Manage Users</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="col-md-12 mpad ">
            <AddNewUser handleAdduserPopupShow={handleAdduserPopupShow} />
          </div>
          <div className="today-emi-sec">
            <DataTable
              tableData={usersList}
              tableHeaderData={tableHeaderData}
              totalRecords={totalRecords}
              isFetching={isFetching}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              getTableData={getUsersData}
              createCustomToolBar={createCustomToolBar}
              tableTitle=""
              toggleDownloadFilesPopup={handleDownloadcvvPopup}
              toggleFilterPopup={handleFilterPopup}
              filterPopup={filterPopup}
              filterPopupClass="common-table-filter-popup"
              pageFilters={manageUserFilters}
              handleApplyFilter={handleApplyFilter}
              closeFilterCallBack={closeFilterCallBack}
              clearFilterValues={clearFilterValues}
              getFilterState={getFilterState}
              filterChangeHandler={filterChangeHandler}
              addFiled={addFiled}
              setAddFiled={setAddFiled}
              downloadPopupClass="manage-download-popup"
              downloadcvv={downloadcvv}
              setDownloadcvv={setDownloadcvv}
              exportUrl="emi"
              filterParams={filterParams}
            />
          </div>
        </div>
        <Footer show={show} />
        <div className={`common-side-bar ${show ? 'active' : ''} `}>
          <SideBar addClassCallBack={addClassCallBack} show={show} />
        </div>
      </div>
      {/* Add user Modal */}
      <Modal
        show={adduserpopup}
        onHide={() => setAdduserpopup(false)}
        animation={false}
        className="add-user-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setAdduserpopup(false)}>
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <AddUser
            closeAddUserPopup={handleAdduserPopupClose}
            addUserDetails={addUserDetails}
            setAddUserDetails={setAddUserDetails}
            handleAddUser={handleAddUser}
            validated={validated}
            errorResponse={errorResponse}
            setErrorResponse={setErrorResponse}
          />
        </Modal.Body>
      </Modal>
      {/* Delet user Modal */}
      <Modal
        show={deletuserpopup}
        onHide={() => setDeletuserpopup(false)}
        animation={false}
        className="delete-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setDeletuserpopup(false)}>
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <DeleteUser
            deletuserPopupClose={deletuserPopupClose}
            handleDeleteUser={handleDeleteUser}
          />
        </Modal.Body>
      </Modal>
      {/* Edit user Modal */}
      <Modal
        show={edituserpopup}
        onHide={() => setEdituserpopup(false)}
        animation={false}
        className="edit-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setEdituserpopup(false)}>
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <EditUser
            closeEditUserPopup={() => setEdituserpopup(false)}
            editUserDetails={editUserDetails}
            setEditUserDetails={setEditUserDetails}
            handleUpdateUser={handleUpdateUser}
          />
        </Modal.Body>
      </Modal>
      {/* Generate Reset Password user Modal */}
      <Modal
        show={generateResetPopup}
        onHide={() => setGenerateResetPopup(false)}
        animation={false}
        className="generate-reset-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setGenerateResetPopup(false)}
          >
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <GenerateResetPassword
            closeGenerateResetUserPopup={() => setGenerateResetPopup(false)}
            handleGeneratePassword={handleGeneratePassword}
          />
        </Modal.Body>
      </Modal>
      {/* Reset Password user Modal */}
      <Modal
        show={resetUserPopup}
        onHide={() => setResetUserPopup(false)}
        animation={false}
        className="custom-reset-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setResetUserPopup(false)}>
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <ResetPassword
            closePopup={() => setResetUserPopup(false)}
            heading="RESET PASSWORD"
            message="New Password Successfully Generated For"
            newUserName={generatePassword.name}
            newUserEmail={generatePassword.email}
            newUserPassword={generatePassword.newPassword}
            handleSubmit={handleResetPassword}
          />
        </Modal.Body>
      </Modal>
      {/* New User Added Modal */}
      <Modal
        show={newUserAddedPopup}
        onHide={() => setNewUserAddedPopup(false)}
        animation={false}
        className="custom-reset-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setNewUserAddedPopup(false)}
          >
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <ResetPassword
            closePopup={() => setNewUserAddedPopup(false)}
            heading="New User Added"
            message="Your New User Added Successfully"
            newUserName={newUserData.name}
            newUserEmail={newUserData.email}
            newUserPassword={newUserData.password}
            handleSubmit={handleNewUserAdded}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageUsers;
