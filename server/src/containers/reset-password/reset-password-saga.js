import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';

import { RESET_PASSWORD_URL } from '../../utils/urls';

import { RESET_PASSWORD_REQUEST } from './reset-password-constants';

import {
  resetPasswordSuccess,
  resetPasswordFailure,
} from './reset-password-action';

const { postRequest } = new HttpHelper();

export function* resetPassword(action) {
  try {
    yield call(postRequest, {
      data: {
        confirmPassword: action.data.confirmNewPassword,
        newPassword: action.data.newPassword,
        password: action.data.oldPassword,
        userName: action.data.email,
      },
      url: RESET_PASSWORD_URL,
    });

    yield put(resetPasswordSuccess());
    Toastr.success('Password reset successfull', 'Success Response');
    action.data.resetPasswordSuccessCallback();
  } catch (error) {
    yield put(resetPasswordFailure());
    Toastr.error('Reset Password Failed', 'Failure Response');
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPassword);
}
