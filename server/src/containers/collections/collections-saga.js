import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { collectionUrl } from '../../utils/urls';
import { COLLECTION_REQUEST } from './collections-constants';
import { collectionSuccess, collectionFailure } from './collections-action';

const { getRequest } = new HttpHelper();

export function* collection(action) {
  try {
    const response = yield call(getRequest, {
      url: collectionUrl(action.urlParams),
    });

    const totalRecords = response.headers['x-coreplatform-total-records'];

    yield put(collectionSuccess(response.data, totalRecords));
  } catch (error) {
    yield put(collectionFailure());
  }
}

export function* watchCollection() {
  yield takeEvery(COLLECTION_REQUEST, collection);
}
