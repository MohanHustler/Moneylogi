import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { emiUrl } from '../../utils/urls';

import { DASHBOARD_REQUEST } from './dashboard-constants';

import { dashboardSuccess, dashboardFailure } from './dashboard-action';

const { getRequest } = new HttpHelper();

export function* dashboard(action) {
  try {
    const response = yield call(getRequest, {
      url: emiUrl(action.urlParams),
    });
    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(dashboardSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(dashboardFailure());
  }
}

export function* watchDashboard() {
  yield takeEvery(DASHBOARD_REQUEST, dashboard);
}
