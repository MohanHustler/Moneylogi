import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './reset-password-constants';

const initialState = {
  isLoading: false,
};

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default resetPassword;
