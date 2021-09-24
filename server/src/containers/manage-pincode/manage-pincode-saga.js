import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { managePincodeUrl } from '../../utils/urls';
import { MANAGE_PINCODE_REQUEST } from './manage-pincode-constants';
import {
  managePincodeSuccess,
  managePincodeFailure,
} from './manage-pincode-action';

const { getRequest } = new HttpHelper();

export function* managePincode(action) {
  try {
    const response = yield call(getRequest, {
      url: managePincodeUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(managePincodeSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(managePincodeFailure());
  }
}

export function* watchManagePincode() {
  yield takeEvery(MANAGE_PINCODE_REQUEST, managePincode);
}
