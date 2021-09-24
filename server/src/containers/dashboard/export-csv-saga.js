import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import { exportCsvUrl } from '../../utils/urls';
import { EXPORT_CSV_REQUEST } from './dashboard-constants';
import { exportCsvSuccess, exportCsvFailure } from './export-csv-action';

const { getRequest } = new HttpHelper();

export function* exportCsv(action) {
  try {
    const response = yield call(getRequest, {
      url: exportCsvUrl(action.urlParams, action.exportUrl),
    });

    if (response.error) {
      const { data } = response.error.response;

      yield put(exportCsvFailure());

      Toastr.error(
        `${data.details[0].name} : ${data.details[0].message}`,
        'Failure'
      );
    } else {
      yield put(exportCsvSuccess());
      action.csvResponseCallBack(response.data);
    }
  } catch (error) {
    // yield put(exportCsvFailure());
  }
}

export function* watchExportCsv() {
  yield takeEvery(EXPORT_CSV_REQUEST, exportCsv);
}
