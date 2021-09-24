import { call, put, takeLatest } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import Storage from '../../utils/storage';
import { LOGIN_URL } from '../../utils/urls';

import { LOGIN_REQUEST } from './signin-constants';

import { loginSuccess, loginFailure } from './signin-action';

const { postRequest } = new HttpHelper();
const storage = new Storage();

export function* signin(action) {
  try {
    const response = yield call(postRequest, {
      data: {
        password: action.data.password,
        userName: action.data.email,
      },
      url: LOGIN_URL,
    });

    if (response.error) {
      const { data } = response.error.response;

      yield put(loginFailure());
      Toastr.error(data.details[0].message, 'Failure');
    } else {
      yield put(loginSuccess());

      if (response.headers['set-password']) {
        action.data.loginResetPasswordCallback();
      }
      if (response.headers.token) {
        storage.save('token', response.headers.token);
        Toastr.success('Login Successfull', 'Success');
        action.data.loginDashboardCallback();
      }
    }
  } catch (err) {
    throw new Error(err);
  }
}

export function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}
