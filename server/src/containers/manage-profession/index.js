import React, { useState, useEffect, Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { Breadcrumb, Modal } from 'react-bootstrap';

import { manageProfession } from './manage-profession-action';
import { manageProfessionFilters } from './manage-profession-constants';

import CloseIconBlue from '../../../images/icons/closeIconBlue.svg';
import EditIconBlack from '../../../images/icons/editIconBlack.svg';
import CloseIconWhite from '../../../images/icons/closeIconWhite.svg';

import Header from '../../components/header';
import SideBar from '../../components/side-bar';
import SidebarIcon from '../../components/sidebar-icon';
import Footer from '../../components/footer';
import EditProfession from '../../components/edit-profession';
import DataTable from '../../components/data-table';

const ManageProfession = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [addFiled, setAddFiled] = useState([manageProfessionFilters[0].name]);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const [filterPopup, setFilterPopup] = useState(false);
  const [editProfessionPopup, setEditProfessionPopup] = useState(false);
  const [show, setShow] = useState(false);
  const [downloadcvv, setDownloadcvv] = useState(false);

  const [editProfessionDetails, setEditProfessionDetails] = useState({
    concurrencyStamp: '',
    name: '',
    publicId: '',
    status: true,
  });

  const { professionDetails, totalRecords, isFetching } = useSelector(
    (state) => state.manageProfession
  );

  const professionDetailsList =
    professionDetails &&
    professionDetails.map((profession, index) => {
      const id = index + 1;

      return {
        id,
        ...profession,
      };
    });

  const filterChangeHandler = (filterName, filterValue) => {
    if (filterName === 'Name Of Profession') {
      setName(filterValue);
    } else if (filterName === 'Status') {
      setStatus(filterValue);
    }
  };
  // eslint-disable-next-line consistent-return
  const getFilterState = (filterName) => {
    if (filterName === 'Name Of Profession') {
      return name;
    } else if (filterName === 'Status') {
      return status;
    }
  };

  const dispatch = useDispatch();

  const getProfessionData = (urlParams) => {
    manageProfession(urlParams, dispatch);
  };

  useEffect(() => {
    const urlParams = {
      pageNumber: currentPageNumber,
      pageSize: currentPageSize,
    };

    getProfessionData(urlParams);
  }, []);

  // Functions will be receiving params: cell, row, rowIdx.
  function professionLogo(cell, row) {
    if (cell) {
      return (
        <Fragment>
          <img
            alt="profession-logo"
            style={{ height: '25px', width: '25px' }}
            src={row.iconUrl}
          />
          <label style={{ marginLeft: '10px' }}>{cell}</label>
        </Fragment>
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
  function editIcon() {
    const handleEditProfessionPopup = () => setEditProfessionPopup(true);

    return (
      <img
        alt="action-icon"
        style={{ cursor: 'pointer' }}
        onClick={handleEditProfessionPopup}
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
    if (name || status) {
      setApplyFilter(true);
    }
  };

  const handleApplyFilter = () => {
    closeFilterCallBack();

    let urlParams;
    const arrValues = [];

    if (name) {
      if (name) {
        urlParams = {
          'filters[1][ilike]': name,
          'filters[1][key]': 'name',
        };
        arrValues.push({
          'filters[1][ilike]': name,
          'filters[1][key]': 'name',
          name: 'Name Of Profession',
        });
        setFilterParams(arrValues);
      }
      if (status) {
        urlParams = {
          ...urlParams,
          'filters[1][eq]': status,
          'filters[1][key]': 'status',
        };
        arrValues.push({
          'filters[1][eq]': status,
          'filters[1][key]': 'status',
          name: 'Status',
        });
        setFilterParams(arrValues);
      }

      getProfessionData({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
      });
      setApplyFilter(true);
    }
  };

  const clearFilterValues = () => {
    setName('');
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

    if (filterName === 'Name Of Profession') {
      setName('');
      removeFilterChips(params, 'Name Of Profession');
    }

    if (filterName === 'Status') {
      setStatus('');
      removeFilterChips(params, 'Status');
    }
    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    getProfessionData({
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
                  <label>Name Of Profession:</label>
                  <span> {` '${name}'`}</span>
                </div>
                <div className="chips-clear">
                  <span>
                    <img
                      onClick={() => updateFilterInput('Name Of Profession')}
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
      width: '180',
    },
    {
      columnClassName: '',
      dataField: 'name',
      dataFormat: professionLogo,
      dataSort: true,
      isKey: false,
      name: 'Name Of Profession',
      width: '600',
    },
    {
      columnClassName: '',
      dataField: 'status',
      dataFormat: buttonFormatter,
      dataSort: true,
      isKey: false,
      name: 'Status',
      width: '300',
    },
    {
      columnClassName: '',
      dataField: 'action',
      dataFormat: editIcon,
      dataSort: false,
      isKey: false,
      name: 'Action',
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
              <h1>Manage Profession</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Settings</Breadcrumb.Item>
                <Breadcrumb.Item active>Manage Profession</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div className="loan-container mar0 ">
            <DataTable
              tableData={professionDetailsList}
              tableHeaderData={tableHeaderData}
              totalRecords={totalRecords}
              isFetching={isFetching}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              currentPageSize={currentPageSize}
              setCurrentPageSize={setCurrentPageSize}
              getTableData={getProfessionData}
              createCustomToolBar={createCustomToolBar}
              tableTitle=""
              toggleDownloadFilesPopup={handleDownloadcvvPopup}
              toggleFilterPopup={handleFilterPopup}
              filterPopup={filterPopup}
              filterPopupClass="common-table-filter-popup"
              pageFilters={manageProfessionFilters}
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
      {/* Edit profession Modal */}
      <Modal
        show={editProfessionPopup}
        onHide={() => setEditProfessionPopup(false)}
        animation={false}
        className="edit-reason-popup"
      >
        <div className="common-image">
          <div
            className="common-img"
            onClick={() => setEditProfessionPopup(false)}
          >
            <img alt="close-icon-gray" src={CloseIconWhite} />
          </div>
        </div>
        <Modal.Body>
          <EditProfession
            closeEditProfessionPopup={() => setEditProfessionPopup(false)}
            editProfessionDetails={editProfessionDetails}
            setEditProfessionDetails={setEditProfessionDetails}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageProfession;
