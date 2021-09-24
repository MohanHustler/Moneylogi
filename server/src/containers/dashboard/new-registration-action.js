import {
  NEW_REGISTRATION_REQUEST,
  NEW_REGISTRATION_SUCCESS,
  NEW_REGISTRATION_FAILURE,
} from './dashboard-constants';

const newRegistrationRequest = (urlParams) => ({
  type: NEW_REGISTRATION_REQUEST,
  urlParams,
});

export const newRegistrationSuccess = (data) => ({
  data,
  type: NEW_REGISTRATION_SUCCESS,
});

export const newRegistrationFailure = () => ({
  type: NEW_REGISTRATION_FAILURE,
});

export const newRegistration = async (urlParams, dispatch) => {
  dispatch(newRegistrationRequest(urlParams));
};
