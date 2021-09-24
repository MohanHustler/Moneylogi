import {
  CALL_LOGS_REQUEST,
  CALL_LOGS_SUCCESS,
  CALL_LOGS_FAILURE,
} from './profile-constants';

const callLogsRequest = (urlParams) => ({
  type: CALL_LOGS_REQUEST,
  urlParams,
});

export const callLogsSuccess = (data) => ({
  data,
  type: CALL_LOGS_SUCCESS,
});
export const callLogsFailure = () => ({
  type: CALL_LOGS_FAILURE,
});

export const callLogsAction = async (urlParams, dispatch) => {
  dispatch(callLogsRequest(urlParams));
};
