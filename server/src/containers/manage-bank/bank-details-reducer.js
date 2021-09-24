import {
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  BANK_DETAILS_FAILURE,
} from './manage-bank-constants';

const initialState = {
  bankData: [],
  error: false,
  isFetching: false,
};

const bankDetails = (state = initialState, action) => {
  switch (action.type) {
    case BANK_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case BANK_DETAILS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case BANK_DETAILS_SUCCESS:
      return {
        ...state,
        bankData: action.data,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default bankDetails;
