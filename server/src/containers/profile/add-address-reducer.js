import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
} from './profile-constants';

const initialState = {
  addAddressDetails: [],
  error: false,
  isFetching: false,
};

const addAddress = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_ADDRESS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addAddressDetails: action.data,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default addAddress;
