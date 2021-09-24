import {
  MANAGE_PINCODE_REQUEST,
  MANAGE_PINCODE_SUCCESS,
  MANAGE_PINCODE_FAILURE,
} from './manage-pincode-constants';

const initialState = {
  error: false,
  isFetching: false,
  pincodeDetails: [],
  totalRecords: '',
};

const managePincode = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_PINCODE_REQUEST:
      return {
        ...state,
        isFetching: true,
        pincodeDetails: [],
      };
    case MANAGE_PINCODE_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
        pincodeDetails: [],
      };
    case MANAGE_PINCODE_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        pincodeDetails: action.data,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default managePincode;
