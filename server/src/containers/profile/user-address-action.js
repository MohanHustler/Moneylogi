import {
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_SUCCESS,
  USER_ADDRESS_FAILURE,
} from './profile-constants';

const userAddressRequest = (id) => ({
  id,
  type: USER_ADDRESS_REQUEST,
});

export const userAddressSuccess = (data) => ({
  data,
  type: USER_ADDRESS_SUCCESS,
});
export const userAddressFailure = () => ({
  type: USER_ADDRESS_FAILURE,
});

export const userAddress = async (id, dispatch) => {
  dispatch(userAddressRequest(id));
};
