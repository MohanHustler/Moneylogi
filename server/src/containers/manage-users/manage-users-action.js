import {
  MANAGE_USERS_REQUEST,
  MANAGE_USERS_SUCCESS,
  MANAGE_USERS_FAILURE,
} from './manage-users-constants';

const manageUsersRequest = (urlParams) => ({
  type: MANAGE_USERS_REQUEST,
  urlParams,
});

export const manageUsersSuccess = (data, totalRecords) => ({
  data,
  totalRecords,
  type: MANAGE_USERS_SUCCESS,
});
export const manageUsersFailure = () => ({
  type: MANAGE_USERS_FAILURE,
});

export const manageUsers = async (urlParams, dispatch) => {
  dispatch(manageUsersRequest(urlParams));
};
