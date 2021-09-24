import {
  LOAN_INFO_REQUEST,
  LOAN_INFO_SUCCESS,
  LOAN_INFO_FAILURE,
} from './loan-information-constants';

const initialState = {
  isFetching: false,
  loanInfoDetails: [],
};

const loanInfo = (state = initialState, action) => {
  switch (action.type) {
    case LOAN_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAN_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case LOAN_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loanInfoDetails: action.data,
      };
    default:
      return state;
  }
};

export default loanInfo;
