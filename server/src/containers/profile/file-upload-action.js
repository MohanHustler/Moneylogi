import { FILE_UPLOAD } from './profile-constants';

const uploadFileRequest = (data) => ({
  data,
  type: FILE_UPLOAD,
});

// eslint-disable-next-line import/prefer-default-export
export const uploadFile = async (data, dispatch) => {
  dispatch(uploadFileRequest(data));
};
