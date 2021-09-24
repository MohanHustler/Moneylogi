import {
  CALL_LOGS_REQUEST,
  CALL_LOGS_SUCCESS,
  CALL_LOGS_FAILURE,
} from './profile-constants';

const initialState = {
  callLogsDetails: [],
  error: false,
  isFetching: false,
};

const callLogs = (state = initialState, action) => {
  switch (action.type) {
    case CALL_LOGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CALL_LOGS_FAILURE:
      return {
        ...state,
        error: true,
        isFetching: false,
      };
    case CALL_LOGS_SUCCESS:
      return {
        ...state,
        callLogsDetails: action.data,
        error: false,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default callLogs;
