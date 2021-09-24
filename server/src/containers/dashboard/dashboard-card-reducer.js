import {
  DASHBOARD_CARD_REQUEST,
  DASHBOARD_CARD_SUCCESS,
  DASHBOARD_CARD_FAILURE,
} from './dashboard-constants';

const initialState = {
  dashboardCardDetails: [],
  isFetching: false,
};

const dashboardCard = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_CARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case DASHBOARD_CARD_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case DASHBOARD_CARD_SUCCESS:
      return {
        ...state,
        dashboardCardDetails: action.data,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default dashboardCard;
