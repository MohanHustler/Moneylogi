import {
  BLOCK_UNBLOCK_REQUEST,
  BLOCK_UNBLOCK_SUCCESS,
  BLOCK_UNBLOCK_FAILURE,
} from './profile-constants';

const blockUserRequest = (id, blockUserSuccessCallback) => ({
  blockUserSuccessCallback,
  id,
  type: BLOCK_UNBLOCK_REQUEST,
});

export const blockUserSuccess = () => ({
  type: BLOCK_UNBLOCK_SUCCESS,
});
export const blockUserFailure = () => ({
  type: BLOCK_UNBLOCK_FAILURE,
});

export const blockUser = (id, blockUserSuccessCallback, dispatch) => {
  dispatch(blockUserRequest(id, blockUserSuccessCallback));
};
