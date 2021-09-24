import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { emiUrl } from '../../utils/urls';

import { EMI_REQUEST } from './emi-constants';

import { emiSuccess, emiFailure } from './emi-action';

const { getRequest } = new HttpHelper();

export function* emi(action) {
  try {
    const response = yield call(getRequest, {
      url: emiUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(emiSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(emiFailure());
  }
}

export function* watchEmi() {
  yield takeEvery(EMI_REQUEST, emi);
}
