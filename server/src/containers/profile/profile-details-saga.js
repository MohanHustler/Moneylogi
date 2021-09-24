import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { profileDetailsUrl } from '../../utils/urls';
import { PROFILE_DETAILS_REQUEST } from './profile-constants';
import {
  profileDetailsSuccess,
  profileDetailsFailure,
} from './user-profile-details-action';

const { getRequest } = new HttpHelper();

export function* profileDetails(action) {
  try {
    const url = profileDetailsUrl(action.id);

    const response = yield call(getRequest, {
      url,
    });

    yield put(profileDetailsSuccess(response.data));
  } catch (error) {
    yield put(profileDetailsFailure());
  }
}

export function* watchprofileDetails() {
  yield takeEvery(PROFILE_DETAILS_REQUEST, profileDetails);
}
