import { call, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { FILE_UPLOAD_URL } from '../../utils/urls';
import { FILE_UPLOAD } from './profile-constants';

const { postRequest } = new HttpHelper();

export function* fileUpload(action) {
  try {
    const headerParams = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = yield call(postRequest, {
      data: action.data.formData,
      headers: headerParams,
      url: FILE_UPLOAD_URL,
    });

    if (response.headers['public-id']) {
      action.data.uploadDocsCallBack(
        response.headers['public-id'],
        action.data.side
      );
    }
  } catch (err) {
    throw new Error(err);
  }
}

export function* watchFileUpload() {
  yield takeEvery(FILE_UPLOAD, fileUpload);
}
