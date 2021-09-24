import {
  DISBURSMENT_REQUEST,
  DISBURSMENT_SUCCESS,
  DISBURSMENT_FAILURE,
} from './disbursment-constants';

const initialState = {
  disbursmentDetails: [],
  isFetching: false,
  totalRecords: '',
};

const disbursment = (state = initialState, action) => {
  switch (action.type) {
    case DISBURSMENT_REQUEST:
      return {
        ...state,
        disbursmentDetails: [],
        isFetching: true,
      };
    case DISBURSMENT_FAILURE:
      return {
        ...state,
        disbursmentDetails: [],
        isFetching: false,
      };
    case DISBURSMENT_SUCCESS:
      return {
        ...state,
        disbursmentDetails: action.data,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default disbursment;
