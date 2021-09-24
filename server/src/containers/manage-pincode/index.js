/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { Breadcrumb, Modal } from 'react-bootstrap';

import { managePincode } from './manage-pincode-action';
import { editPincode } from './edit-pincode-action';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';
import CloseIconWhite from '../../../images/icons/closeIconWhite.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import Footer from '../../components/footer';
import EditIconBlack from '../../../images/icons/editIconBlack.svg';
import EditPincode from '../../components/edit-pincode';
import DataTable from '../../components/data-table';

import { managePincodeFilters } from './manage-pincode-constants';

const ManagePincode = () => {
  const [pincode, setPincode] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [divisionName, setDivisionName] = useState('');
  const [regionName, setRegionName] = useState('');
  const [taluk, setTaluk] = useState('');
  const [stateName, setStateName] = useState('');
  const [status, setStatus] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([managePincodeFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

  const [editPincodePopup, setEditPincodePopup] = useState(false);

  const [editPincodeDetails, setEditPincodeDetails] = useState({
    concurrencyStamp: '',
    districtName: '',
    divisionName: '',
    officeName: '',
    pincode: '',
    regionName: '',
    stateName: '',
    status: true,
    taluk: '',
  });

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Pincode') {
      setPincode(filterValue);
    } else if (filterName === 'Office Name') {
      setOfficeName(filterValue);
    } else if (filterName === 'Division Name') {
      setDivisionName(filterValue);
    } else if (filterName === 'Region Name') {
      setRegionName(filterValue);
    } else if (filterName === 'Taluk') {
      setTaluk(filterValue);
    } else if (filterName === 'State Name') {
      setStateName(filterValue);
    } else if (filterName === 'Status') {
      setStatus(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Pincode') {
      return pincode;
    } else if (filterName === 'Office Name') {
      return officeName;
    } else if (filterName === 'Division Name') {
      return divisionName;
    } else if (filterName === 'Region Name') {
      return regionName;
    } else if (filterName === 'Taluk') {
      return taluk;
    } else if (filterName === 'State Name') {
      return stateName;
    } else if (filterName === 'Status') {
      return status;
    }
  };

  const { pincodeDetails, totalRecords, isFetching } = useSelector(
    (state) => state.managePincode
  );

  const pincodeDetailsList =
    pincodeDetails &&
    pincodeDetails.map((pincodeData, index) => {
      const id = index + 1;

      return {
        id,
        ...pincodeData,
      };
    });

  const dispatch = useDispatch();

  const getPincodeData = (urlParams) => {
    managePincode(urlParams, dispatch);
  };

  useEffect(() => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getPincodeData(urlParams);
  }, []);

  const pincodeSuccessCallBack = () => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    setEditPincodePopup(false);
    getPincodeData(urlParams);
  };

  const handleUpdatePincode = () => {
    editPincode(
      {
        ...editPincodeDetails,
        status: editPincodeDetails.status ? 'active' : 'inactive',
      },
      pincodeSuccessCallBack,
      dispatch
    );
  };

  // Functions will be receiving params: cell, row, rowIdx.
  function buttonFormatter(cell) {
    if (cell === 'active') {
      return <label className="label-status-paid">{cell}</label>;
    } else if (cell === 'inactive') {
      return <label className="status-unpaid">{cell}</label>;
    }
    return '-';
  }
  function editIcon(row, cell) {
    const handleEditPincodePopup = () => {
      setEditPincodeDetails({
        concurrencyStamp: cell.concurrencyStamp,
        districtName: cell.districtName,
        divisionName: cell.divisionName,
        officeName: cell.officeName,
        pincode: cell.pincode,
        regionName: cell.regionName,
        stateName: cell.stateName,
        status: cell.status === 'active',
        taluk: cell.taluk,
      });
      setEditPincodePopup(true);
    };

    return (
      <img
        alt="action-icon"
        style={{ cursor: 'pointer' }}
        onClick={handleEditPincodePopup}
        src={EditIconBlack}
      />
    );
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
      pincode ||
      officeName ||
      divisionName ||
      regionName ||
      taluk ||
      stateName ||
      status
    ) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    let urlParams;
    const arrValues = [];

    if (
      pincode ||
      officeName ||
      divisionName ||
      regionName ||
      taluk ||
      stateName ||
      status
    ) {
      if (pincode) {
        urlParams = {
          'filters[0][eq]': pincode,
          'filters[0][key]': 'pincode',
        };
        arrValues.push({
          'filters[0][eq]': pincode,
          'filters[0][key]': 'pincode',
          name: 'Pincode',
        });
        setFilterParams(arrValues);
      }
      if (officeName) {
        urlParams = {
          ...urlParams,
          'filters[1][eq]': officeName,
          'filters[1][key]': 'officeName',
        };
        arrValues.push({
          'filters[1][eq]': officeName,
          'filters[1][key]': 'officeName',
          name: 'Office Name',
        });
        setFilterParams(arrValues);
      }
      if (divisionName) {
        urlParams = {
          ...urlParams,
          'filters[2][eq]': divisionName,
          'filters[2][key]': 'divisionName',
        };
        arrValues.push({
          'filters[2][eq]': divisionName,
          'filters[2][key]': 'divisionName',
          name: 'Division Name',
        });
        setFilterParams(arrValues);
      }
      if (regionName) {
        urlParams = {
          ...urlParams,
          'filters[3][eq]': regionName,
          'filters[3][key]': 'regionName',
        };
        arrValues.push({
          'filters[3][eq]': regionName,
          'filters[3][key]': 'regionName',
          name: 'Region Name',
        });
        setFilterParams(arrValues);
      }
      if (taluk) {
        urlParams = {
          ...urlParams,
          'filters[4][eq]': taluk,
          'filters[4][key]': 'taluk',
        };
        arrValues.push({
          'filters[4][eq]': taluk,
          'filters[4][key]': 'taluk',
          name: 'Taluk',
        });
        setFilterParams(arrValues);
      }
      if (stateName) {
        urlParams = {
          ...urlParams,
          'filters[5][eq]': stateName,
          'filters[5][key]': 'stateName',
        };
        arrValues.push({
          'filters[5][eq]': stateName,
          'filters[5][key]': 'stateName',
          name: 'State Name',
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

      getPincodeData({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
      });
      setApplyFilter(true);
    }
  };

  const clearFilterValues = () => {
    setPincode('');
    setOfficeName('');
    setDivisionName('');
    setRegionName('');
    setTaluk('');
    setStateName('');
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

    if (filterName === 'Pincode') {
      setPincode('');
      removeFilterChips(params, 'Pincode');
    }
    if (filterName === 'Office Name') {
      setOfficeName('');
      removeFilterChips(params, 'Office Name');
    }
    if (filterName === 'Division Name') {
      setDivisionName('');
      removeFilterChips(params, 'Division Name');
    }
    if (filterName === 'Region Name') {
      setRegionName('');
      removeFilterChips(params, 'Region Name');
    }
    if (filterName === 'Taluk') {
      setTaluk('');
      removeFilterChips(params, 'Taluk');
    }
    if (filterName === 'State Name') {
      setStateName('');
      removeFilterChips(params, 'State Name');
    }
    if (filterName === 'Status') {
      setStatus('');
      removeFilterChips(params, 'Status');
    }

    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    getPincodeData({
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
            {pincode && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Pincode:</label>
                  <span> {` '${pincode}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Pincode')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {officeName && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Office Name:</label>
                  <span> {` '${officeName}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Office Name')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {divisionName && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Division Name:</label>
                  <span> {` '${divisionName}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Division Name')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {regionName && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Region Name:</label>
                  <span> {` '${regionName}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Region Name')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}

            {taluk && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>Taluk:</label>
                  <span> {` '${taluk}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Taluk')}
                      src={CloseIconBlue}
                    />
                  </span>
                </div>
              </div>
            )}
            {stateName && (
              <div className="common-table-chips">
                <div className="chips-text">
                  <label>State Name:</label>
                  <span> {` '${stateName}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('State Name')}
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
      columnClassName: '',
      dataField: 'pincode',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Pincode',
      width: '150',
    },
    {
      columnClassName: '',
      dataField: 'officeName',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Office Name',
      width: '220',
    },
    {
      columnClassName: '',
      dataField: 'divisionName',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Division Name',
      width: '160',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'regionName',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Region Name',
      width: '180',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'taluk',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'Taluk',
      width: '150',
    },
    {
      columnClassName: 'col-grey',
      dataField: 'stateName',
      dataFormat: (cell) => cell,
      dataSort: true,
      isKey: false,
      name: 'State Name',
      width: '190',
    },
    {
      columnClassName: '',
      dataField: 'status',
      dataFormat: buttonFormatter,
      dataSort: true,
      isKey: false,
      name: 'Status',
      width: '150',
    },
    {
      columnClassName: '',
      dataField: '',
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
              <h1>Manage Pincode</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Pincode</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="loan-container mar0 ">
            <DataTable
              tableData={pincodeDetailsList}
              tableHeaderData={tableHeaderData}
              totalRecords={totalRecords}
              isFetching={isFetching}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              getTableData={getPincodeData}
              createCustomToolBar={createCustomToolBar}
              tableTitle=""
              toggleDownloadFilesPopup={handleDownloadcvvPopup}
              toggleFilterPopup={handleFilterPopup}
              filterPopup={filterPopup}
              filterPopupClass="common-table-filter-popup"
              pageFilters={managePincodeFilters}
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
      {/* Edit pincode Modal */}
      <Modal
        show={editPincodePopup}
        onHide={() => setEditPincodePopup(false)}
        animation={false}
        className="delete-reason-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setEditPincodePopup(false)}
          >
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <EditPincode
            closeEditPincodePopup={() => setEditPincodePopup(false)}
            editPincodeDetails={editPincodeDetails}
            setEditPincodeDetails={setEditPincodeDetails}
            handleUpdatePincode={handleUpdatePincode}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManagePincode;
