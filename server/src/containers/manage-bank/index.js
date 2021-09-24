/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { Breadcrumb, Modal } from 'react-bootstrap';

import { manageBank } from './manage-bank-action';
import { editBank } from './edit-bank-action';
import { getBankData } from './bank-details-action';
import { manageBankFilters } from './manage-bank-constants';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';
import EditIconBlack from '../../../images/icons/editIconBlack.svg';
import CloseIconWhite from '../../../images/icons/closeIconWhite.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import Footer from '../../components/footer';
import EditBank from '../../components/edit-bank';
import DataTable from '../../components/data-table';

const ManageBank = () => {
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [finbitCode, setFinbitCode] = useState('');
  const [razorPayCode, setRazorPayCode] = useState('');
  const [status, setStatus] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([manageBankFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

  const [editBankpopup, setEditBankpopup] = useState(false);

  const [editBankDetails, setEditBankDetails] = useState({
    concurrencyStamp: '',
    finbitCode: '',
    ifscCode: '',
    name: '',
    publicId: '',
    razorpayCode: '',
    status: true,
  });

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Bank Name') {
      setBankName(filterValue);
    } else if (filterName === 'Ifsc Code') {
      setIfscCode(filterValue);
    } else if (filterName === 'Finbit Code') {
      setFinbitCode(filterValue);
    } else if (filterName === 'Razorpay Code') {
      setRazorPayCode(filterValue);
    } else if (filterName === 'Status') {
      setStatus(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Bank Name') {
      return bankName;
    } else if (filterName === 'Ifsc Code') {
      return ifscCode;
    } else if (filterName === 'Finbit Code') {
      return finbitCode;
    } else if (filterName === 'Razorpay Code') {
      return razorPayCode;
    } else if (filterName === 'Status') {
      return status;
    }
  };

  const { bankDetails, totalRecords, isFetching } = useSelector(
    (state) => state.manageBank
  );

  const bankDetailsList =
    bankDetails &&
    bankDetails.map((bank, index) => {
      const id = index + 1;

      return {
        id,
        ...bank,
      };
    });

  const dispatch = useDispatch();

  const getBankDetails = (urlParams) => {
    manageBank(urlParams, dispatch);
  };

  useEffect(() => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getBankDetails(urlParams);
  }, []);

  const updateBankSuccess = () => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getBankDetails(urlParams);
  };
  const handleUpdateBank = () => {
    editBank(
      {
        ...editBankDetails,
        status: editBankDetails.status ? 'active' : 'inactive',
        updateBankSuccess,
      },
      dispatch
    );
    setEditBankpopup(false);
  };

  // Functions will be receiving params: cell, row, rowIdx.
  function bankLogo(cell) {
    if (cell) {
      return (
        <img
          alt="action-icon"
          style={{ height: '25px', width: '25px' }}
          src={cell}
        />
      );
    }
    return '-';
  }
  function buttonFormatter(cell) {
    if (cell === 'active') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'inactive') {
      return <label className="status-unpaid">{cell}</label>;
    }
    return '-';
  }

  const getBankSuccessCallback = (bankData) => {
    setEditBankDetails({
      concurrencyStamp: bankData.concurrencyStamp,
      finbitCode: bankData.finbitCode,
      ifscCode: bankData.ifscCode,
      name: bankData.name,
      publicId: bankData.publicId,
      razorpayCode: bankData.razorpayCode,
      status: bankData.status === 'active',
    });
    setEditBankpopup(true);
  };
  const editIcon = (row, cell) => {
    const handleEditBankPopup = () => {
      getBankData(cell.publicId, getBankSuccessCallback, dispatch);
    };

    return (
      <img
        alt="action-icon"
        style={{ cursor: 'pointer' }}
        onClick={handleEditBankPopup}
        src={EditIconBlack}
      />
    );
  };

  const handleFilterPopup = () => {
    setFilterPopup(true);
    setApplyFilter(false);
  };

  const handleDownloadcvvPopup = () => setDownloadcvv(!downloadcvv);

  const closeFilterCallBack = () => {
    setFilterPopup(false);
    setDownloadcvv(false);
    if (bankName || ifscCode || finbitCode || razorPayCode || status) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    let urlParams;
    const arrValues = [];

    if (bankName || ifscCode || finbitCode || razorPayCode || status) {
      if (bankName) {
        urlParams = {
          'filters[0][eq]': bankName,
          'filters[0][key]': 'name',
        };
        arrValues.push({
          'filters[0][eq]': bankName,
          'filters[0][key]': 'name',
          name: 'Bank Name',
        });
        setFilterParams(arrValues);
      }
      if (ifscCode) {
        urlParams = {
          ...urlParams,
          'filters[1][eq]': ifscCode,
          'filters[1][key]': 'ifscCode',
        };
        arrValues.push({
          'filters[1][eq]': ifscCode,
          'filters[1][key]': 'ifscCode',
          name: 'Ifsc Code',
        });
        setFilterParams(arrValues);
      }
      if (finbitCode) {
        urlParams = {
          ...urlParams,
          'filters[2][eq]': finbitCode,
          'filters[2][key]': 'finbitCode',
        };
        arrValues.push({
          'filters[2][eq]': finbitCode,
          'filters[2][key]': 'finbitCode',
          name: 'Finbit Code',
        });
        setFilterParams(arrValues);
      }
      if (razorPayCode) {
        urlParams = {
          ...urlParams,
          'filters[3][eq]': razorPayCode,
          'filters[3][key]': 'razorpayCode',
        };
        arrValues.push({
          'filters[3][eq]': razorPayCode,
          'filters[3][key]': 'razorpayCode',
          name: 'Razorpay Code',
        });
        setFilterParams(arrValues);
      }
      if (status) {
        urlParams = {
          ...urlParams,
          'filters[4][eq]': status,
          'filters[4][key]': 'status',
        };
        arrValues.push({
          'filters[4][eq]': status,
          'filters[4][key]': 'status',
          name: 'Status',
        });
        setFilterParams(arrValues);
      }

      getBankDetails({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
      });
      setApplyFilter(true);
    }
  };

  const clearFilterValues = () => {
    setBankName('');
    setIfscCode('');
    setFinbitCode('');
    setRazorPayCode('');
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

    if (filterName === 'Bank Name') {
      setBankName('');
      removeFilterChips(params, 'Bank Name');
    }
    if (filterName === 'Ifsc Code') {
      setIfscCode('');
      removeFilterChips(params, 'Ifsc Code');
    }
    if (filterName === 'Finbit Code') {
      setFinbitCode('');
      removeFilterChips(params, 'Finbit Code');
    }
    if (filterName === 'Razorpay Code') {
      setRazorPayCode('');
      removeFilterChips(params, 'Razorpay Code');
    }
    if (filterName === 'Status') {
      setStatus('');
      removeFilterChips(params, 'Status');
    }

    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    getBankDetails({
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

            {ifscCode && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Ifsc Code:</label>
                  <span> {` '${ifscCode}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Ifsc Code')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {finbitCode && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Finbit Code:</label>
                  <span> {` '${finbitCode}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Finbit Code')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {razorPayCode && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Razorpay Code:</label>
                  <span> {` '${razorPayCode}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Razorpay Code')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {status && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Status:</label>
                  <span> {` '${status}'`}</span>
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
      columnClassName: 'col-grey',
      dataField: 'id',
      dataFormat: (cell) => cell,
      dataSort: false,
      isKey: true,
      name: '#',
      width: '80',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'iconUrl',
      dataFormat: bankLogo,
      dataSort: false,
      isKey: false,
      name: 'Bank Logo',
      width: '130',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'name',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Bank name',
      width: '200',
    },
    {
      columnClassName: '',
      dataField: 'ifscCode',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'ifsc Code',
      width: '140',
    },
    {
      columnClassName: '',
      dataField: 'finbitCode',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'finbit Code',
      width: '220',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'razorpayCode',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'razorpay Code',
      width: '140',
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
    {
      columnClassName: '',
      dataField: 'action',
      dataFormat: editIcon,
      dataSort: false,
      isKey: false,
      name: 'Action',
      width: '100',
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
              <h1>Manage Banks</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Banks</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="loan-container mar0 ">
            <DataTable
              tableData={bankDetailsList}
              tableHeaderData={tableHeaderData}
              totalRecords={totalRecords}
              isFetching={isFetching}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              getTableData={getBankDetails}
              createCustomToolBar={createCustomToolBar}
              tableTitle=""
              toggleDownloadFilesPopup={handleDownloadcvvPopup}
              toggleFilterPopup={handleFilterPopup}
              filterPopup={filterPopup}
              filterPopupClass="common-table-filter-popup"
              pageFilters={manageBankFilters}
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
      {/* Edit Banks Modal */}
      <Modal
        show={editBankpopup}
        onHide={() => setEditBankpopup(false)}
        animation={false}
        className="edit-reason-popup"
      >
        <div className="common-image">
          <div className="common-img" onClick={() => setEditBankpopup(false)}>
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <EditBank
            closeEditUserPopup={() => setEditBankpopup(false)}
            editBankDetails={editBankDetails}
            setEditBankDetails={setEditBankDetails}
            handleUpdateBank={handleUpdateBank}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageBank;
