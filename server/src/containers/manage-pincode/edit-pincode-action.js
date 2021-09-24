import {
  EDIT_PINCODE_REQUEST,
  EDIT_PINCODE_SUCCESS,
  EDIT_PINCODE_FAILURE,
} from './manage-pincode-constants';

const editPincodeRequest = (data, pincodeSuccessCallBack) => ({
  data,
  pincodeSuccessCallBack,
  type: EDIT_PINCODE_REQUEST,
});

export const editPincodeSuccess = () => ({
  type: EDIT_PINCODE_SUCCESS,
});

export const editPincodeFailure = () => ({
  type: EDIT_PINCODE_FAILURE,
});

export const editPincode = (
  pincodeDetails,
  pincodeSuccessCallBack,
  dispatch
) => {
  dispatch(editPincodeRequest({ ...pincodeDetails }, pincodeSuccessCallBack));
};
