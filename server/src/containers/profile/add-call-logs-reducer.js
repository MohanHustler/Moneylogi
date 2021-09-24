import {
  ADD_CALL_LOGS_REQUEST,
  ADD_CALL_LOGS_SUCCESS,
  ADD_CALL_LOGS_FAILURE,
} from './profile-constants';

const initialState = {
  isLoading: false,
};

const addCallLogs = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CALL_LOGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CALL_LOGS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_CALL_LOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default addCallLogs;
