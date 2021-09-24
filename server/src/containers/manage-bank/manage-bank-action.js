import {
  MANAGE_BANK_REQUEST,
  MANAGE_BANK_SUCCESS,
  MANAGE_BANK_FAILURE,
} from './manage-bank-constants';

const manageBankRequest = (urlParams) => ({
  type: MANAGE_BANK_REQUEST,
  urlParams,
});

export const manageBankSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: MANAGE_BANK_SUCCESS,
});
export const manageBankFailure = () => ({
  type: MANAGE_BANK_FAILURE,
});

export const manageBank = async (urlParams, dispatch) => {
  dispatch(manageBankRequest(urlParams));
};
