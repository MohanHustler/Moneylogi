import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from './manage-users-constants';

const addUserRequest = (data) => ({
  data,
  type: ADD_USER_REQUEST,
});

export const addUserSuccess = () => ({
  type: ADD_USER_SUCCESS,
});

export const addUserFailure = (data) => ({
  data,
  type: ADD_USER_FAILURE,
});

export const addUser = (
  userDetails,
  addUserSuccessCallback,
  addUserFailureCallback,
  dispatch
) => {
  dispatch(
    addUserRequest({
      ...userDetails,
      addUserFailureCallback,
      addUserSuccessCallback,
    })
  );
};
