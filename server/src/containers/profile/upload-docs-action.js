import {
  UPLOAD_DOCS_REQUEST,
  UPLOAD_DOCS_SUCCESS,
  UPLOAD_DOCS_FAILURE,
} from './profile-constants';

const uploadDocsRequest = (documentIds, id, concurrencyStamp) => ({
  concurrencyStamp,
  documentIds,
  id,
  type: UPLOAD_DOCS_REQUEST,
});

export const uploadDocsSuccess = () => ({
  type: UPLOAD_DOCS_SUCCESS,
});
export const uploadDocsFailure = () => ({
  type: UPLOAD_DOCS_FAILURE,
});

export const uploadDocs = async (
  documentIds,
  id,
  concurrencyStamp,
  dispatch
) => {
  dispatch(uploadDocsRequest(documentIds, id, concurrencyStamp));
};
