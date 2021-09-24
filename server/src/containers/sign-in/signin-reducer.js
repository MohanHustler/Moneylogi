import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from './signin-constants';

const initialState = {
  isLoading: false,
};

const signin = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default signin;
