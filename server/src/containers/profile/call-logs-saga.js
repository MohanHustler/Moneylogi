import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { callLogsUrl } from '../../utils/urls';
import { CALL_LOGS_REQUEST } from './profile-constants';
import { callLogsSuccess, callLogsFailure } from './call-logs-action';

const { getRequest } = new HttpHelper();

export function* callLogs(action) {
  try {
    const response = yield call(getRequest, {
      url: callLogsUrl(action.urlParams),
    });

    yield put(callLogsSuccess(response.data));
  } catch (error) {
    yield put(callLogsFailure());
  }
}

export function* watchCallLogs() {
  yield takeEvery(CALL_LOGS_REQUEST, callLogs);
}
