import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { defaultsUrl } from '../../utils/urls';
import { DEFAULTS_REQUEST } from './defaults-constants';
import { defaultsSuccess, defaultsFailure } from './defaults-action';

const { getRequest } = new HttpHelper();

export function* defaults(action) {
  try {
    const response = yield call(getRequest, {
      url: defaultsUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(defaultsSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(defaultsFailure());
  }
}

export function* watchDefaults() {
  yield takeEvery(DEFAULTS_REQUEST, defaults);
}
