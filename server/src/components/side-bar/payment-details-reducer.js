import {
  PAYMENT_DETAILS_REQUEST,
  PAYMENT_DETAILS_SUCCESS,
  PAYMENT_DETAILS_FAILURE,
} from './payment-details-constants';

const initialState = {
  isFetching: false,
  paymentDetailsList: [],
};

const paymentDetails = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PAYMENT_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        paymentDetailsList: action.data,
      };
    default:
      return state;
  }
};

export default paymentDetails;
