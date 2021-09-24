import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import { editPincodeUrl } from '../../utils/urls';
import { EDIT_PINCODE_REQUEST } from './manage-pincode-constants';
import { editPincodeSuccess, editPincodeFailure } from './edit-pincode-action';

const { patchRequest } = new HttpHelper();

export function* editPincode(action) {
  try {
    const url = editPincodeUrl(action.data.pincode);

    const headerParams = {
      'x-coreplatform-concurrencystamp': action.data.concurrencyStamp,
    };

    const response = yield call(patchRequest, {
      data: {
        districtName: action.data.districtName,
        divisionName: action.data.divisionName,
        officeName: action.data.officeName,
        regionName: action.data.regionName,
        stateName: action.data.stateName,
        status: action.data.status,
        taluk: action.data.taluk,
      },
      headers: headerParams,
      url,
    });

    yield put(editPincodeSuccess());
    action.pincodeSuccessCallBack();
    Toastr.success(response.headers.message, 'Success Response');
  } catch (error) {
    yield put(editPincodeFailure());
    // Toastr.error('Change Password Failed', 'Failure Response');
  }
}

export function* watchEditPincode() {
  yield takeEvery(EDIT_PINCODE_REQUEST, editPincode);
}
