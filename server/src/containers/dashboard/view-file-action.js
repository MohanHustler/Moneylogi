import {
  VIEW_FILE_REQUEST,
  VIEW_FILE_SUCCESS,
  VIEW_FILE_FAILURE,
} from './dashboard-constants';

const viewFileRequest = (profilePicId, viewFileSuccessCallback) => ({
  profilePicId,
  type: VIEW_FILE_REQUEST,
  viewFileSuccessCallback,
});

export const viewFileSuccess = (data) => ({
  data,
  type: VIEW_FILE_SUCCESS,
});

export const viewFileFailure = () => ({
  type: VIEW_FILE_FAILURE,
});

export const viewFile = async (
  profilePicId,
  viewFileSuccessCallback,
  dispatch
) => {
  dispatch(viewFileRequest(profilePicId, viewFileSuccessCallback));
};
