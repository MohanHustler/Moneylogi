import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { newRegistrationUrl } from '../../utils/urls';
import { NEW_REGISTRATION_REQUEST } from './dashboard-constants';

import {
  newRegistrationSuccess,
  newRegistrationFailure,
} from './new-registration-action';

const { getRequest } = new HttpHelper();

export function* newRegistration(action) {
  try {
    const response = yield call(getRequest, {
      url: newRegistrationUrl(action.urlParams),
    });

    yield put(newRegistrationSuccess(response.data));
  } catch (error) {
    yield put(newRegistrationFailure());
  }
}

export function* watchNewRegistration() {
  yield takeEvery(NEW_REGISTRATION_REQUEST, newRegistration);
}
