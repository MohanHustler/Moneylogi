import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './reset-password-constants';

const resetPasswordRequest = (data) => ({
  data,
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
});

export const resetPassword = async (
  email,
  oldPassword,
  newPassword,
  confirmNewPassword,
  dispatch,
  resetPasswordSuccessCallback
) => {
  dispatch(
    resetPasswordRequest({
      confirmNewPassword,
      email,
      newPassword,
      oldPassword,
      resetPasswordSuccessCallback,
    })
  );
};
