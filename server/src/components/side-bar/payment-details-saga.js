import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { paymentDetailsUrl } from '../../utils/urls';
import { PAYMENT_DETAILS_REQUEST } from './payment-details-constants';

import {
  paymentDetailsSuccess,
  paymentDetailsFailure,
} from './payment-details-action';

const { getRequest } = new HttpHelper();

export function* paymentDetails(action) {
  try {
    const response = yield call(getRequest, {
      url: paymentDetailsUrl(action.urlParams),
    });

    yield put(paymentDetailsSuccess(response.data));
  } catch (error) {
    yield put(paymentDetailsFailure());
  }
}

export function* watchPaymentDetails() {
  yield takeEvery(PAYMENT_DETAILS_REQUEST, paymentDetails);
}
