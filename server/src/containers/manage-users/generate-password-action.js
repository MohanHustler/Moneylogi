import {
  GENERATE_PASSWORD_REQUEST,
  GENERATE_PASSWORD_SUCCESS,
  GENERATE_PASSWORD_FAILURE,
} from './manage-users-constants';

const generatePasswordRequest = (data, generatePasswordSuccessCallback) => ({
  data,
  generatePasswordSuccessCallback,
  type: GENERATE_PASSWORD_REQUEST,
});

export const generatePasswordSuccess = () => ({
  type: GENERATE_PASSWORD_SUCCESS,
});

export const generatePasswordFailure = () => ({
  type: GENERATE_PASSWORD_FAILURE,
});

export const generatePasswordAction = (
  userDetails,
  generatePasswordSuccessCallback,
  dispatch
) => {
  dispatch(
    generatePasswordRequest({ ...userDetails }, generatePasswordSuccessCallback)
  );
};
