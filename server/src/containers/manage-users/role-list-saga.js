import { call, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { ROLE_LIST_URL } from '../../utils/urls';
import { ROLE_LIST_REQUEST } from './manage-users-constants';

const { getRequest } = new HttpHelper();

export function* roleList(action) {
  try {
    const response = yield call(getRequest, {
      url: ROLE_LIST_URL,
    });

    action.data.roleListCallback(response.data);
  } catch (err) {
    throw new Error(err);
  }
}

export function* watchRoleList() {
  yield takeEvery(ROLE_LIST_REQUEST, roleList);
}
