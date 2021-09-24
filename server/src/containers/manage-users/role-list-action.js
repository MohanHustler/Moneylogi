import { ROLE_LIST_REQUEST } from './manage-users-constants';

const roleListRequest = (data) => ({
  data,
  type: ROLE_LIST_REQUEST,
});

// eslint-disable-next-line import/prefer-default-export
export const roleList = (dispatch, roleListCallback) => {
  dispatch(roleListRequest({ roleListCallback }));
};
