import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './change-password-constants';

const changePasswordRequest = (data) => ({
  data,
  type: CHANGE_PASSWORD_REQUEST,
});

export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = () => ({
  type: CHANGE_PASSWORD_FAILURE,
});

export const changePassword = async (
  newPassword,
  confirmnewpassword,
  dispatch,
  changePasswordSuccessCallback
) => {
  dispatch(
    changePasswordRequest({
      changePasswordSuccessCallback,
      confirmnewpassword,
      newPassword,
    })
  );
};
