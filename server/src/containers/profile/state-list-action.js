import { STATE_LIST_REQUEST } from './profile-constants';

const stateListRequest = (data) => ({
  data,
  type: STATE_LIST_REQUEST,
});

// eslint-disable-next-line import/prefer-default-export
export const stateList = (dispatch, stateListCallback) => {
  dispatch(stateListRequest({ stateListCallback }));
};
