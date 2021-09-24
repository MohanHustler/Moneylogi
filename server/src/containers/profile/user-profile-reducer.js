import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
} from './profile-constants';

const initialState = {
  error: false,
  isFetching: false,
  userProfileData: [],
};

const userProfile = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        userProfileData: action.data,
      };
    default:
      return state;
  }
};

export default userProfile;
