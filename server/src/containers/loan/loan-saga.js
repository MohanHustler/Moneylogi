import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { loanUrl } from '../../utils/urls';

import { LOAN_REQUEST } from './loan-constants';

import { loanSuccess, loanFailure } from './loan-action';

const { getRequest } = new HttpHelper();

export function* loan(action) {
  try {
    const response = yield call(getRequest, {
      url: loanUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(loanSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(loanFailure());
  }
}

export function* watchLoan() {
  yield takeEvery(LOAN_REQUEST, loan);
}
