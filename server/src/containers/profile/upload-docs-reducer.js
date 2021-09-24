import {
  UPLOAD_DOCS_REQUEST,
  UPLOAD_DOCS_SUCCESS,
  UPLOAD_DOCS_FAILURE,
} from './profile-constants';

const initialState = {
  error: false,
  isFetching: false,
};

const uploadDocs = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UPLOAD_DOCS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case UPLOAD_DOCS_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default uploadDocs;
