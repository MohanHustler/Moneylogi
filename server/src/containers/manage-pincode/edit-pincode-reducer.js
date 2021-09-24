import {
  EDIT_PINCODE_REQUEST,
  EDIT_PINCODE_SUCCESS,
  EDIT_PINCODE_FAILURE,
} from './manage-pincode-constants';

const initialState = {
  isLoading: false,
};

const editPincode = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PINCODE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_PINCODE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_PINCODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default editPincode;
