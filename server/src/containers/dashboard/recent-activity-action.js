import {
  RECENT_ACTIVITY_REQUEST,
  RECENT_ACTIVITY_SUCCESS,
  RECENT_ACTIVITY_FAILURE,
} from './dashboard-constants';

const recentActivityRequest = (urlParams) => ({
  type: RECENT_ACTIVITY_REQUEST,
  urlParams,
});

export const recentActivitySuccess = (data) => ({
  data,
  type: RECENT_ACTIVITY_SUCCESS,
});

export const recentActivityFailure = () => ({
  type: RECENT_ACTIVITY_FAILURE,
});

export const recentActivity = async (urlParams, dispatch) => {
  dispatch(recentActivityRequest(urlParams));
};
