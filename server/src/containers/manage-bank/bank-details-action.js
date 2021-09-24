import {
  BANK_DETAILS_REQUEST,
  BANK_DETAILS_SUCCESS,
  BANK_DETAILS_FAILURE,
} from './manage-bank-constants';

const bankDetailsRequest = (publicId, getBankSuccessCallback) => ({
  getBankSuccessCallback,
  publicId,
  type: BANK_DETAILS_REQUEST,
});

export const bankDetailsSuccess = (data) => ({
  data,
  type: BANK_DETAILS_SUCCESS,
});
export const bankDetailsFailure = () => ({
  type: BANK_DETAILS_FAILURE,
});

export const getBankData = async (
  publicId,
  getBankSuccessCallback,
  dispatch
) => {
  dispatch(bankDetailsRequest(publicId, getBankSuccessCallback));
};
