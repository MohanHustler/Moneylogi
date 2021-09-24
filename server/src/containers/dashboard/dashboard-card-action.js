import {
  DASHBOARD_CARD_REQUEST,
  DASHBOARD_CARD_SUCCESS,
  DASHBOARD_CARD_FAILURE,
} from './dashboard-constants';

const dashboardCardRequest = () => ({
  type: DASHBOARD_CARD_REQUEST,
});

export const dashboardCardSuccess = (data) => ({
  data,
  type: DASHBOARD_CARD_SUCCESS,
});

export const dashboardCardFailure = () => ({
  type: DASHBOARD_CARD_FAILURE,
});

export const dashboardCard = async (dispatch) => {
  dispatch(dashboardCardRequest());
};
