import { call, put, takeEvery } from 'redux-saga/effects';

import HttpHelper from '../../utils/http-helper';
import { profileDetailsUrl } from '../../utils/urls';
import { UPLOAD_DOCS_REQUEST } from './profile-constants';
import { uploadDocsSuccess, uploadDocsFailure } from './upload-docs-action';

const { patchRequest } = new HttpHelper();

export function* uploadDocs({ id, concurrencyStamp, documentIds }) {
  try {
    const url = profileDetailsUrl(id);
    const headerParams = {
      'Content-Type': 'application/json',
      'x-coreplatform-concurrencystamp': concurrencyStamp,
    };

    yield call(patchRequest, {
      data: {
        ...documentIds,
      },
      headers: headerParams,
      url,
    });

    yield put(uploadDocsSuccess());
  } catch (error) {
    yield put(uploadDocsFailure());
  }
}

export function* watchUploadDocs() {
  yield takeEvery(UPLOAD_DOCS_REQUEST, uploadDocs);
}
