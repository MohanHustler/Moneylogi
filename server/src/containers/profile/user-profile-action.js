import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
} from './profile-constants';

const userProfileRequest = (id) => ({
  id,
  type: USER_PROFILE_REQUEST,
});

export const userProfileSuccess = (data) => ({
  data,
  type: USER_PROFILE_SUCCESS,
});
export const userProfileFailure = () => ({
  type: USER_PROFILE_FAILURE,
});

export const userProfile = async (id, dispatch) => {
  dispatch(userProfileRequest(id));
};
