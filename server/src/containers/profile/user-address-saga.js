import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { userAddressUrl } from '../../utils/urls';
import { USER_ADDRESS_REQUEST } from './profile-constants';
import { userAddressSuccess, userAddressFailure } from './user-address-action';

const { getRequest } = new HttpHelper();

export function* userAddress(action) {
  try {
    const url = userAddressUrl(action.id);

    const response = yield call(getRequest, {
      url,
    });

    yield put(userAddressSuccess(response.data));
  } catch (error) {
    yield put(userAddressFailure());
  }
}

export function* watchuserAddress() {
  yield takeEvery(USER_ADDRESS_REQUEST, userAddress);
}
