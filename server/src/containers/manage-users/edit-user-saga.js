import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import { editUserUrl } from '../../utils/urls';

import { EDIT_USER_REQUEST } from './manage-users-constants';

import { editUserSuccess, editUserFailure } from './edit-user-action';

const { patchRequest } = new HttpHelper();

export function* editUser(action) {
  try {
    const url = editUserUrl(action.publicId);

    const headerParams = {
      'x-coreplatform-concurrencystamp': action.concurrencyStamp,
    };

    const response = yield call(patchRequest, {
      data: {
        ...action.userDetails,
      },
      headers: headerParams,
      url,
    });

    yield put(editUserSuccess());

    action.userSuccessCallback();

    Toastr.success(response.headers.message, 'Success Response');
  } catch (error) {
    yield put(editUserFailure());
  }
}

export function* watchEditUser() {
  yield takeEvery(EDIT_USER_REQUEST, editUser);
}
