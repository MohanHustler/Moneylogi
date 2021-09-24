import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from './manage-users-constants';

const editUserRequest = (
  userDetails,
  publicId,
  concurrencyStamp,
  userSuccessCallback
) => ({
  concurrencyStamp,
  publicId,
  type: EDIT_USER_REQUEST,
  userDetails,
  userSuccessCallback,
});

export const editUserSuccess = () => ({
  type: EDIT_USER_SUCCESS,
});

export const editUserFailure = () => ({
  type: EDIT_USER_FAILURE,
});

export const editUser = (
  userDetails,
  publicId,
  concurrencyStamp,
  userSuccessCallback,
  dispatch
) => {
  dispatch(
    editUserRequest(
      userDetails,
      publicId,
      concurrencyStamp,
      userSuccessCallback
    )
  );
};
