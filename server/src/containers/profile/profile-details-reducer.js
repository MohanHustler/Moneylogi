import {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAILURE,
} from './profile-constants';

const initialState = {
  error: false,
  isFetching: false,
  profileData: [],
};

const profileDetails = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case PROFILE_DETAILS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        profileData: action.data,
      };
    default:
      return state;
  }
};

export default profileDetails;
