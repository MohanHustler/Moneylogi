import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { generatePasswordUrl } from '../../utils/urls';
import { GENERATE_PASSWORD_REQUEST } from './manage-users-constants';
import {
  generatePasswordSuccess,
  generatePasswordFailure,
} from './generate-password-action';

const { patchRequest } = new HttpHelper();

export function* generatePassword(action) {
  try {
    const url = generatePasswordUrl(action.data.publicId);

    const headerParams = {
      'x-coreplatform-concurrencystamp': action.data.concurrencyStamp,
    };

    const response = yield call(patchRequest, {
      headers: headerParams,
      url,
    });

    yield put(generatePasswordSuccess());
    action.generatePasswordSuccessCallback(response.headers.password);
  } catch (error) {
    yield put(generatePasswordFailure());
  }
}

export function* watchGeneratePassword() {
  yield takeEvery(GENERATE_PASSWORD_REQUEST, generatePassword);
}
