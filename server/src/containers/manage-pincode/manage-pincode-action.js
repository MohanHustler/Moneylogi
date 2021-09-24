import {
  MANAGE_PINCODE_REQUEST,
  MANAGE_PINCODE_SUCCESS,
  MANAGE_PINCODE_FAILURE,
} from './manage-pincode-constants';

const managePincodeRequest = (urlParams) => ({
  type: MANAGE_PINCODE_REQUEST,
  urlParams,
});

export const managePincodeSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: MANAGE_PINCODE_SUCCESS,
});
export const managePincodeFailure = () => ({
  type: MANAGE_PINCODE_FAILURE,
});

export const managePincode = async (urlParams, dispatch) => {
  dispatch(managePincodeRequest(urlParams));
};
