import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { viewFileUrl } from '../../utils/urls';
import { VIEW_FILE_REQUEST } from './dashboard-constants';
import { viewFileSuccess, viewFileFailure } from './view-file-action';

const { getRequest } = new HttpHelper();

export function* viewFile(action) {
  try {
    const response = yield call(getRequest, {
      url: viewFileUrl(action.profilePicId),
    });

    yield put(viewFileSuccess(response.data));
    action.viewFileSuccessCallback(response.data);
  } catch (error) {
    yield put(viewFileFailure());
  }
}

export function* watchViewFile() {
  yield takeEvery(VIEW_FILE_REQUEST, viewFile);
}
