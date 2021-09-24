import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { disbursmentUrl } from '../../utils/urls';
import { DISBURSMENT_REQUEST } from './disbursment-constants';
import { disbursmentSuccess, disbursmentFailure } from './disbursment-action';

const { getRequest } = new HttpHelper();

export function* disbursment(action) {
  try {
    const response = yield call(getRequest, {
      url: disbursmentUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(disbursmentSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(disbursmentFailure());
  }
}

export function* watchDisbursment() {
  yield takeEvery(DISBURSMENT_REQUEST, disbursment);
}
