import {
  COLLECTION_REQUEST,
  COLLECTION_SUCCESS,
  COLLECTION_FAILURE,
} from './collections-constants';

const initialState = {
  collectionDetails: [],
  isFetching: false,
  totalRecords: '',
};

const collection = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_REQUEST:
      return {
        ...state,
        collectionDetails: [],
        isFetching: true,
      };
    case COLLECTION_FAILURE:
      return {
        ...state,
        collectionDetails: [],
        isFetching: false,
      };
    case COLLECTION_SUCCESS:
      return {
        ...state,
        collectionDetails: action.data,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default collection;
