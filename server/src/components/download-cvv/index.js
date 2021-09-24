import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { CSVDownload } from 'react-csv';

import { exportCsv } from '../../containers/dashboard/export-csv-action';

const Downloadcvv = ({
  exportUrl,
  downloadcvv,
  setDownloadcvv,
  filterParams,
  tableHeaderData,
  tableData,
}) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [exportCsvDetails, setExportCsvDetails] = useState(null);

  const dispatch = useDispatch();

  const csvResponseCallBack = (csvData) => {
    setExportCsvDetails(csvData);
    setIsDownloaded(true);
    setDownloadcvv(!downloadcvv);
  };

  const handleDownloadCsv = () => {
    const params = filterParams;
    let newObj = {};

    params.forEach((el) => {
      newObj = Object.assign(newObj, el);
    });

    const urlParams = _.omit(newObj, 'name');

    exportCsv(exportUrl, urlParams, csvResponseCallBack, dispatch);
  };

  const printDocument = () => {
    const unit = 'pt';
    const size = 'A4';
    // Use A1, A2, A3 or A4
    const orientation = 'portrait';
    // portrait or landscape

    const marginLeft = 40;
    // eslint-disable-next-line new-cap
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = '';
    const headerArray = tableHeaderData.map(({ name }) => name);
    const headers = [headerArray];

    const data = tableData.map((elt) => {
      return tableHeaderData.map((el) => {
        if (el.dataField === 'iconUrl') {
          return '';
        }
        return elt[el.dataField];
      });
    });

    const content = {
      body: data,
      head: headers,
      startY: 50,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save('report.pdf');
    setDownloadcvv(!downloadcvv);
  };

  return (
    <div className="downloadcvv-sec">
      <ul>
        <li onClick={handleDownloadCsv}>Download CSV file</li>
        <li onClick={printDocument}>
          <a>Download PDF file</a>
        </li>
        {isDownloaded && (
          <CSVDownload
            data={exportCsvDetails && exportCsvDetails}
            target="_self"
          />
        )}
      </ul>
    </div>
  );
};

export default Downloadcvv;
