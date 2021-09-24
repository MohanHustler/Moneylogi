import { EMI_REQUEST, EMI_SUCCESS, EMI_FAILURE } from './emi-constants';

const emiRequest = (urlParams) => ({
  type: EMI_REQUEST,
  urlParams,
});

export const emiSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: EMI_SUCCESS,
});

export const emiFailure = () => ({
  type: EMI_FAILURE,
});

export const emi = async (urlParams, dispatch) => {
  dispatch(emiRequest(urlParams));
};
