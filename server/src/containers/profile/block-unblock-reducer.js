import {
  BLOCK_UNBLOCK_REQUEST,
  BLOCK_UNBLOCK_SUCCESS,
  BLOCK_UNBLOCK_FAILURE,
} from './profile-constants';

const initialState = {
  error: false,
  isFetching: false,
};

const blockUser = (state = initialState, action) => {
  switch (action.type) {
    case BLOCK_UNBLOCK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case BLOCK_UNBLOCK_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case BLOCK_UNBLOCK_SUCCESS:
      return {
        ...state,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default blockUser;
