import {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAILURE,
} from './profile-constants';

const profileDetailsRequest = (id) => ({
  id,
  type: PROFILE_DETAILS_REQUEST,
});

export const profileDetailsSuccess = (data) => ({
  data,
  type: PROFILE_DETAILS_SUCCESS,
});
export const profileDetailsFailure = () => ({
  type: PROFILE_DETAILS_FAILURE,
});

export const userProfileDetails = async (id, dispatch) => {
  dispatch(profileDetailsRequest(id));
};
