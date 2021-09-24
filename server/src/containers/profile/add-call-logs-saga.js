import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import { ADD_CALL_LOGS_URL } from '../../utils/urls';
import { ADD_CALL_LOGS_REQUEST } from './profile-constants';
import { addCallLogsSuccess, addCallLogsFailure } from './add-call-logs-action';

const { postRequest } = new HttpHelper();

export function* addCallLogs(action) {
  try {
    const response = yield call(postRequest, {
      data: {
        category: action.data.summary,
        description: action.data.description,
        status: action.data.status,
      },
      url: ADD_CALL_LOGS_URL,
    });

    if (response.error) {
      const { data } = response.error.response;

      yield put(addCallLogsFailure());

      Toastr.error(
        `${data.details[0].name} : ${data.details[0].message}`,
        'Failure'
      );
    } else {
      yield put(addCallLogsSuccess());
      action.callLogSuccessCallback();
    }
  } catch (error) {
    // Toastr.error(error, 'Failure Response');
  }
}

export function* watchAddCallLogs() {
  yield takeEvery(ADD_CALL_LOGS_REQUEST, addCallLogs);
}
