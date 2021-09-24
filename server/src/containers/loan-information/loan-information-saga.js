import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { loanInfoUrl } from '../../utils/urls';
import { LOAN_INFO_REQUEST } from './loan-information-constants';
import { loanInfoSuccess, loanInfoFailure } from './loan-information-action';

const { getRequest } = new HttpHelper();

export function* loanInfo(action) {
  try {
    const url = loanInfoUrl(action.id);

    const response = yield call(getRequest, {
      url,
    });

    yield put(loanInfoSuccess(response.data));
  } catch (error) {
    yield put(loanInfoFailure());
  }
}

export function* watchLoanInfo() {
  yield takeEvery(LOAN_INFO_REQUEST, loanInfo);
}
