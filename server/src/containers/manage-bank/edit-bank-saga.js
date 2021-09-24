import { call, put, takeEvery } from 'redux-saga/effects';
import * as Toastr from 'toastr';

import HttpHelper from '../../utils/http-helper';
import { editBankUrl } from '../../utils/urls';
import { EDIT_BANK_REQUEST } from './manage-bank-constants';
import { editBankSuccess, editBankFailure } from './edit-bank-action';

const { patchRequest } = new HttpHelper();

export function* editBank(action) {
  try {
    const url = editBankUrl(action.data.publicId);

    const headerParams = {
      'x-coreplatform-concurrencystamp': action.data.concurrencyStamp,
    };

    const response = yield call(patchRequest, {
      data: {
        finbitCode: action.data.finbitCode,
        ifscCode: action.data.ifscCode,
        name: action.data.name,
        razorpayCode: action.data.razorpayCode,
        razorpayRecurringPayment: action.data.razorpayRecurringPayment,
        status: action.data.status,
      },
      headers: headerParams,
      url,
    });

    yield put(editBankSuccess());
    action.data.updateBankSuccess();
    Toastr.success(response.headers.message, 'Success Response');
  } catch (error) {
    yield put(editBankFailure());
    // Toastr.error('Change Password Failed', 'Failure Response');
  }
}

export function* watchEditBank() {
  yield takeEvery(EDIT_BANK_REQUEST, editBank);
}
