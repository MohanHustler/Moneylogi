/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Breadcrumb } from 'react-bootstrap';

import { manageUsers } from '../manage-users/manage-users-action';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import Footer from '../../components/footer';
import SidebarIcon from '../../components/sidebar-icon';
import { usersFilters } from './users-constatnts';

import DataTable from '../../components/data-table';

const Users = () => {
  // Filter State
  const [crifScore, setCrifScore] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [identityCheck, setIdentityCheck] = useState('');
  const [financialCheck, setFinancialCheck] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([usersFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Crif Score') {
      setCrifScore(filterValue);
    } else if (filterName === 'Name') {
      setName(filterValue);
    } else if (filterName === 'Mobile Number') {
      setMobileNumber(filterValue);
    } else if (filterName === 'Bank Name') {
      setBankName(filterValue);
    } else if (filterName === 'Identity Check') {
      setIdentityCheck(filterValue);
    } else if (filterName === 'Financial Check') {
      setFinancialCheck(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Crif Score') {
      return crifScore;
    } else if (filterName === 'Name') {
      return name;
    } else if (filterName === 'Mobile Number') {
      return mobileNumber;
    } else if (filterName === 'Bank Name') {
      return bankName;
    } else if (filterName === 'Identity Check') {
      return identityCheck;
    } else if (filterName === 'Financial Check') {
      return financialCheck;
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
          bankName: user.profile.bankName || '-',
          crifScore: user.profile.crifScore || '-',
          email: user.email || '-',
          id,
          mobileNumber: user.mobileNumber || '-',
          name: user.profile.name || '-',
          publicId: user.publicId,
        };
      }
      return {
        bankName: '-',
        crifScore: '-',
        email: user.email || '-',
        id,
        mobileNumber: user.mobileNumber || '-',
        name: '-',
        publicId: user.publicId,
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

  const handleFilterPopup = () => {
    setFilterPopup(true);
    setApplyFilter(false);
  };

  const handleDownloadcvvPopup = () => setDownloadcvv(!downloadcvv);

  const closeFilterCallBack = () => {
    setFilterPopup(false);
    setDownloadcvv(false);
    if (
      crifScore ||
      name ||
      mobileNumber ||
      bankName ||
      identityCheck ||
      financialCheck
    ) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    let urlParams;
    const arrValues = [];

    if (
      crifScore ||
      name ||
      mobileNumber ||
      bankName ||
      identityCheck ||
      financialCheck
    ) {
      if (crifScore) {
        urlParams = {
          'filters[0][eq]': crifScore,
          'filters[0][key]': 'crifScore',
        };
        arrValues.push({
          'filters[0][eq]': crifScore,
          'filters[0][key]': 'crifScore',
          name: 'Crif Score',
        });
        setFilterParams(arrValues);
      }
      if (name) {
        urlParams = {
          ...urlParams,
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
          'filters[2][eq]': mobileNumber,
          'filters[2][key]': 'mobileNumber',
        };
        arrValues.push({
          'filters[2][eq]': mobileNumber,
          'filters[2][key]': 'mobileNumber',
          name: 'Mobile Number',
        });
        setFilterParams(arrValues);
      }
      if (bankName) {
        urlParams = {
          ...urlParams,
          'filters[3][eq]': bankName,
          'filters[3][key]': 'bankName',
        };
        arrValues.push({
          'filters[3][eq]': bankName,
          'filters[3][key]': 'bankName',
          name: 'Bank Name',
        });
        setFilterParams(arrValues);
      }
      if (identityCheck) {
        urlParams = {
          ...urlParams,
          'filters[4][eq]': identityCheck,
          'filters[4][key]': 'identityCheck',
        };
        arrValues.push({
          'filters[4][eq]': identityCheck,
          'filters[4][key]': 'identityCheck',
          name: 'Identity Check',
        });
        setFilterParams(arrValues);
      }
      if (financialCheck) {
        urlParams = {
          ...urlParams,
          'filters[5][eq]': financialCheck,
          'filters[5][key]': 'financialCheck',
        };
        arrValues.push({
          'filters[5][eq]': financialCheck,
          'filters[5][key]': 'financialCheck',
          name: 'Financial Check',
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
    setCrifScore('');
    setName('');
    setMobileNumber('');
    setBankName('');
    setIdentityCheck('');
    setFinancialCheck('');
  };

  const userNameHandle = (cell, row) => {
    return <Link to={`/users/${row.publicId}`}>{cell || '-'}</Link>;
  };

  function userMobileNo(cell, row) {
    return <Link to={`/users/${row.publicId}`}>{cell}</Link>;
  }

  function identityFormatter(cell) {
    if (cell === 'paid' || cell === 'verified') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'unpaid' || cell === 'failed') {
      return <label className="status-unpaid">{cell}</label>;
    } else if (cell === 'yet to upload') {
      return <label className="status-partialpaid">{cell}</label>;
    } else if (cell === 'Payment-Initiated') {
      return <label className="label-status-initiated">{cell}</label>;
    }
    return '-';
  }

  function valueFormatter(cell) {
    if (cell === 'paid' || cell === 'verified') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'unpaid' || cell === 'failed') {
      return <label className="status-unpaid">{cell}</label>;
    } else if (cell === 'yet to upload') {
      return <label className="label-partialpaid">{cell}</label>;
    } else if (cell === 'Payment-Initiated') {
      return <label className="label-status-initiated">{cell}</label>;
    }
    return '-';
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

    if (filterName === 'Crif Score') {
      setCrifScore('');
      removeFilterChips(params, 'Crif Score');
    }
    if (filterName === 'Name') {
      setName('');
      removeFilterChips(params, 'Name');
    }
    if (filterName === 'Mobile Number') {
      setMobileNumber('');
      removeFilterChips(params, 'Mobile Number');
    }
    if (filterName === 'Bank Name') {
      setBankName('');
      removeFilterChips(params, 'Bank Name');
    }
    if (filterName === 'Identity Check') {
      setIdentityCheck('');
      removeFilterChips(params, 'Identity Check');
    }
    if (filterName === 'Financial Check') {
      setFinancialCheck('');
      removeFilterChips(params, 'Financial Check');
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
            {crifScore && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Crif Score:</label>
                  <span> {` '${crifScore}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Crif Score')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

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

            {bankName && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Bank Name:</label>
                  <span> {` '${bankName}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Bank Name')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {identityCheck && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Identity Check:</label>
                  <span> {` '${identityCheck}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Identity Check')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {financialCheck && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Financial Check:</label>
                  <span> {` '${financialCheck}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Financial Check')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}
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
      width: '80',
    },
    {
      columnClassName: '',
      dataField: 'crifScore',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Crif Score',
      width: '210',
    },
    {
      columnClassName: '',
      dataField: 'name',
      dataFormat: userNameHandle,
      dataSort: true,
      isKey: false,
      name: 'Name',
      width: '220',
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
      dataField: 'bankName',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Bank Name',
      width: '200',
    },
    {
      columnClassName: '',
      dataField: 'identity_check',
      dataFormat: identityFormatter,
      dataSort: true,
      isKey: false,
      name: 'Identity Check',
      width: '180',
    },
    {
      columnClassName: '',
      dataField: 'final_check',
      dataFormat: valueFormatter,
      dataSort: true,
      isKey: false,
      name: 'Financial Check',
      width: '180',
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
              <h1>Users</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="loan-container mar0">
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
              pageFilters={usersFilters}
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
              exportUrl="users"
              filterParams={filterParams}
            />
          </div>
        </div>
        <Footer show={show} />
        <div className={`common-side-bar ${show ? 'active' : ''} `}>
          <SideBar addClassCallBack={addClassCallBack} show={show} />
        </div>
      </div>
    </div>
  );
};

export default Users;
