import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { blockUserUrl } from '../../utils/urls';
import { BLOCK_UNBLOCK_REQUEST } from './profile-constants';
import { blockUserSuccess, blockUserFailure } from './block-unblock-action';

const { postRequest } = new HttpHelper();

export function* blockUser(action) {
  try {
    const url = blockUserUrl(action.id);

    yield call(postRequest, {
      data: {
        category: 'rented',
        description: 'current',
      },
      url,
    });

    yield put(blockUserSuccess());
    action.blockUserSuccessCallback();
  } catch (error) {
    yield put(blockUserFailure());
  }
}

export function* watchBlockUser() {
  yield takeEvery(BLOCK_UNBLOCK_REQUEST, blockUser);
}
