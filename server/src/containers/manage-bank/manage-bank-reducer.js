import {
  MANAGE_BANK_REQUEST,
  MANAGE_BANK_SUCCESS,
  MANAGE_BANK_FAILURE,
} from './manage-bank-constants';

const initialState = {
  bankDetails: [],
  error: false,
  isFetching: false,
  totalRecords: '',
};

const manageBank = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_BANK_REQUEST:
      return {
        ...state,
        bankDetails: [],
        isFetching: true,
      };
    case MANAGE_BANK_FAILURE:
      return {
        ...state,
        bankDetails: [],
        error: true,
        isFetching: false,
      };
    case MANAGE_BANK_SUCCESS:
      return {
        ...state,
        bankDetails: action.data,
        error: false,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default manageBank;
