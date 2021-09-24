import {
  EXPORT_CSV_REQUEST,
  EXPORT_CSV_SUCCESS,
  EXPORT_CSV_FAILURE,
} from './dashboard-constants';

const initialState = {
  isFetching: false,
};

const exportCsv = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_CSV_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case EXPORT_CSV_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case EXPORT_CSV_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default exportCsv;
