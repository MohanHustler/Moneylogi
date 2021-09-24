/* eslint-disable max-lines */
/* eslint-disable indent */
import React, { useState, useEffect } from 'react';

import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { disbursmentFilters } from './disbursment-constants';
import { disbursment } from './disbursment-action';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import ProgressBar from '../../components/progress-bar';
import Footer from '../../components/footer';
import DataTable from '../../components/data-table';
import {
  toNumberWithCommaAndDecimal,
  toDateFormat,
} from '../../utils/formattor';

const Disbursment = () => {
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
  const [addFiled, setAddFiled] = useState([disbursmentFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

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

  const getDisbursmentData = (urlParams) => {
    disbursment(urlParams, dispatch);
  };

  useEffect(() => {
    const urlParams = {
      'filters[0][key]': 'status',
      'filters[0][nin][0]': 'initiated',
      'filters[0][nin][1]': 'reversed',
      'filters[0][nin][2]': 'canceled',
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getDisbursmentData(urlParams);
  }, []);

  const { disbursmentDetails, totalRecords, isFetching } = useSelector(
    (state) => state.disbursment
  );

  const disbursmentList =
    disbursmentDetails &&
    disbursmentDetails.map((disbursmentData, index) => {
      const id = index + 1;

      return {
        amount: disbursmentData.amount,
        emiNumber: '-',
        expectedEndDate: disbursmentData.expectedEndDate,
        id,
        mobileNumber: disbursmentData.mobileNumber,
        name: disbursmentData.name,
        number: disbursmentData.number,
        publicId: disbursmentData.publicId,
        status: disbursmentData.status,
        userId: disbursmentData.userId,
      };
    });

  function buttonFormatter(cell) {
    if (cell === 'closed' || cell === 'failed') {
      return <label className="status-unpaid">{cell}</label>;
    } else if (cell === 'active') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'Partial-Paid') {
      return <label className="status-partialpaid">{cell}</label>;
    } else if (cell === 'initiate') {
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

  function loanNumberHandle(cell, row) {
    return <Link to={`/loaninformation/${row.publicId}`}>{cell || '-'}</Link>;
  }

  function userName(cell, row) {
    return <Link to={`/users/${row.userId}`}>{cell}</Link>;
  }

  function userMobileNo(cell, row) {
    return <Link to={`/users/${row.userId}`}>{cell}</Link>;
  }

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
            'filters[4][key]': 'expectedEndDate',
          };
          arrValues.push({
            'filters[4][eq]': startDate.format('DD-MMM-YYYY'),
            'filters[4][key]': 'expectedEndDate',
            name: 'EMI Due Date',
          });
          setFilterParams(arrValues);
        }
      }
      if (value) {
        urlParams = {
          ...urlParams,
          'filters[5][eq]': value,
          'filters[5][key]': 'amount',
        };
        arrValues.push({
          'filters[5][eq]': value,
          'filters[5][key]': 'amount',
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

      getDisbursmentData({
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

    getDisbursmentData({
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
      dataFormat: loanNumberHandle,
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
      dataField: 'expectedEndDate',
      dataFormat: dateFormatter,
      dataSort: true,
      isKey: false,
      name: 'EMI Due Date',
      width: '150',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'amount',
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
      <Header />
      <div className="common-container">
        {filterPopup || downloadcvv ? (
          <div className="common-overlay" onClick={closeFilterCallBack}></div>
        ) : null}
        <SidebarIcon addClassCallBack={addClassCallBack} show={show} />
        <div className={`common-wrapper ${show ? 'active' : ''} `}>
          <div className="col-md-12 mpad">
            <div className="common-heading">
              <h1>Disbursement</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Report</Breadcrumb.Item>
                <Breadcrumb.Item active>Disbursments</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="dashboard-disburment-card ">
            <div className="col-lg-4 col-md-6 col-sm-12 mpad">
              <ProgressBar
                percent="50"
                amount="56,296,011.00"
                text="Total Principal Disbursed INR"
                disbursement="22.2% more disbursement"
                color="blue-color"
                disbursementLabel=""
                disbursementSpan=""
                disbursementLabelText="Processing fees charged"
                disbursementSpanText="17,25,219.00"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mpad">
              <ProgressBar
                percent="75"
                amount="56,296,011.00"
                text="Total Principal Disbursed INR"
                disbursement="22.2% more disbursement"
                color="green-color"
                disbursementLabel="For average tenure days"
                disbursementSpan="170"
                disbursementLabelText=""
                disbursementSpanText=""
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mpad">
              <ProgressBar
                percent="27"
                amount="21,184,490.48"
                text="Principal Outstanding"
                disbursement="27.1% more default"
                color="red-color"
                disbursementLabel="For active loans"
                disbursementSpan="1454"
                disbursementLabelText=""
                disbursementSpanText=""
              />
            </div>
          </div>
          <div className="today-emi-sec">
            <DataTable
              tableData={disbursmentList}
              tableHeaderData={tableHeaderData}
              totalRecords={totalRecords}
              isFetching={isFetching}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              getTableData={getDisbursmentData}
              createCustomToolBar={createCustomToolBar}
              tableTitle="DISBURSMENTS"
              toggleDownloadFilesPopup={handleDownloadcvvPopup}
              toggleFilterPopup={handleFilterPopup}
              filterPopup={filterPopup}
              filterPopupClass="common-table-filter-popup"
              pageFilters={disbursmentFilters}
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
              exportUrl="loan"
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

export default Disbursment;
