import {
  EXPORT_CSV_REQUEST,
  EXPORT_CSV_SUCCESS,
  EXPORT_CSV_FAILURE,
} from './dashboard-constants';

const exportCsvRequest = (exportUrl, urlParams, csvResponseCallBack) => ({
  csvResponseCallBack,
  exportUrl,
  type: EXPORT_CSV_REQUEST,
  urlParams,
});

export const exportCsvSuccess = () => ({
  type: EXPORT_CSV_SUCCESS,
});

export const exportCsvFailure = () => ({
  type: EXPORT_CSV_FAILURE,
});

export const exportCsv = async (
  exportUrl,
  urlParams,
  csvResponseCallBack,
  dispatch
) => {
  dispatch(exportCsvRequest(exportUrl, urlParams, csvResponseCallBack));
};
