import {
  DEFAULTS_REQUEST,
  DEFAULTS_SUCCESS,
  DEFAULTS_FAILURE,
} from './defaults-constants';

const defaultsRequest = (urlParams) => ({
  type: DEFAULTS_REQUEST,
  urlParams,
});

export const defaultsSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: DEFAULTS_SUCCESS,
});

export const defaultsFailure = () => ({
  type: DEFAULTS_FAILURE,
});

export const defaults = async (urlParams, dispatch) => {
  dispatch(defaultsRequest(urlParams));
};
