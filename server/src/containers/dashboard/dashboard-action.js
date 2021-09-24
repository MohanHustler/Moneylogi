import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
} from './dashboard-constants';

const dashboardRequest = (urlParams) => ({
  type: DASHBOARD_REQUEST,
  urlParams,
});

export const dashboardSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: DASHBOARD_SUCCESS,
});

export const dashboardFailure = () => ({
  type: DASHBOARD_FAILURE,
});

export const dashboard = async (urlParams, dispatch) => {
  dispatch(dashboardRequest(urlParams));
};
