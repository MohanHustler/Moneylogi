import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { DASHBOARD_CARD_URL } from '../../utils/urls';
import { DASHBOARD_CARD_REQUEST } from './dashboard-constants';

import {
  dashboardCardSuccess,
  dashboardCardFailure,
} from './dashboard-card-action';

const { getRequest } = new HttpHelper();

export function* dashboardCard() {
  try {
    const response = yield call(getRequest, {
      url: DASHBOARD_CARD_URL,
    });

    yield put(dashboardCardSuccess(response.data));
  } catch (error) {
    yield put(dashboardCardFailure());
  }
}

export function* watchDashboardCard() {
  yield takeEvery(DASHBOARD_CARD_REQUEST, dashboardCard);
}
