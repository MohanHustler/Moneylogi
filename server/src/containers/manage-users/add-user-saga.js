import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';

import { ADD_USER_URL } from '../../utils/urls';

import { ADD_USER_REQUEST } from './manage-users-constants';

import { addUserSuccess, addUserFailure } from './add-user-action';

const { postRequest } = new HttpHelper();

export function* addUser(action) {
  try {
    const response = yield call(postRequest, {
      data: {
        email: action.data.email,
        mobileNumber: action.data.mobileNo,
        name: action.data.name,
        role: action.data.role,
      },
      url: ADD_USER_URL,
    });

    if (response.error) {
      const { data } = response.error.response;

      yield put(addUserFailure());

      action.data.addUserFailureCallback({
        field: data.details[0].name,
        message: data.details[0].message,
      });
    } else {
      yield put(addUserSuccess());
      const newUserData = {
        email: action.data.email,
        name: action.data.name,
        password: response.headers.password,
      };

      action.data.addUserSuccessCallback(newUserData);
    }
  } catch (error) {
    // Toastr.error('Change Password Failed', 'Failure Response');
  }
}

export function* watchaddUser() {
  yield takeEvery(ADD_USER_REQUEST, addUser);
}
