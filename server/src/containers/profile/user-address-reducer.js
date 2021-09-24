import {
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_SUCCESS,
  USER_ADDRESS_FAILURE,
} from './profile-constants';

const initialState = {
  error: false,
  isFetching: false,
  userAddressDetails: [],
};

const userAddress = (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDRESS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_ADDRESS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case USER_ADDRESS_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        userAddressDetails: action.data,
      };
    default:
      return state;
  }
};

export default userAddress;
