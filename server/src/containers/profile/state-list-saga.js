import { call, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { STATE_LIST_URL } from '../../utils/urls';
import { STATE_LIST_REQUEST } from './profile-constants';

const { getRequest } = new HttpHelper();

export function* stateList(action) {
  try {
    const response = yield call(getRequest, {
      url: STATE_LIST_URL,
    });

    action.data.stateListCallback(response.data);
  } catch (err) {
    throw new Error(err);
  }
}

export function* watchStateList() {
  yield takeEvery(STATE_LIST_REQUEST, stateList);
}
