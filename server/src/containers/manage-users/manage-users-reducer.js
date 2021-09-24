import {
  MANAGE_USERS_REQUEST,
  MANAGE_USERS_SUCCESS,
  MANAGE_USERS_FAILURE,
} from './manage-users-constants';

const initialState = {
  error: false,
  isFetching: false,
  totalRecords: '',
  users: [],
};

const manageUsers = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_USERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        users: [],
      };
    case MANAGE_USERS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
        users: [],
      };
    case MANAGE_USERS_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
        totalRecords: action.totalRecords,
        users: action.data,
      };
    default:
      return state;
  }
};

export default manageUsers;
