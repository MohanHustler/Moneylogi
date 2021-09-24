import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { manageProfessionUrl } from '../../utils/urls';
import { MANAGE_PROFESSION_REQUEST } from './manage-profession-constants';
import {
  manageProfessionSuccess,
  manageProfessionFailure,
} from './manage-profession-action';

const { getRequest } = new HttpHelper();

export function* manageProfession(action) {
  try {
    const response = yield call(getRequest, {
      url: manageProfessionUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(manageProfessionSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(manageProfessionFailure());
  }
}

export function* watchManageProfession() {
  yield takeEvery(MANAGE_PROFESSION_REQUEST, manageProfession);
}
