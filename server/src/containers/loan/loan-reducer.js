import { LOAN_REQUEST, LOAN_SUCCESS, LOAN_FAILURE } from './loan-constants';

const initialState = {
  isFetching: false,
  loanDetails: [],
  totalRecords: '',
};

const loan = (state = initialState, action) => {
  switch (action.type) {
    case LOAN_REQUEST:
      return {
        ...state,
        isFetching: true,
        loanDetails: [],
      };
    case LOAN_FAILURE:
      return {
        ...state,
        isFetching: false,
        loanDetails: [],
      };
    case LOAN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        loanDetails: action.data,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default loan;
