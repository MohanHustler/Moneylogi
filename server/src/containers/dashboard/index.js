/* eslint-disable max-lines */
/* eslint-disable indent */
import React, { useState, useEffect, Fragment } from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

import { Breadcrumb } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { dashboard } from './dashboard-action';
import { dashboardCard } from './dashboard-card-action';
import { recentActivity } from './recent-activity-action';
import { newRegistration } from './new-registration-action';
import { viewFile } from './view-file-action';
import { dashboardFilters } from './dashboard-constants';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';
import ProfileImg from '../../../images/icons/default-user-profile.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import ProgressBar from '../../components/progress-bar';
import Footer from '../../components/footer';
import PageLoader from '../../components/Loaders/page-loader';
import TableLoader from '../../components/Loaders/table-loader';
import {
  toNumberWithCommaAndDecimal,
  toDateTimeFormat,
  toDateFormat,
} from '../../utils/formattor';

import DataTable from '../../components/data-table';

const Dashboard = () => {
  // Filter State
  const [loanNumber, setLoanNumber] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emiNumber, setEmiNumber] = useState('');
  const [dueDate, setDueDate] = useState(false);
  const [startDate, setStartDate] = useState(moment().subtract(29, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([dashboardFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [newUserImg, setNewUserImg] = useState('');

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

  const [isPageLoading, setIsPageLoading] = useState(true);

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Loan Number') {
      setLoanNumber(filterValue);
    } else if (filterName === 'Name') {
      setName(filterValue);
    } else if (filterName === 'Mobile Number') {
      setMobileNumber(filterValue);
    } else if (filterName === 'EMI Number') {
      setEmiNumber(filterValue);
    } else if (filterName === 'EMI Due Date') {
      setStartDate(filterValue.startDate);
      setEndDate(filterValue.endDate);
    } else if (filterName === 'Value') {
      setValue(filterValue);
    } else if (filterName === 'Status') {
      setStatus(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Loan Number') {
      return loanNumber;
    } else if (filterName === 'Name') {
      return name;
    } else if (filterName === 'Mobile Number') {
      return mobileNumber;
    } else if (filterName === 'EMI Number') {
      return emiNumber;
    } else if (filterName === 'EMI Due Date') {
      return [startDate, endDate];
    } else if (filterName === 'Value') {
      return value;
    } else if (filterName === 'Status') {
      return status;
    }
  };

  const dispatch = useDispatch();

  const getDashboardData = (urlParams) => {
    dashboard(urlParams, dispatch);
  };

  useEffect(() => {
    setTimeout(() => setIsPageLoading(false), 1000);
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };
    const pageNumberWithSortingParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
      'sorting[0][direction]': ['DESC'],
      'sorting[0][key]': ['createdAt'],
    };

    getDashboardData(urlParams);
    dashboardCard(dispatch);
    recentActivity(pageNumberWithSortingParams, dispatch);
    newRegistration(pageNumberWithSortingParams, dispatch);
  }, []);

  const { dashboardDetails, totalRecords, isFetching } = useSelector(
    (state) => state.dashboard
  );

  const { dashboardCardDetails } = useSelector((state) => state.dashboardCard);
  const { recentActivityDetails, fetchingRecentActivity } = useSelector(
    (state) => state.recentActivity
  );

  const { newRegistrationDetails, fetchingNewRegistration } = useSelector(
    (state) => state.newRegistration
  );

  const viewFileSuccess = (imageDetails) => {
    setNewUserImg(imageDetails.imageUrl);
  };

  const dashboardList =
    dashboardDetails &&
    dashboardDetails.map((dashboardData, index) => {
      const id = index + 1;

      return {
        emiNumber: '-',
        id,
        ...dashboardData,
      };
    });

  const handleFilterPopup = () => {
    setFilterPopup(true);
    setApplyFilter(false);
  };

  const handleDownloadcvvPopup = () => setDownloadcvv(!downloadcvv);

  const closeFilterCallBack = () => {
    setFilterPopup(false);
    setDownloadcvv(false);
    if (
      loanNumber ||
      name ||
      mobileNumber ||
      emiNumber ||
      dueDate ||
      value ||
      status
    ) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    const dateChanged =
      startDate.format('DD-MMM-YYYY') !==
        moment().subtract(29, 'days').format('DD-MMM-YYYY') ||
      endDate.format('DD-MMM-YYYY') !== moment().format('DD-MMM-YYYY');

    if (dateChanged) {
      setDueDate(true);
    }

    let urlParams;
    const arrValues = [];

    if (
      loanNumber ||
      name ||
      mobileNumber ||
      emiNumber ||
      dateChanged ||
      value ||
      status
    ) {
      if (loanNumber) {
        urlParams = {
          'filters[0][eq]': loanNumber,
          'filters[0][key]': 'number',
        };
        arrValues.push({
          'filters[0][eq]': loanNumber,
          'filters[0][key]': 'number',
          name: 'Loan Number',
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
      if (emiNumber) {
        urlParams = {
          ...urlParams,
          'filters[3][eq]': emiNumber,
          'filters[3][key]': 'emiNumber',
        };
        arrValues.push({
          'filters[3][eq]': emiNumber,
          'filters[3][key]': 'emiNumber',
          name: 'EMI Number',
        });
        setFilterParams(arrValues);
      }
      if (dateChanged) {
        if (startDate.format('DD-MMM-YYYY') === endDate.format('DD-MMM-YYYY')) {
          urlParams = {
            ...urlParams,
            'filters[4][eq]': startDate.format('DD-MMM-YYYY'),
            'filters[4][key]': 'dueDate',
          };
          arrValues.push({
            'filters[4][eq]': startDate.format('DD-MMM-YYYY'),
            'filters[4][key]': 'dueDate',
            name: 'EMI Due Date',
          });
          setFilterParams(arrValues);
        }
      }

      if (value) {
        urlParams = {
          ...urlParams,
          'filters[5][eq]': value,
          'filters[5][key]': 'dueAmount',
        };
        arrValues.push({
          'filters[5][eq]': value,
          'filters[5][key]': 'dueAmount',
          name: 'Value',
        });
        setFilterParams(arrValues);
      }
      if (status) {
        urlParams = {
          ...urlParams,
          'filters[6][eq]': status,
          'filters[6][key]': 'status',
        };
        arrValues.push({
          'filters[6][eq]': status,
          'filters[6][key]': 'status',
          name: 'Status',
        });
        setFilterParams(arrValues);
      }

      getDashboardData({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
      });
      setApplyFilter(true);
    }
  };

  const clearFilterValues = () => {
    setLoanNumber('');
    setName('');
    setMobileNumber('');
    setEmiNumber('');
    setStartDate(moment().subtract(29, 'days'));
    setEndDate(moment());
    setValue('');
    setStatus('');
  };

  const addClassCallBack = () => {
    setShow(!show);
  };

  // Functions will be receiving params: cell, row, rowIdx.
  function buttonFormatter(cell) {
    if (cell === 'paid') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'unpaid' || cell === 'failed') {
      return <label className="status-unpaid">{cell}</label>;
    } else if (cell === 'Partial-Paid') {
      return <label className="status-partialpaid">{cell}</label>;
    } else if (cell === 'Payment-Initiated') {
      return <label className="label-status-initiated">{cell}</label>;
    }
    return '-';
  }

  const numberFormatter = (cell) => {
    if (cell) {
      return toNumberWithCommaAndDecimal(cell);
    }
    return '-';
  };

  const dateFormatter = (cell) => {
    if (cell) {
      return toDateFormat(cell);
    }
    return '-';
  };

  function userLoanNo(cell, row) {
    return <Link to={`/loaninformation/${row.loanId}`}>{cell}</Link>;
  }
  function userName(cell, row) {
    return <Link to={`/users/${row.userId}`}>{cell}</Link>;
  }
  function userMobileNo(cell, row) {
    return <Link to={`/users/${row.userId}`}>{cell}</Link>;
  }

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

    if (filterName === 'Loan Number') {
      setLoanNumber('');
      removeFilterChips(params, 'Loan Number');
    }
    if (filterName === 'Name') {
      setName('');
      removeFilterChips(params, 'Name');
    }
    if (filterName === 'Mobile Number') {
      setMobileNumber('');
      removeFilterChips(params, 'Mobile Number');
    }
    if (filterName === 'EMI Number') {
      setEmiNumber('');
      removeFilterChips(params, 'EMI Number');
    }
    if (filterName === 'EMI Due Date') {
      setStartDate(moment().subtract(29, 'days'));
      setEndDate(moment());
      setDueDate(false);
      removeFilterChips(params, 'EMI Due Date');
    }
    if (filterName === 'Value') {
      setValue('');
      removeFilterChips(params, 'Value');
    }
    if (filterName === 'Status') {
      setStatus('');
      removeFilterChips(params, 'Status');
    }

    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    getDashboardData({
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
            {loanNumber && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Loan Number:</label>
                  <span>{` '${loanNumber}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Loan Number')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {name && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Name: </label>
                  <span>{` '${name}'`}</span>
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
                  <label>Mobile Number: </label>
                  <span>{` '${mobileNumber}'`}</span>
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

            {emiNumber && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>EMI Number: </label>
                  <span>{` '${emiNumber}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('EMI Number')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {dueDate && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>EMI Due Date: </label>
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
                      onClick={() => updateFilterInput('EMI Due Date')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {value && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Value: </label>
                  <span>{` '${value}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Value')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {status && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Status: </label>
                  <span>{` '${status}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Status')}
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

  const { users } = dashboardCardDetails;

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
      dataField: 'number',
      dataFormat: userLoanNo,
      dataSort: true,
      isKey: false,
      name: 'Loan No',
      width: '150',
    },
    {
      columnClassName: '',
      dataField: 'name',
      dataFormat: userName,
      dataSort: true,
      isKey: false,
      name: 'Name',
      width: '180',
    },
    {
      columnClassName: '',
      dataField: 'mobileNumber',
      dataFormat: userMobileNo,
      dataSort: false,
      isKey: false,
      name: 'Mobile No',
      width: '150',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'emiNumber',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'EMI No',
      width: '120',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'dueDate',
      dataFormat: dateFormatter,
      dataSort: true,
      isKey: false,
      name: 'EMI Due Date',
      width: '150',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'dueAmount',
      dataFormat: numberFormatter,
      dataSort: true,
      isKey: false,
      name: 'Value',
      width: '150',
    },
    {
      columnClassName: '',
      dataField: 'status',
      dataFormat: buttonFormatter,
      dataSort: true,
      isKey: false,
      name: 'Status',
      width: '140',
    },
  ];

  return (
    <div>
      {isPageLoading ? (
        <PageLoader />
      ) : (
        <Fragment>
          <Header />
          <div className="common-container">
            {filterPopup || downloadcvv ? (
              <div
                className="common-overlay"
                onClick={closeFilterCallBack}
              ></div>
            ) : null}
            <SidebarIcon addClassCallBack={addClassCallBack} show={show} />
            <div className={`common-wrapper ${show ? 'active' : ''} `}>
              <div className="col-md-12 mpad">
                <div className="common-heading">
                  <h1>Dashboard</h1>
                  <Breadcrumb>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="dashboard-disburment-card ">
                <div className="col-lg-4 col-md-6 col-sm-12 mpad ">
                  <ProgressBar
                    percent="50"
                    // amount="49,34,98,489.00"
                    amount={users && toNumberWithCommaAndDecimal(users.total)}
                    text="Total Principal Disbursed Amount"
                    disbursement="22.2% more disburment"
                    color="blue-color"
                    disbursementLabel=""
                    disbursementLabelText=""
                    disbursementSpanText=""
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mpad ">
                  <ProgressBar
                    percent="75"
                    // amount="49,34,98,489.00"
                    amount={users && toNumberWithCommaAndDecimal(users.total)}
                    text="Total Principal Disbursed Amount"
                    disbursement="21.9% more disbursement"
                    color="green-color"
                    disbursementLabel=""
                    disbursementLabelText=""
                    disbursementSpanText=""
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 mpad">
                  <ProgressBar
                    percent="27"
                    // amount="4,98,489.00"
                    amount={users && toNumberWithCommaAndDecimal(users.total)}
                    text="Total Defaults Amount"
                    disbursement="27.1% more default"
                    color="red-color"
                    disbursementLabel=""
                    disbursementLabelText=""
                    disbursementSpanText=""
                  />
                </div>
              </div>
              <div className="dashboard-activity-registration">
                <div className="col-md-6 mpad">
                  <div className="activity-card">
                    <div className="recent-activity-section">
                      <div className="recent-activity-head">
                        <h2>Recent Activity</h2>
                        <span>
                          <Link to="/users">View All</Link>
                        </span>
                      </div>
                      <div className="recent-activity-top">
                        {!fetchingRecentActivity && (
                          <label>
                            <span>
                              {recentActivityDetails &&
                                recentActivityDetails.length}
                            </span>{' '}
                            new activity
                          </label>
                        )}
                      </div>

                      <div className="card-scroll">
                        {!fetchingRecentActivity ? (
                          recentActivityDetails &&
                          recentActivityDetails.map((recent, index) => (
                            <div
                              key={index}
                              className="recent-activity-content box-shadow"
                            >
                              <div>
                                <div className="recent-activity-content-left">
                                  <h1>
                                    <Link to={`/users/${recent.publicId}`}>
                                      {recent.mobileNumber}
                                    </Link>
                                  </h1>
                                  <label>
                                    Last Update{' '}
                                    <span>
                                      {toDateTimeFormat(recent.createdAt)}
                                    </span>
                                  </label>
                                </div>
                              </div>

                              <div className="recent-activity-content-right">
                                <label>{recent.status}</label>
                              </div>
                            </div>
                          ))
                        ) : (
                          <TableLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mpad">
                  <div className="registration-card">
                    <div className="recent-activity-section">
                      <div className="recent-activity-head">
                        <h2>New Registration</h2>
                        <span>
                          <Link to="/users">View All</Link>
                        </span>
                      </div>
                      <div className="recent-activity-top">
                        {!fetchingNewRegistration && (
                          <label>
                            <span>
                              {newRegistrationDetails &&
                                newRegistrationDetails.length}
                            </span>{' '}
                            new users
                          </label>
                        )}
                      </div>
                      <div className="card-scroll">
                        {!fetchingNewRegistration ? (
                          newRegistrationDetails &&
                          newRegistrationDetails.map((register, index) => (
                            <div
                              key={index}
                              className="recent-activity-content new-registration-content box-shadow"
                            >
                              <div className="recent-activity-img">
                                {register.profilePicId ? (
                                  (viewFile(
                                    register.profilePicId,
                                    viewFileSuccess,
                                    dispatch
                                  ),
                                  (
                                    <img
                                      src={newUserImg && newUserImg}
                                      alt="user-img"
                                    />
                                  ))
                                ) : (
                                  <img src={ProfileImg} />
                                )}
                              </div>
                              <div className="recent-activity-align">
                                <div className="recent-activity-content-left">
                                  <h1>
                                    <Link to={`/users/${register.publicId}`}>
                                      {register.mobileNumber}
                                    </Link>
                                  </h1>
                                  <label>
                                    Registered on{' '}
                                    <span>
                                      {toDateTimeFormat(register.createdAt)}
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="recent-activity-content-right">
                                <label className="green">
                                  {register.status}
                                </label>
                              </div>
                            </div>
                          ))
                        ) : (
                          <TableLoader />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="today-emi-sec">
                <DataTable
                  tableData={dashboardList}
                  tableHeaderData={tableHeaderData}
                  totalRecords={totalRecords}
                  isFetching={isFetching}
                  isSearch={isSearch}
                  setIsSearch={setIsSearch}
                  currentPageNumber={currentPageNumber}
                  setCurrentPageNumber={setCurrentPageNumber}
                  currentPageSize={currentPageSize}
                  setCurrentPageSize={setCurrentPageSize}
                  getTableData={getDashboardData}
                  createCustomToolBar={createCustomToolBar}
                  tableTitle="TODAY’S EMI"
                  toggleDownloadFilesPopup={handleDownloadcvvPopup}
                  toggleFilterPopup={handleFilterPopup}
                  filterPopup={filterPopup}
                  filterPopupClass="dasbord-table-filter-popup"
                  pageFilters={dashboardFilters}
                  handleApplyFilter={handleApplyFilter}
                  closeFilterCallBack={closeFilterCallBack}
                  clearFilterValues={clearFilterValues}
                  getFilterState={getFilterState}
                  filterChangeHandler={filterChangeHandler}
                  addFiled={addFiled}
                  setAddFiled={setAddFiled}
                  downloadPopupClass=""
                  downloadcvv={downloadcvv}
                  setDownloadcvv={setDownloadcvv}
                  exportUrl="loan-detail"
                  filterParams={filterParams}
                />
              </div>
            </div>
            <Footer show={show} />
            <div className={`common-side-bar ${show ? 'active' : ''} `}>
              <SideBar addClassCallBack={addClassCallBack} show={show} />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
