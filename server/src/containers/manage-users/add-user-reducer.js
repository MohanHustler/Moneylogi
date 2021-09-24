import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from './manage-users-constants';

const initialState = {
  isLoading: false,
};

const addUser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default addUser;
