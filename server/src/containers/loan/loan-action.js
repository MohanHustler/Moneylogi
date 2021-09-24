import { LOAN_REQUEST, LOAN_SUCCESS, LOAN_FAILURE } from './loan-constants';

const loanRequest = (urlParams) => ({
  type: LOAN_REQUEST,
  urlParams,
});

export const loanSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: LOAN_SUCCESS,
});

export const loanFailure = () => ({
  type: LOAN_FAILURE,
});

export const loan = async (urlParams, dispatch) => {
  dispatch(loanRequest(urlParams));
};
