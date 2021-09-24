import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
} from './change-password-constants';

const initialState = {
  isLoading: false,
};

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default changePassword;
