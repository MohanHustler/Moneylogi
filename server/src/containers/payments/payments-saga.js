import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { paymentsUrl } from '../../utils/urls';
import { PAYMENTS_REQUEST } from './payments-constants';
import { paymentsSuccess, paymentsFailure } from './payments-action';

const { getRequest } = new HttpHelper();

export function* payments(action) {
  try {
    const response = yield call(getRequest, {
      url: paymentsUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(paymentsSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(paymentsFailure());
  }
}

export function* watchPayments() {
  yield takeEvery(PAYMENTS_REQUEST, payments);
}
