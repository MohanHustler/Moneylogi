import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { addAddressUrl } from '../../utils/urls';
import { ADD_ADDRESS_REQUEST } from './profile-constants';
import { addAddressSuccess, addAddressFailure } from './add-address-action';

const { postRequest } = new HttpHelper();

export function* addAddress(action) {
  try {
    const url = addAddressUrl(action.id);

    const response = yield call(postRequest, {
      data: {
        addressLine1: action.newUser.addressLineOne,
        addressLine2: action.newUser.addressLineTwo,
        addressType: action.newUser.addressType,
        ownership: action.newUser.ownership,
        pincode: action.newUser.pincode,
      },

      url,
    });

    yield put(addAddressSuccess(response.data));
  } catch (error) {
    yield put(addAddressFailure());
  }
}

export function* watchAddAddress() {
  yield takeEvery(ADD_ADDRESS_REQUEST, addAddress);
}
