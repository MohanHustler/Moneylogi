import {
  DEFAULTS_REQUEST,
  DEFAULTS_SUCCESS,
  DEFAULTS_FAILURE,
} from './defaults-constants';

const initialState = {
  defaultsDetails: [],
  isFetching: false,
  totalRecords: '',
};

const defaults = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULTS_REQUEST:
      return {
        ...state,
        defaultsDetails: [],
        isFetching: true,
      };
    case DEFAULTS_FAILURE:
      return {
        ...state,
        defaultsDetails: [],
        isFetching: false,
      };
    case DEFAULTS_SUCCESS:
      return {
        ...state,
        defaultsDetails: action.data,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default defaults;
