import {
  PAYMENT_DETAILS_REQUEST,
  PAYMENT_DETAILS_SUCCESS,
  PAYMENT_DETAILS_FAILURE,
} from './payment-details-constants';

const paymentDetailsRequest = (urlParams) => ({
  type: PAYMENT_DETAILS_REQUEST,
  urlParams,
});

export const paymentDetailsSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: PAYMENT_DETAILS_SUCCESS,
});

export const paymentDetailsFailure = () => ({
  type: PAYMENT_DETAILS_FAILURE,
});

export const paymentDetails = async (urlParams, dispatch) => {
  dispatch(paymentDetailsRequest(urlParams));
};
