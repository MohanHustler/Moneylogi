import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { manageBankUrl } from '../../utils/urls';
import { MANAGE_BANK_REQUEST } from './manage-bank-constants';
import { manageBankSuccess, manageBankFailure } from './manage-bank-action';

const { getRequest } = new HttpHelper();

export function* manageBank(action) {
  try {
    const response = yield call(getRequest, {
      url: manageBankUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(manageBankSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(manageBankFailure());
  }
}

export function* watchManageBank() {
  yield takeEvery(MANAGE_BANK_REQUEST, manageBank);
}
