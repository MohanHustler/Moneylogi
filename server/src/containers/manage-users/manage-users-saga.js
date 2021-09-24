import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { manageUsersUrl } from '../../utils/urls';
import { MANAGE_USERS_REQUEST } from './manage-users-constants';
import { manageUsersSuccess, manageUsersFailure } from './manage-users-action';

const { getRequest } = new HttpHelper();

export function* manageUsers(action) {
  try {
    const response = yield call(getRequest, {
      url: manageUsersUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(manageUsersSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(manageUsersFailure());
  }
}

export function* watchManageUsers() {
  yield takeEvery(MANAGE_USERS_REQUEST, manageUsers);
}
