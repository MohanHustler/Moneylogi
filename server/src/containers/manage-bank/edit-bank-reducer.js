import {
  EDIT_BANK_REQUEST,
  EDIT_BANK_SUCCESS,
  EDIT_BANK_FAILURE,
} from './manage-bank-constants';

const initialState = {
  isLoading: false,
};

const editBank = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_BANK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_BANK_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_BANK_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default editBank;
