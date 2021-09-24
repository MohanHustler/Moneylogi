import {
  ADD_CALL_LOGS_REQUEST,
  ADD_CALL_LOGS_SUCCESS,
  ADD_CALL_LOGS_FAILURE,
} from './profile-constants';

const addCallLogsRequest = (data, callLogSuccessCallback) => ({
  callLogSuccessCallback,
  data,
  type: ADD_CALL_LOGS_REQUEST,
});

export const addCallLogsSuccess = () => ({
  type: ADD_CALL_LOGS_SUCCESS,
});

export const addCallLogsFailure = () => ({
  type: ADD_CALL_LOGS_FAILURE,
});

export const addCallLogs = (
  callLogsDetails,
  callLogSuccessCallback,
  dispatch
) => {
  dispatch(addCallLogsRequest({ ...callLogsDetails }, callLogSuccessCallback));
};
