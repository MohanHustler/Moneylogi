import {
  GENERATE_PASSWORD_REQUEST,
  GENERATE_PASSWORD_SUCCESS,
  GENERATE_PASSWORD_FAILURE,
} from './manage-users-constants';

const initialState = {
  isLoading: false,
};

const generatePassword = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GENERATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case GENERATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default generatePassword;
