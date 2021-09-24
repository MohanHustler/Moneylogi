import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { bankDetailsUrl } from '../../utils/urls';
import { BANK_DETAILS_REQUEST } from './manage-bank-constants';
import { bankDetailsSuccess, bankDetailsFailure } from './bank-details-action';

const { getRequest } = new HttpHelper();

export function* bankDetails({ publicId, getBankSuccessCallback }) {
  try {
    const response = yield call(getRequest, {
      url: bankDetailsUrl(publicId),
    });

    yield put(bankDetailsSuccess(response.data));
    getBankSuccessCallback(response.data);
  } catch (error) {
    yield put(bankDetailsFailure());
  }
}

export function* watchBankDetails() {
  yield takeEvery(BANK_DETAILS_REQUEST, bankDetails);
}
