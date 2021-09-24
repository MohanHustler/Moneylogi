import {
  LOAN_INFO_REQUEST,
  LOAN_INFO_SUCCESS,
  LOAN_INFO_FAILURE,
} from './loan-information-constants';

const loanInfoRequest = (id) => ({
  id,
  type: LOAN_INFO_REQUEST,
});

export const loanInfoSuccess = (data) => ({
  data,
  type: LOAN_INFO_SUCCESS,
});

export const loanInfoFailure = () => ({
  type: LOAN_INFO_FAILURE,
});

export const loanInfo = async (id, dispatch) => {
  dispatch(loanInfoRequest(id));
};
