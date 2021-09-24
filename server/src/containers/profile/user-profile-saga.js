import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { editUserUrl } from '../../utils/urls';
import { USER_PROFILE_REQUEST } from './profile-constants';
import { userProfileSuccess, userProfileFailure } from './user-profile-action';

const { getRequest } = new HttpHelper();

export function* userProfile(action) {
  try {
    const url = editUserUrl(action.id);

    const response = yield call(getRequest, {
      url,
    });

    yield put(userProfileSuccess(response.data));
  } catch (error) {
    yield put(userProfileFailure());
  }
}

export function* watchUserProfile() {
  yield takeEvery(USER_PROFILE_REQUEST, userProfile);
}
