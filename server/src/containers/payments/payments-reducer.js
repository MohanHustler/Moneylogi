import {
  PAYMENTS_REQUEST,
  PAYMENTS_SUCCESS,
  PAYMENTS_FAILURE,
} from './payments-constants';

const initialState = {
  isFetching: false,
  paymentDetails: [],
  totalRecords: '',
};

const payments = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        paymentDetails: [],
      };
    case PAYMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        paymentDetails: [],
      };
    case PAYMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentDetails: action.data,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default payments;
