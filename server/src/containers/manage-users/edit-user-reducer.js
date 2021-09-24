import {
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from './manage-users-constants';

const initialState = {
  isLoading: false,
};

const editUser = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default editUser;
