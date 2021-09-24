import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import Storage from '../../utils/storage';
import { CHANGE_PASSWORD_URL } from '../../utils/urls';

import { CHANGE_PASSWORD_REQUEST } from './change-password-constants';

import {
  changePasswordSuccess,
  changePasswordFailure,
} from './change-password-action';

const { postRequest } = new HttpHelper();
const storage = new Storage();

export function* changePassword(action) {
  try {
    yield call(postRequest, {
      data: {
        confirmPassword: action.data.confirmnewpassword,
        password: action.data.newPassword,
      },
      url: CHANGE_PASSWORD_URL,
    });

    yield put(changePasswordSuccess());
    Toastr.success('Password changed successfully', 'Success Response');
    action.data.changePasswordSuccessCallback();
    storage.delete('token');
  } catch (error) {
    yield put(changePasswordFailure());
    Toastr.error('Change Password Failed', 'Failure Response');
  }
}

export function* watchchangePassword() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePassword);
}
