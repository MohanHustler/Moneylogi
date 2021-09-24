import {
  COLLECTION_REQUEST,
  COLLECTION_SUCCESS,
  COLLECTION_FAILURE,
} from './collections-constants';

const collectionRequest = (urlParams) => ({
  type: COLLECTION_REQUEST,
  urlParams,
});

export const collectionSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: COLLECTION_SUCCESS,
});

export const collectionFailure = () => ({
  type: COLLECTION_FAILURE,
});

export const collection = async (urlParams, dispatch) => {
  dispatch(collectionRequest(urlParams));
};
