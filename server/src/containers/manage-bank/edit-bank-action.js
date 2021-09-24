import {
  EDIT_BANK_REQUEST,
  EDIT_BANK_SUCCESS,
  EDIT_BANK_FAILURE,
} from './manage-bank-constants';

const editBankRequest = (data) => ({
  data,
  type: EDIT_BANK_REQUEST,
});

export const editBankSuccess = () => ({
  type: EDIT_BANK_SUCCESS,
});

export const editTBankFailure = () => ({
  type: EDIT_BANK_FAILURE,
});

export const editBank = (bankDetails, dispatch) => {
  dispatch(editBankRequest(bankDetails));
};
