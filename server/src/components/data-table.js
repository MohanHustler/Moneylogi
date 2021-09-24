import React, { useState, useEffect, Fragment } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';

import TableLoader from './Loaders/table-loader';
import { ExportIconBlue } from '../../images/icons/exportIconBlue';
import { FilterIconBlue } from '../../images/icons/filterIconBlue';
import CloseRoundIconGray from '../../images/icons/closeRoundIconGray.svg';
import Filter from '../components/filter';
import DownloadCvv from '../components/download-cvv';

const DataTable = ({
  tableData,
  tableHeaderData,
  totalRecords,
  isFetching,
  isSearch,
  setIsSearch,
  currentPageNumber,
  setCurrentPageNumber,
  currentPageSize,
  setCurrentPageSize,
  getTableData,
  createCustomToolBar,
  tableTitle,
  toggleDownloadFilesPopup,
  toggleFilterPopup,
  filterPopup,
  filterPopupClass,
  pageFilters,
  handleApplyFilter,
  closeFilterCallBack,
  clearFilterValues,
  getFilterState,
  filterChangeHandler,
  addFiled,
  setAddFiled,
  downloadPopupClass,
  downloadcvv,
  setDownloadcvv,
  exportUrl,
  filterParams,
  defaultsPage,
  executePayment,
  setExecutePayment,
}) => {
  const [data, setData] = useState(tableData);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [sortedOrder, setSortedOrder] = useState('asc');
  const [sortedName, setSortedName] = useState('');

  useEffect(() => {
    if (searchKeyWord === '') {
      setData(tableData);
    }
  }, [tableData]);

  const renderShowsTotal = (start, to) => {
    return (
      <div className="show-result">
        <p className="">
          Showing {start} to {to} of {totalRecords}&nbsp;record(s)
        </p>
      </div>
    );
  };

  const setLoader = () => {
    if (isFetching || isSearch) {
      return <TableLoader />;
    }
    return '';
  };

  const onSearchChangeHandle = (searchText, colInfos, multiColumnSearch) => {
    const text = searchText.trim();

    if (text !== searchKeyWord) {
      const filterSourceData = data;

      setSearchKeyWord(text);
      setIsSearch(true);
      setData([]);

      if (text === '') {
        setTimeout(() => {
          setData(tableData);
        }, 800);
        return;
      }

      let searchTextArray = [];

      if (multiColumnSearch) {
        searchTextArray = text.split(' ');
      } else {
        searchTextArray.push(text);
      }

      const searchResult = filterSourceData.filter((product) => {
        const keys = Object.keys(product);
        const keysLength = keys.length;
        let valid = false;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < keysLength; i++) {
          const key = keys[i];

          if (colInfos[key] && product[key]) {
            const {
              format,
              filterFormatted,
              formatExtraData,
              searchable,
              hidden,
            } = colInfos[key];
            let targetVal = product[key];

            if (!hidden && searchable) {
              if (filterFormatted && format) {
                targetVal = format(targetVal, product, formatExtraData);
              }
              for (
                let j = 0, textLength = searchTextArray.length;
                j < textLength;
                // eslint-disable-next-line no-plusplus
                j++
              ) {
                const filterVal = searchTextArray[j].toLowerCase();

                if (
                  targetVal.toString().toLowerCase().indexOf(filterVal) !== -1
                ) {
                  valid = true;
                  break;
                }
              }
            }
          }
        }
        return valid;
      });

      setTimeout(() => {
        setIsSearch(false);
        setData(searchResult);
      }, 800);
    }
  };

  const sizePerPageListChange = (sizePerPage) => {
    setCurrentPageSize(sizePerPage);
  };

  const onPageChange = (page, sizePerPage) => {
    setCurrentPageNumber(page);
    setCurrentPageSize(sizePerPage);

    const paramsList = filterParams;
    let newObj = {};

    paramsList.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    if (sortedName) {
      getTableData({
        ...urlParams,
        pageNumber: page,
        pageSize: sizePerPage,
        'sorting[0][direction]': sortedOrder,
        'sorting[0][key]': sortedName,
      });
    } else {
      getTableData({
        ...urlParams,
        pageNumber: page,
        pageSize: sizePerPage,
      });
    }
  };

  const onSortChangeHandle = (sortName, sortOrder) => {
    setSortedName(sortName);
    setSortedOrder(sortOrder);

    const paramsList = filterParams;
    let newObj = {};

    paramsList.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    if (urlParams) {
      getTableData({
        ...urlParams,
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
        'sorting[0][direction]': sortOrder,
        'sorting[0][key]': sortName,
      });
    } else {
      getTableData({
        pageNumber: currentPageNumber,
        pageSize: currentPageSize,
        'sorting[0][direction]': sortOrder,
        'sorting[0][key]': sortName,
      });
    }
  };

  const options = {
    // First page button text
    firstPage: 'First',
    // You can hide the dropdown for sizePerPage
    hideSizePerPage: false,
    // Last page button text
    lastPage: 'Last',
    // Next page button text
    nextPage: '>',
    noDataText: setLoader(),
    onPageChange,
    onSearchChange: onSearchChangeHandle,
    onSizePerPageList: sizePerPageListChange,
    onSortChange: onSortChangeHandle,
    // which page you want to show as default
    page: currentPageNumber,
    // where to start counting the pages
    pageStartIndex: 1,
    // default is bottom, top and both is all available
    paginationPosition: 'bottom',
    // Accept bool or function
    paginationShowsTotal: renderShowsTotal,
    // the pagination bar size.
    paginationSize: 5,
    // Previous page button text
    prePage: '<',
    searchDelayTime: 500,
    // which size per page you want to locate as default
    sizePerPage: currentPageSize,
    // you can change the dropdown list for size per page
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
    ],
    toolBar: createCustomToolBar,
    // Hide the going to First and Last page button,
    withFirstAndLast: true,
  };

  return (
    <Fragment>
      <div className="col-md-12 mpad">
        {tableTitle && (
          <div className="table-title-sec">
            <h1>{tableTitle}</h1>
            {defaultsPage && (
              <button
                disabled={executePayment}
                className="black-border-btn"
                onClick={() => setExecutePayment(true)}
              >
                Execute Payments
              </button>
            )}
          </div>
        )}
        {executePayment && (
          <div className="default-loader">
            <div className="default-loader-sec">
              <div className="default-loader-sec-loader">
                <div className="loader"></div>
              </div>
              <p>Please wait! while payment executed process started.</p>
            </div>
            <span>
              <img
                alt="close icon"
                src={CloseRoundIconGray}
                onClick={() => setExecutePayment(false)}
              />
            </span>
          </div>
        )}
        <div className="common-table manage-dashboard-table">
          <BootstrapTable
            data={data}
            bordered={false}
            trClassName="sample"
            remote={true}
            // eslint-disable-next-line radix
            fetchInfo={{ dataTotalSize: parseInt(totalRecords) }}
            pagination={true}
            options={options}
            search={true}
            wrapperClasses="table-responsive"
          >
            {tableHeaderData.map((headerData, index) => (
              <TableHeaderColumn
                key={index}
                isKey={headerData.isKey}
                width={headerData.width}
                dataField={headerData.dataField}
                dataSort={headerData.dataSort}
                dataFormat={headerData.dataFormat}
                columnClassName={headerData.columnClassName}
              >
                {headerData.name}
              </TableHeaderColumn>
            ))}
          </BootstrapTable>
          <div className="common-table-btn-section">
            <div className="download-csv" onClick={toggleDownloadFilesPopup}>
              <ExportIconBlue />
            </div>
            <div className="common-table-filter" onClick={toggleFilterPopup}>
              <FilterIconBlue />
            </div>
          </div>
        </div>
      </div>
      {filterPopup ? (
        <div className={filterPopupClass}>
          <Filter
            filterOptions={pageFilters}
            handleApplyFilter={handleApplyFilter}
            closeFilterCallBack={closeFilterCallBack}
            clearFilterValues={clearFilterValues}
            getFilterState={getFilterState}
            filterChangeHandler={filterChangeHandler}
            addFiled={addFiled}
            setAddFiled={setAddFiled}
          />
        </div>
      ) : null}
      {downloadcvv ? (
        <div
          className={`common-download-popup ${
            downloadPopupClass && downloadPopupClass
          }`}
        >
          <DownloadCvv
            setDownloadcvv={setDownloadcvv}
            downloadcvv={downloadcvv}
            exportUrl={exportUrl}
            filterParams={filterParams}
            tableHeaderData={tableHeaderData}
            tableData={tableData}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default DataTable;
