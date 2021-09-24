import {
  PAYMENTS_REQUEST,
  PAYMENTS_SUCCESS,
  PAYMENTS_FAILURE,
} from './payments-constants';

const paymentsRequest = (urlParams) => ({
  type: PAYMENTS_REQUEST,
  urlParams,
});

export const paymentsSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: PAYMENTS_SUCCESS,
});

export const paymentsFailure = () => ({
  type: PAYMENTS_FAILURE,
});

export const payments = async (urlParams, dispatch) => {
  dispatch(paymentsRequest(urlParams));
};
