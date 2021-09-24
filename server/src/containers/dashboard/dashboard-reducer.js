import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
} from './dashboard-constants';

const initialState = {
  dashboardDetails: [],
  isFetching: false,
  totalRecords: '',
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return {
        ...state,
        dashboardDetails: [],
        isFetching: true,
      };
    case DASHBOARD_FAILURE:
      return {
        ...state,
        dashboardDetails: [],
        isFetching: false,
      };
    case DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardDetails: action.data,
        isFetching: false,
        totalRecords: action.totalRecords,
      };
    default:
      return state;
  }
};

export default dashboard;
