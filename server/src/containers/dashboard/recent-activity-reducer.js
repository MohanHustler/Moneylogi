import {
  RECENT_ACTIVITY_REQUEST,
  RECENT_ACTIVITY_SUCCESS,
  RECENT_ACTIVITY_FAILURE,
} from './dashboard-constants';

const initialState = {
  fetchingRecentActivity: false,
  recentActivityDetails: [],
};

const recentActivity = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_ACTIVITY_REQUEST:
      return {
        ...state,
        fetchingRecentActivity: true,
      };
    case RECENT_ACTIVITY_FAILURE:
      return {
        ...state,
        fetchingRecentActivity: false,
      };
    case RECENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        fetchingRecentActivity: false,
        recentActivityDetails: action.data,
      };
    default:
      return state;
  }
};

export default recentActivity;
