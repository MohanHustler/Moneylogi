import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { recentActivityUrl } from '../../utils/urls';
import { RECENT_ACTIVITY_REQUEST } from './dashboard-constants';

import {
  recentActivitySuccess,
  recentActivityFailure,
} from './recent-activity-action';

const { getRequest } = new HttpHelper();

export function* recentActivity(action) {
  try {
    const response = yield call(getRequest, {
      url: recentActivityUrl(action.urlParams),
    });

    yield put(recentActivitySuccess(response.data));
  } catch (error) {
    yield put(recentActivityFailure());
  }
}

export function* watchRecentActivity() {
  yield takeEvery(RECENT_ACTIVITY_REQUEST, recentActivity);
}
