import {
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILURE,
} from './profile-constants';

const addAddressRequest = (id, newUser) => ({
  id,
  newUser,
  type: ADD_ADDRESS_REQUEST,
});

export const addAddressSuccess = (data) => ({
  data,
  type: ADD_ADDRESS_SUCCESS,
});
export const addAddressFailure = () => ({
  type: ADD_ADDRESS_FAILURE,
});

export const addAddress = (id, newUser, dispatch) => {
  dispatch(addAddressRequest(id, newUser));
};
