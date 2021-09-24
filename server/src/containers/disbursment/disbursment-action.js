import {
  DISBURSMENT_REQUEST,
  DISBURSMENT_SUCCESS,
  DISBURSMENT_FAILURE,
} from './disbursment-constants';

const disbursmentRequest = (urlParams) => ({
  type: DISBURSMENT_REQUEST,
  urlParams,
});

export const disbursmentSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: DISBURSMENT_SUCCESS,
});

export const disbursmentFailure = () => ({
  type: DISBURSMENT_FAILURE,
});

export const disbursment = async (urlParams, dispatch) => {
  dispatch(disbursmentRequest(urlParams));
};
